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
    // display component to create a new plan ("createplan")
    setShowCreatePlanForm(true); // dynamically display form when clicked
    // maybe hide other content? we will see once styled.
  };

  //JSON structure for a brand new meal plan. this is what it will look like in local storage.
  const handleCreatePlan = (planName) => {
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
      {/* <h1>MyPlans</h1>
      <p>a 'meal plan' is a selection of meals that the user assigns to specific days.</p>
      <h3>This page will: </h3>
      <ul>
        <li>display all meal plans saved in local storage in cards with basic details</li>
        <li>allow users to delete meal plans (select functionality for mass deleting plans, buttons appear on meal plan hover...)</li>
        <li>allow users to edit meal plans (select functionality, button on hover...)</li>
        <li>anything else?</li>
      </ul> */}
      {/* all components for mymeals will go here */}

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