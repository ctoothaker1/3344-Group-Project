// this file contains a user's meal plans page layout
import styles from './MyPlans.module.css';
import React, { useContext } from "react";
import { MealPlansContext } from "../../components/mealPlansContext/mealPlansContext";
import { useNavigate } from "react-router-dom";
import CreatePlanForm from '../../components/CreatePlanForm/CreatePlanForm';
import { useState } from 'react';

// MEAL PLANS in their simplest form are an array of idMeals, each idMeal is a recipe.
// each meal plan needs a name, 7 days, meals that correspond to each day 
// (some days can be empty if user has not assigned any meals to that day)
// clicking a meal plan will route to /plan/planname where the detailed data is displayed
// they can edit a plan on a separate page...? implementation TBD

const MyPlans = () => {

  const { mealPlans, setMealPlans } = useContext(MealPlansContext);
  const navigate = useNavigate();
  //controls the visibility of the crete plan form. triggered by button
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);

  const handlePlanClick = (plan) => {
    // go to detailed plan view
    navigate(`/plan/${plan.name}`);
  };

  const handleDeletePlan = (planName) => {
    // filter out plan that was deleted so it is not displayed
    const updatedPlans = mealPlans.filter(plan => plan.name !== planName);
    setMealPlans(updatedPlans);
  };

  const handleCreatePlanClick = () =>{
    setShowCreatePlanForm(true); // dynamically display form when clicked
  };

  //JSON structure for a brand new meal plan. this is what it will look like in local storage.
  const handleCreatePlan = (planName) => {
    const lowercasePlan = planName.trim().toLowerCase()
    // check if there is a plan with planName that already exists VERY IMPORTANT
    const exists = mealPlans.some(
      plan => plan.name.trim().toLowerCase() === lowercasePlan
    )
    if (exists) {
      alert(`A plan named “${planName}” already exists. Choose a unique name.`)
      return // do not create the plan.
    }
  
    const newPlan = {
      name: planName,
      days: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      }
  };
  setMealPlans([...mealPlans, newPlan]); // add this NEW PLAN to existing plans
  console.log(newPlan);
  setShowCreatePlanForm(false); // plan has been created, hide the form
  alert(`Plan ${planName} created!`); // notify user as a confirmation
};


  return (
    <main>
      <div className={styles.plansContainer}>
              <h1>My Meal Plans</h1>
              <hr className={styles.divider} />
              <div className={styles.plans}> {/* loop through plans and display each */}
                  {mealPlans.length > 0 ? (
                  mealPlans.map(plan => (
                      <div key={plan.name} className={styles.planCard}>
                        <h3>{plan.name}</h3>
                        <p>Total Recipes: {Object.values(plan.days).flat().length}</p> {/*add all meals from each day to an array (.flat) then find len */}
                        {/* OTHER PLAN DETAILS */}
                        <div className={styles.cardButtons}>
                          <button onClick={() => handlePlanClick(plan)}>View Plan</button>
                          <button onClick={() => handleDeletePlan(plan.name)}>Delete</button>
                        </div>
                      </div>
                  ))
                  ) : (
                  <div className={styles.noPlans}>
                    <p>No meal plans have been created. Click 'Create a Plan' to create a new one!</p>
                  </div>
                  )}
              </div>
              {showCreatePlanForm && (
          <CreatePlanForm 
            onCreate={handleCreatePlan} 
            onClose={() => setShowCreatePlanForm(false)}
          />
        )}
            <button onClick={() => handleCreatePlanClick()} className={styles.createPlanButton}>Create a Plan</button>
          </div>
      
    </main>
  );

}
export default MyPlans;