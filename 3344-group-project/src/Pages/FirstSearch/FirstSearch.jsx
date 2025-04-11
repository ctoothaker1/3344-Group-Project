// this file contains a blank search page layout - the user has not searched yet
import React from 'react';
import Search from '../../components/Search/Search';
import { useNavigate } from 'react-router-dom';
import Filter from '../../components/Filter/Filter.jsx';
import styles from './FirstSearch.module.css';

const FirstSearch = () => {
  
  const navigate = useNavigate();

  const handleSearchSubmit = (searchQuery) => {
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className={styles.mainContent}>
      {/* <h1>FirstSearch</h1>
      <p>this page appears before the user searches</p> */}
      <Search onSearchSubmit={handleSearchSubmit} />
      <Filter></Filter> {/*does nothing because all logic is in searchresults.jsx :( */}
    </div>
  );

}
export default FirstSearch;