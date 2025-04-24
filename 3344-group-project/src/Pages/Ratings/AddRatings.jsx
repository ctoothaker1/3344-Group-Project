import { RatingsContext } from "./RatingsContext.jsx";
import {useContext} from "react";
import styles from "./AddRatings.module.css";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
// pass in the ratings like <Rating getRating={{recipe.id, value}}
function AddRatings({recipeID})
{
const {ratings,setRatings}=useContext(RatingsContext);
const [isEditing, setIsEditing] = useState(false);
const navigate = useNavigate();
 //if the user already has a rating we know that we are just changing the value 
const handleRating=(e)=>
{
    const hasRating=ratings.some(r=>r.recipeID===recipeID);
    const value=Number(e.target.value);
    if(hasRating)  //if the user has the rating we are literally just gonna take that recipe and update it 
    {
    const updatedRating=ratings.map(r=>
    
    r.recipeID===recipeID ? {recipeID, rating:value}: r ) //finds the matching 
    
    setRatings(updatedRating);
    } 
    else{ //if not we will create a new object within the array
        const newRatingsArray=
        [...ratings, {recipeID,rating:value}];
        setRatings(newRatingsArray);
    }
    setIsEditing(false);
}
    const currentRating = ratings.find(r => r.recipeID === recipeID)?.rating ?? null;

    return(
        <div className={styles.ratingContainer}>
            <div className={styles.currentRating}>
            <p>Current rating:</p>
            { ratings.some(r=>r.recipeID=recipeID)?
            ratings.map(r=>
                r.recipeID===recipeID ? <h2 key={r.recipeID}>{r.rating}/10</h2>: null)
                : <p>No value has been entered</p>
             
            }
            </div>
            <div className={styles.editContainer}>
            { /* is user changing rating */ }
            {!isEditing && (
                <div>
                <button className={styles.changeBtn} onClick={() => setIsEditing(true)}>
                    Change
                </button>
                <button className={styles.ratingsPageBtn} onClick={() => navigate('/ratings')}>
                    All Ratings
                </button>
                </div>
            )}
            {isEditing && (
          <>
            <label htmlFor="ratings"> Your Rating:</label>
                <select id="ratings" 
                value={currentRating ?? "Not Rated"}
                onChange={handleRating}>
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
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