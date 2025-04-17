//this document is for sorting and displaying 
import {useContext} from "react"
import {RatingsContext} from "./RatingsContext.jsx"
const Ratings=()=>
{
    const {ratings}= useContext(RatingsContext);


    const sortedRating=[...ratings].sort((a,b)=>b.rating-a.rating);


    return(
        <div>
        <ul>
        {sortedRating.map((r)=>
        <li key={r.recipeID}>{r.recipeID}: {r.rating}</li>
        )};
        </ul>
        </div>

    )
}
export default Ratings;