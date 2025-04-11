// this file will be used when a user 
import React from 'react';

const MealPlan = () => {

  return (
    <div>
      <h1>MealPlan</h1>
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
      </ul>

      {/* all components for MealPlan page will go here */}

    </div>
  );

}
export default MealPlan;