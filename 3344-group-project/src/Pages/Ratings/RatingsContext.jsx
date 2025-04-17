import {createContext, useState, useEffect} from "react";

export const RatingsContext=createContext();


 export const RatingsProvider=({children})=>
    {
        
    const [rating,setRating]=useState(() =>

    {

        const updatedRating=localStorage.getItem("ratings")
        return updatedRating ? JSON.parse(updatedRating): [];

    });

    useEffect(()=>
    {
    localStorage.setItem("rating", JSON.stringify(rating));

    }, [rating]);




        
        
        
        return(

            <RatingsContext.Provider value={{rating, setRating}}>
                {children}
            </RatingsContext.Provider>




        )



    }
 
