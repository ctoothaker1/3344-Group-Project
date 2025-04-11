// this file contains search page layout when /search/somequery is in the url
import React from 'react';
import { useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import styles from './SearchResults.module.css'


const SearchResults = () => {
  const {query} = useParams();
  const [results, setResults] = useState([]);
  const [filters,setFilters] = useState([]);
  const [filteredResults,setFilteredResults]=useState([])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); //loading state=false by default

  const handleFilter=(filters)=>
    {
      setFilters(filters);
    }

  //API CALL with provided query
  const fetchSearchResults = async (query) => {
    setLoading(true); // fetching data, set loading to true
    const endpoint = `http://localhost:5001/api/recipes?query=${query}`;
    console.log("✅ Final API endpoint:", endpoint);
    try
    {
      // this should be the endpoint we created in the server
      //const response = await fetch(`/api/recipes?query=${query}`); // //`http://localhost:5000/api/recipes?query=${query}`
      const response = await fetch(`http://localhost:5001/api/recipes?query=${query}`);
      console.log("response variable: ",response);
      
      const data = await response.json(); // set data to json API response ERRRRRROR

      console.log("fetched data variable (searchresults.jsx): ",data); // returns error response from line 52 in server.mjs
      
      if (data.meals){//translate the data
        setResults(data.meals); 
        console.log("Categories in API results:", data.meals.map(m => m.strCategory));
      }
      else{
        setResults([]); // no results found, set results to empty array to avoid errors
      }
    }
    catch(error)
    {
      console.error("error fetching recipes from API (in SearchResults.jsx)", error);
      // alert("error fetching recipes from API (in SearchResults.jsx)", error);
    }
    finally
    {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchResults(query);
  },[query]); 

  useEffect(()=>{
  if(filters.length==0)
  {
    setFilteredResults(results); //if there are not filters correlated then we just return the original
  }
  else{
    const filtered=results.filter(result=> //filtered is an array that contains 
      filters.includes(result.strCategory)
      //new array where for each recipe within the results array 
     //filters is iterated through itself to see if it contains the current recipe's category 
    );
      setFilteredResults(filtered);
      // change length of results 
    }
  },[filters,results]
  );
    //execute this when search is performed
    const handleSearchSubmit = (searchQuery) => {
        navigate(`/search/${searchQuery}`);
      
    };

  return ( // display results under search bar
    <div className={styles.mainContent}>
      <div className={styles.searchComponentContainer}>
        <Search onSearchSubmit={handleSearchSubmit} />
      </div>
        <Filter getFilter={handleFilter}></Filter>
        {/* display results header only if there is a query and not loading */}
    {query && !loading && filteredResults.length!=0 && (
        <h3>{filteredResults.length} results for "{query}"</h3>
      )}
        
    <div className={styles.searchResultsContainer}>
      <ul className={styles.resultsList}>
        {
          // if there is no query, prompt the user to search first.
          !query ? (
            <p>Search for a recipe!</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <li key={result.idMeal} className={styles.resultItem}>
                <Link to={`/recipe/${result.idMeal}`} className={styles.resultLink}>
                  <h2>{result.strMeal}</h2>
                  <img src={result.strMealThumb} alt={result.strMeal} />
                </Link>
              </li>
            ))
          ) : (
            <p>No results for "{query}".</p>
          )
        }
          </ul>
        </div>
  </div>
  );
};

export default SearchResults;