import React, {useState} from "react";



function AddFavorite({favorite})
{
    //If the user redirects, e.g. leaves the page 
    //we want to make sure that we are saving their favorites 
    //this useState will allow use to grab the state via our previously saved local storage
    // and then initialize them as the default useState
    const [recipes,setRecipes]=useState(()=>
    {
        const savedFavorites=localStorage.getItem("list")
        return savedFavorites? JSON.parse(savedFavorites):[];

    });


    const isSelected=recipes.some(recipe=>recipe.idMeal==favorite.idMeal); //determines whether or not the recipe is in their list 

    const handleClick=()=>  //main priority is to modify
    {
        const updatedArray= isSelected //if the button was previously selected aka the user already added it to the list 
        ? //we know that the user is trying to remove it from their list (it was already added)
        recipes.filter(recipe=>recipe.idMeal!=favorite.idMeal)//we want to update the state of the array after removal
        :  [...recipes,favorite];

        setRecipes(updatedArray);
       //we are gonna pass this to search results so that button will display
        localStorage.setItem("list", JSON.stringify(updatedArray)); //saving the array as a list within local storage 
        //avoid asyoynchornous errors 

    };
 
        return(
           <div>
            <button type="button" onClick={handleClick} style={{

                backgroundColor: isSelected ? "red" : "green",
                color: "white"
            }}
            >
                {isSelected? "Remove from List ": "Add to List"}
            </button>

           </div>
        )



}
export default AddFavorite;