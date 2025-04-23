import {createContext, useState, useEffect} from "react";

export const RatingsContext=createContext();

 export const RatingsProvider=({children})=>
    {
        
    const [ratings,setRatings]=useState(() =>

    {

        const updatedRating=localStorage.getItem("ratings")
        return updatedRating ? JSON.parse(updatedRating): [];

    });

    useEffect(()=>
    {
    localStorage.setItem("ratings", JSON.stringify(ratings));

    }, [ratings]);

        return(
            <RatingsContext.Provider value={{ratings, setRatings}}>
                {children}
            </RatingsContext.Provider>
        )

    }
 
