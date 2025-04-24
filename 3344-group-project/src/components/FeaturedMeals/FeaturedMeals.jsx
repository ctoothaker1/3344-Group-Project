// Displays a selection x featured meals. Ideally, this will have a horizontal scrollbar.
// designed for implementation on the home page.
// need to use an additional api call (app.get()) to get a random meal x number of times.
// www.themealdb.com/api/json/v1/1/random.php, add IDs to array, then use other app.get(recipe) to get needed data for each
import React from "react";
import styles from "./FeaturedMeals.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]); // meals array to store meal data
  const navigate = useNavigate(); // for routing to meal details page
  const proxyServerUrl = import.meta.env.VITE_PROXY_URL;

  // helper function, get a single meal.
  const fetchRandomMeal = async () => {
    const endpoint = `${proxyServerUrl}/api/random`;
    try{
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.meals ? data.meals[0] : null; // return the first meal. only one.
    }
    catch(error){
      console.error("error fetching random meal (featuredmeals.jsx)",error);
    }
    finally{
      setLoading(false);
    }
  }

  // fetch random meals as the component mounts
  React.useEffect(() => {
    setLoading(true); 
    const fetchMeals = async () => {
      try {
        const mealPromises = Array.from({ length: 6 }, fetchRandomMeal); // get 6 random meals.
        const mealsArray = await Promise.all(mealPromises);
        setMeals(mealsArray.filter(meal => meal !== null)); // filter null responses
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
      
    };
    fetchMeals();
  }, []);


  return (

    <div className={styles.featuredContainer}> {/* horizontal by default, vertical in @media */}

      <h2>Featured Meals</h2>
      <div className={styles.featuredMeals}>
        {loading ? (
          <p>Loading...</p>
        ) : meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className={styles.mealCard} onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <p>{meal.strCategory}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>


    </div>
   

    
  );
};
export default Featured;
