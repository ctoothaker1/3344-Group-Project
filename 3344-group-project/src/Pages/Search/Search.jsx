// this file contains search page layout when /search/somequery is in the url
import React from 'react';
import { useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import AddFavorite from '../MyFavorites/AddFavorite.jsx'
import styles from './Search.module.css'



const Search = () => {
  const {query} = useParams();
  const [results, setResults] = useState([]);
  const [filters,setFilters] = useState([]);
  const [filteredResults,setFilteredResults]=useState([])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); //loading state=false by default

  const proxyServerUrl = import.meta.env.VITE_PROXY_URL;

  const handleFilter=(filters)=>
    {
      setFilters(filters);
    }

  //API CALL with provided query
  const fetchSearchResults = async (query) => {
    setLoading(true); // fetching data, set loading to true
    const endpoint = `${proxyServerUrl}/api/recipes?query=${query}`;
    console.log("✅ Final API endpoint:", endpoint);
    try
    {
      // this should be the endpoint we created in the server
      //const response = await fetch(`/api/recipes?query=${query}`); // //`http://localhost:5000/api/recipes?query=${query}`
      const response = await fetch(`${proxyServerUrl}/api/recipes?query=${query}`);
      console.log("response variable: ",response);
      
      const data = await response.json(); // set data to json API response ERRRRRROR

      console.log("fetched data variable (search.jsx): ",data); // returns error response from line 52 in server.mjs
      
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
      console.error("error fetching recipes from API (in Search.jsx)", error);
      // alert("error fetching recipes from API (in SearchResults.jsx)", error);
    }
    finally
    {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query !== undefined){ // only call api when there is a query
      fetchSearchResults(query);
    }
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
    <main>
      <div className={styles.mainContent}>
        <div className={styles.searchComponentContainer}>
          <SearchBar onSearchSubmit={handleSearchSubmit} />
        </div>
        <div className={styles.filterComponentContainer}>
          <Filter getFilter={handleFilter}></Filter> 
        </div>
        {/* display results header only if there is a query and not loading */}
    {query && !loading && filteredResults.length!=0 && (
        <h3>{filteredResults.length} results for "{query}"</h3>
      )}
        
        <div className={styles.searchResultsContainer}>
          {
          !query ? (
          <p>Search for a recipe!</p>
        ) : loading ? (
        <p>Loading...</p>
      ) : filteredResults.length > 0 ? (
      <div className={styles.resultsList}>
        {filteredResults.map((result) => (
          <div key={result.idMeal} className={styles.resultItem}>
            <div className={styles.textContainer}>
                <h2 className={styles.resultTitle}>{result.strMeal}</h2>
            </div>   

            <Link to={`/recipe/${result.idMeal}`} className={styles.resultLink}>
            <img 
              src={result.strMealThumb} 
              alt={result.strMeal} 
              className={styles.resultImage}
              />                        
            </Link>
            
            <div className={styles.favoriteButton}>
              <AddFavorite favorite={result} />
            </div>
            
          </div>
        ))}
      </div>
    ) : (
      <p>No results for "{query}".</p>
    )
  }
</div>
    </div>
  </main>
  );
};

export default Search;