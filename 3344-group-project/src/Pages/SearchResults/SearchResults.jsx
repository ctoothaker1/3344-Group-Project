// this file contains search page layout when /search/somequery is in the url
import React from 'react';
import { useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import styles from './SearchResults.module.css'


const SearchResults = () => {
  const {query} = useParams();
  
  const [results, setResults] = useState([]);

  // store the search results
   const[filters,setFilters]=useState([]);
   const [filteredResults,setFilteredResults]=useState([])
  const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);

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
  }


  },[filters,results]
  );

    //execute this when search is performed
    const handleSearchSubmit = (searchQuery) => {
        // redirect to /search/{query} when search submitted so we can use the query in the url in code
        navigate(`/search/${searchQuery}`);
      
    };
    console.log("length of results: ",results.length);

  return ( // display results under search bar
      
    <div className={styles.mainContent}>
      <h1>{results.length} results for "{query}"</h1>
      <div className={styles.searchComponentContainer}>
        <Search onSearchSubmit={handleSearchSubmit} />
      </div>

        <Filter getFilter={handleFilter}></Filter>

        <div className={styles.searchResultsContainer}>
        <ul>
          {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
                <li key={index} className={styles.resultItem}>
                <h3>{result.strMeal}</h3>
                <img src={result.strMealThumb} alt={result.strMeal}/>
                {/* Link to detailed recipe page */}
                
                </li>
              ))
          ) : (
            <p>No results for "{query}".</p> 
          )}
        </ul>
      </div>
  </div>

  );
};

export default SearchResults;