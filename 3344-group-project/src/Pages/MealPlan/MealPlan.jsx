// this file will be used when a user clicks  a meal plan
import React, {useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styles from './MealPlan.module.css';
import { MealPlansContext } from "../../components/mealPlansContext/mealPlansContext.jsx";

const MealPlan = () => {
  const { planName } = useParams(); // NAME from URL: /plan/:planname
  const navigate = useNavigate();
  const { mealPlans, setMealPlans } = useContext(MealPlansContext);
  const [newPlanName, setNewPlanName] = useState('');
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const [isEditing, setIsEditing] = useState(false);

  // Find the plan by name - name is unique - must warn user if they attempt to name same
  const plan = mealPlans.find(plan => plan.name == planName);
  if (!plan) return <p>Meal plan not found.</p>;


  // remove meal plan from specific day
  // and update meal plan in the context object (local storage) after removal
  const handleRemoveMeal = (day, idMeal) => {
    const updatedPlan = {
      ...plan,
      days: {
        ...plan.days,
        [day]: plan.days[day].filter(meal => meal.idMeal !== idMeal)
      }
    };

    const updatedPlans = mealPlans.map(p => p.name === planName ? updatedPlan : p);
    setMealPlans(updatedPlans);
    localStorage.setItem("mealPlans", JSON.stringify(updatedPlans));

    };

    const handleRenamePlan = () => {
      if (!newPlanName.trim()) return alert("Plan name cannot be empty.");
      if (mealPlans.some(p => p.name === newPlanName)) return alert("Plan name already exists!");

      const renamedPlan = { ...plan, name: newPlanName };
      const updatedPlans = mealPlans.map(p => p.name === planName ? renamedPlan : p);
      setMealPlans(updatedPlans);
      localStorage.setItem("mealPlans", JSON.stringify(updatedPlans));
      navigate(`/plan/${newPlanName}`);
    };

    const handleDeletePlan = () => {
      if (!confirm("Are you sure you want to delete this plan?")) return;
      const updatedPlans = mealPlans.filter(p => p.name !==  planName);
      setMealPlans(updatedPlans);
      localStorage.setItem("mealPlans", JSON.stringify(updatedPlans));
      navigate(`/plan/${newPlanName}`);
    };

    

  return (
    <main>
      <div className={styles.mealPlanContent}>
        <h1>{plan.name}</h1>
        <div className={styles.editPlanContainer}>
          {isEditing ? (
            <>
              <div className={styles.renameContainer}>
                <input
                  type="text"
                  className={styles.renameInput}
                  placeholder="Enter new plan name"
                  value={newPlanName}
                  onChange={e => setNewPlanName(e.target.value)}
                />
                <button
                  className={styles.renameButton}
                  onClick={() => {
                    handleRenamePlan();
                    setIsEditing(false);
                  }}
                >
                  Rename Plan
                </button>
              </div>

              <button
                className={styles.deleteButton}
                onClick={handleDeletePlan}
              >
                Delete Plan
              </button>

              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={styles.editToggleButton}
              onClick={() => setIsEditing(true)}
            >
              Edit / Delete Plan
            </button>
          )}
        </div>
        <hr />
        {daysOfWeek.map(day => (
          <section key={day} className={styles.daySection}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3> {/*format days of week */}
            <div className={styles.mealRow}>
              {plan.days[day] && plan.days[day].length > 0 ? (
                plan.days[day].map(meal => (
                  <div key={meal.idMeal} className={styles.mealCard}>
                    <Link to={`/recipe/${meal.idMeal}`} className={styles.recipeLink}>
                      <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.mealImage}/>
                      <p className={styles.mealTitle}>{meal.strMeal}</p>
                    </Link>

                   
                    {isEditing && (
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveMeal(day, meal.idMeal)}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                ))
              ) : (
                <p>No meal assigned</p>
              )}
            </div>
          </section>
        ))}

      </div>
    </main>
  );
};

export default MealPlan;