import { RatingsContext } from "./RatingsContext.jsx";
import {useContext} from "react";
// pass in the ratings like <Rating getRating={{recipe.id, value}}
function AddRatings({recipeID})
{
const {ratings,setRating}=useContext(RatingsContext);
console.log(ratings);

 //if the user already has a rating we know that we are just changing the value 
const handleRating=(e)=>
{
    const hasRating=ratings.some(r=>r.recipeID==recipeID);
    const {value}=parseInt(e.target);
    if(hasRating)  //if the user has the rating we are literally just gonna take that recipe and update it 
    {
    const updatedRating=ratings.map(r=>
    
    r.recipeID===recipeID ? {recipeID, rating:value}: r )
    
    setRating(updatedRating);
    } 
    else{ //if not we will create a new object within the array
        const newRatingsArray=
        [...ratings, {recipeID,rating:value}];
        setRating(newRatingsArray);
    
    }



}


    return(
        <div>
        <label for="ratings"> Your Rating:</label>
            <select name="ratings" id="ratings" onChange={handleRating}>
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
       </div>

    );
}
export default AddRatings;