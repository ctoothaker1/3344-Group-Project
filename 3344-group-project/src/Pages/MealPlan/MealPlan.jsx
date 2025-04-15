// this file will be used when a user clicks  a meal plan
import React from 'react';
import styles from './MealPlan.module.css';
import {useContext} from "react";
import { useParams } from 'react-router-dom';


const MealPlan = () => {

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const { name } = useParams(); // NAME from URL: /plan/:planname
  const { mealPlans, setMealPlans } = useContext(MealPlansContext);
  // Find the plan by name - name is unique - must warn user if they attempt to name same
  const plan = mealPlans.find(plan => plan.name === name);

  if (!plan) return <p>Meal plan not found.</p>;

  // remove meal plan from specific day
  const handleRemoveMeal = (day, mealId) => { 
    const updatedPlan = {
      ...plan,
      days: {
        ...plan.days,
        [day]: plan.days[day].filter(meal => meal.idMeal !== mealId)
      }
    };
    // update meal plan in the context object (local storage) after removal
    const updatedPlans = mealPlans.map(p => (p.id === id ? updatedPlan : p));
    setMealPlans(updatedPlans);
  };


  return (
    <main>
      <div className={styles.mealPlanContent}>
        {/* <h1>MealPlan</h1>
        <p>a meal plan is a selection of meals that have been assigned to days in the week</p>
        <h3>This page will: </h3>
        <ul>
          <li>Only be visited when a user clicks a specific plan from their 'MyPlans' page</li>
          <li>Have similar code to MyFavorites (except for grouping meals by designated day)</li>
          <li>display a day-day breakdown of meals within the plan.</li>
          <li>meals will be clickable, or there can be a button that displays on hover that redirects to the recipe page</li>
          <li>display all meals in the selected mealplan</li>
          <li>allow users to delete meals from the plan (buttons appear on meal plan hover... reuse code from favorites)</li>
          <li>Allow the user to delete the meal plan from this page</li>
          <li>allow the user to rename the meal plan from this page</li>
          <li>anything else?</li>
        </ul> */}

        {/* all components for MealPlan page will go here */}

        <h1>{plan.name}</h1>
        {/* INCLUDE FUNCTIONALITY TO RENAME PLAN */}
        <h2>Unassigned Meals</h2>
        <div className={styles.mealRow}>
          {plan.unassigned && plan.unassigned.length > 0 ? (
            plan.unassigned.map(meal => (
              <div key={meal.idMeal} className={styles.mealCard}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>{meal.strMeal}</p>
              </div>
            ))
          ) : (
            <p>No unassigned meals</p>
          )}
        </div>
        <hr />
        {/* EACH DAY OF THE WEEK DISPLAYED IN A SECTION */}
        {daysOfWeek.map(day => (
          <section key={day}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            <div className={styles.mealRow}>
              {plan.days[day] && plan.days[day].length > 0 ? (
                plan.days[day].map(meal => (
                  <div key={meal.idMeal} className={styles.mealCard}>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <p>{meal.strMeal}</p>
                    {/* REMOVE BUTTON ON PLAN HOVER */}
                    <button onClick={() => handleRemoveMeal(day, meal.idMeal)}>Remove</button>
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