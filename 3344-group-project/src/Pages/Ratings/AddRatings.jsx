import { RatingsContext } from "./RatingsContext.jsx";
import {useContext} from "react";
import styles from "./AddRatings.module.css";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
// pass in the ratings like <Rating getRating={{recipe.id, value}}
function AddRatings({recipeName, idMeal}) {

    const {ratings,setRatings}=useContext(RatingsContext);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const currentRating =
    ratings.find(r => r.idMeal === idMeal)?.rating ?? null;

  const saveRating = (value) => {
    setRatings(prev =>
      prev.some(r => r.idMeal === idMeal)
        ? prev.map(r =>
            r.idMeal === idMeal ? { idMeal, recipeName, rating: value } : r
          )
        : [...prev, { idMeal,recipeName, rating: value }]
    );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const validInput = e.target.value;
    if (!validInput) return;  
    saveRating(Number(validInput));
  };

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.currentRating}>
        <p>Current rating:</p>
        {currentRating != null
          ? <h2>{currentRating}/10</h2>
          : <p>Not Rated</p>
        }
      </div>
      { /* is user changing rating? */ }
      <div className={styles.editContainer}>
        {!isEditing ? (
            <div>
                <button className={styles.changeBtn} onClick={() => setIsEditing(true)}>
                    Change
                </button>
                <button className={styles.ratingsPageBtn} onClick={() => navigate('/ratings')}>
                    All Ratings
                </button>
            </div>
        ) : (
          <>
            <select
              value={currentRating ?? ""}
              onChange={handleChange}
            >
              <option value="" hidden>–</option> {/* displays if rating has never been set */}
              {Array.from({ length: 10 }, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option> /* cleaner generation for #s 1-10 */
              ))}
            </select>
            <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

}
export default AddRatings;