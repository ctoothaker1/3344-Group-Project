//this document is for sorting and displaying 
import {useContext} from "react"
import {RatingsContext, RatingsProvider} from "./RatingsContext.jsx"
const Ratings=()=>
{
    const {ratings,setRatings}= useContext(RatingsContext); //undefined
    console.log("ratings from context",ratings); 

    const sortedRating=[...ratings].sort((a,b)=>b.rating-a.rating); //cant iterate undefined.


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