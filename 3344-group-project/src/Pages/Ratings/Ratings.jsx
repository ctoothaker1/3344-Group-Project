//this document is for sorting and displaying ratings
import {useContext, useState} from "react"
import { Link } from 'react-router-dom';
import {RatingsContext, RatingsProvider} from "./RatingsContext.jsx"
import styles from './Ratings.module.css';
const Ratings=()=>
{
    const { ratings, setRatings } = useContext(RatingsContext);
    const [sortDescending, setSortDescending] = useState(true);

    //reset rating using ID. triggered on btn clck
    const resetRating = (idMeal) => {
        setRatings(ratings.filter(r => r.idMeal !== idMeal));
      };

    // const sortedRatings=[...ratings].sort((a,b)=>b.rating-a.rating); 

    const toggleSort = () => setSortDescending(descending => !descending);

    //compare and sort high to low or low to high
    const sortedRatings = [...ratings].sort((a, b) =>
        sortDescending
          ? b.rating - a.rating
          : a.rating - b.rating
      );

    return (
        <main>
        <div className={styles.container}>
          <h1>My Ratings</h1>
          
    
          <button className={styles.sortBtn} onClick={toggleSort}>
            Sort: {sortDescending ? 'Descending' : 'Ascending'}
            </button>
            <hr className={styles.divider} />
          {sortedRatings.length === 0 ? (
            <p className={styles.none}>Rate your first recipe!</p>
          ) : (
            <ul className={styles.list}>
              {sortedRatings.map(({ idMeal, recipeName, rating }) => (
                <li key={idMeal} className={styles.item}>
                  <Link to={`/recipe/${idMeal}`} className={styles.link}>
                    {recipeName}
                  </Link>
    
                  <span className={styles.score}>{rating}/10</span>
    
                  <button
                    className={styles.resetBtn}
                    onClick={() => resetRating(idMeal)}
                  >
                    Reset
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        </main>
      );
};
export default Ratings;