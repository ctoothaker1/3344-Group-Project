import React from "react";
import styles from "./Search.module.css";
import { useState } from "react";

//search component with input and button

const Search = ({onSearchSubmit}) => {

    const [searchQuery, setSearchQuery] = useState('');


    const handleInputChange = (event) => { // change search query as it changes
        setSearchQuery(event.target.value);
      };

    const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
        onSearchSubmit(trimmedQuery);
    }
    };
    const handleDiets = (event)=>
    {
      const { value,checked }=event.target;


      if(checked){
        setDiets(prev=>[...prev,value]); //previous value now becomes [whatever the array was before, the new checked value]
      }
      else{
        setDiets(prev=>prev.filter(diet=>diet!=value)) //prev now equals an array full of diets that aren't the current value *(the user unchecks a diet)
      }

    }

    


  return (

    <form className={styles.searchContainer} onSubmit={handleSubmit}>
        <label htmlFor="search-box">Search:</label>
        <input type ="text" id="search-box" value={searchQuery} onChange={handleInputChange} placeholder="Cook something new!"></input>
        <button type = "submit">Search</button> 
        {/* run search function, redirect to search page*/ }
    </form>
   

    
  );
};
export default Search;