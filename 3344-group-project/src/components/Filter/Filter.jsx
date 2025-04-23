/*This file contains the filter component, created by Ian
-Filters recipes based on 'category' in API json*/
// we need to isolate some of the functionality from SearchResults here 
// to make the component more functional on its own. EX - if we want to put the filter component
//on the FirstSearch page

import styles from './Filter.module.css'
import {useState} from 'react'

const Filter=({getFilter})=>
  {
  const [selectedDiet,setSelectedDiet]=useState([]);
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

  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(shown => !shown);
    //set diet when radio clicked
  const handleChange = (e) => {
    const diet = e.target.value;
    setSelectedDiet(diet);
    getFilter([diet]);
  };
  //clear radio selection
  const handleClear = () => {
    setSelectedDiet('');
    getFilter([]);
  };

  return(
      <div className={styles.filterContainer}>
        <button className={styles.toggleButton} onClick={toggleVisible}>
          {visible ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {visible && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
          >
            Clear
          </button>
        )}


        {visible && (
        <section className={styles.radioGroup}>
          {dietOptions.map(diet => (
            <label key={diet} className={styles.radioLabel}>
              <input
                type="radio"
                name="diet"              // all share the same name
                value={diet}
                checked={selectedDiet === diet}
                onChange={handleChange}
              />
              {diet}
            </label>
          ))}
        </section>
      )}
        </div>
    )
};
export default Filter;