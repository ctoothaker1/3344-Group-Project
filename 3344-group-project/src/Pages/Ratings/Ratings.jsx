//this document is for sorting and displaying ratings
import {useContext} from "react"
import { Link } from 'react-router-dom';
import {RatingsContext, RatingsProvider} from "./RatingsContext.jsx"
import styles from './Ratings.module.css';
const Ratings=()=>
{
    const { ratings, setRatings } = useContext(RatingsContext);

    //reset rating using ID. triggered on btn clck
    const resetRating = (idMeal) => {
        setRatings(ratings.filter(r => r.idMeal !== idMeal));
      };

    const sortedRatings=[...ratings].sort((a,b)=>b.rating-a.rating); 


    return (
        <div className={styles.container}>
          <h1>My Ratings</h1>
    
          {sortedRatings.length === 0 ? (
            <p className={styles.none}>You haven't rated any recipes yet.</p>
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
      );
};
export default Ratings;