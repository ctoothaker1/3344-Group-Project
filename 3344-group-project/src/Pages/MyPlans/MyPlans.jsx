// this file contains a user's meal plans page layout
import React from 'react';

const MyPlans = () => {

  return (
    <div>
      <h1>MyPlans</h1>
      <p>a 'meal plan' is a selection of meals that the user assigns to specific days.</p>
      <h3>This page will: </h3>
      <ul>
        <li>display all meal plans saved in local storage in cards with basic details</li>
        <li>allow users to delete meal plans (select functionality for mass deleting plans, buttons appear on meal plan hover...)</li>
        <li>allow users to edit meal plans (select functionality, button on hover...)</li>
        <li>anything else?</li>
      </ul>


      {/* all components for mymeals will go here */}

      
    </div>
  );

}
export default MyPlans;