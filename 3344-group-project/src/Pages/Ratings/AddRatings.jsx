import { RatingsContext } from "../../components/Ratings/RatingsContext.jsx";
import {useContext} from "react";
// pass in the ratings like <Rating getRating={{recipe.id, value}}
function Ratings({getRatings})
{

const {ratings,setRating}=useContext(RatingsContext);


    return(
        <div>
        <label for="ratings"> Your Rating:</label>
            <select name="ratings" id="ratings">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
       </div>

    )
}
export default Ratings;