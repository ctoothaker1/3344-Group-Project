// this file contains a user's meal plans page layout
import React from 'react';

const MyFavorites = () => {

  return (
    <div>
      <h1>Favorites</h1>
      <p>a 'favorite' is a meal that the user adds to their favorites list.</p>
      <h3>This page will: </h3>
      <ul>
        <li>be the landing page for when 'favorites' button in header is clicked</li>
        <li>REUSE CODE FROM MealPlan.jsx PAGE</li>
        <li>meals will be clickable, or there can be a button that displays on hover that redirects to the recipe page</li>
        <li>display all favorited meals</li>
        <li>allow users to delete favorite meals from the list (buttons appear on meal plan hover... reuse code from mymeals)</li>
        <li>there is only one favorites list</li>
        <li>anything else?</li>
      </ul>


      {/* all components for Favorites page will go here */}

      
    </div>
  );

}
export default MyFavorites;