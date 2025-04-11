/*This file contains the filter component, created by Ian
-Filters recipes based on 'category' in API json*/
// we need to isolate some of the functionality from SearchResults here 
// to make the component more functional on its own. EX - if we want to put the filter component
//on the FirstSearch page

import styles from './Filter.module.css'
import {useState} from 'react'

const Filter=({getFilter})=>
  {
  const [diets,setDiets]=useState([]);
  const dietOptions = [
      "Beef",
      "Chicken",
      "Dessert",
      "Lamb",
      "Miscellaneous",
      "Pasta",
      "Pork",
      "Seafood",
      "Side",
      "Starter",
      "Vegan",
      "Vegetarian",
      "Breakfast",
      "Goat"
    ];
  const handleDiets = (event)=>
      {
        const { value,checked }=event.target;

        if(checked){
          const update= [...diets,value];
          setDiets(update);  //we are setting the diets aka recognizing them in the return statememnt
          getFilter(update); // here we are literally passing in the the correctly queried diet restrictions
                                          
        }
        else{
          const update=diets.filter(diet=>diet!=value); //setting update equal to a new array that only includes checked boxes(diets)
          setDiets(update); //setting
          getFilter(update); //letting search know we removed a diet restriction and now it's time to update        
        }
  
      }

  return(
      <section className={styles.checkbox}>
      {dietOptions.map((diet) => (   //map function to iterate through
          <label key={diet}>
            <input
              type="checkbox"
              value={diet}
              checked={diets.includes(diet)} //checking the current state of diet to see if it is included within the true array
              onChange={handleDiets}  
            />
            {diet}
          </label>
        ))}
        </section>
    )
};
export default Filter;