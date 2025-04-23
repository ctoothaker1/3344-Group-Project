// this file returns the home page 
// contains routing functionality for search
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import siteLogo from '/siteLogo.svg'  -- we should make a logo
// import './App.css'
import SearchBar from '../../components/Search/Search';
import styles from './Home.module.css';
import Featured from '../../components/FeaturedMeals/FeaturedMeals';

function Home() {

  const navigate = useNavigate();

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim()) {
      // redirect to standalone search page
      navigate(`/search/${searchQuery}`);
    }
  };

  return ( // HOME PAGE LAYOUT
    <>
        <main className={styles.homepage}>
          <div className={styles.homepageContent}>
            <div className={styles.homepageRow}>
              <div className={styles.homepageLeft}>
                <h1 className={styles.homepageTitle}>Welcome to Recipe Advisor</h1>
                <SearchBar onSearchSubmit={handleSearchSubmit}/> {/* search component*/}
              </div>
              <div className={styles.homepageRight}>
                <p className={styles.homepageDescription}>
                  Welcome to <strong>Recipe Advisor</strong> - your personalized meal planning/ Recipe Search Assistant!
                  Easily search for delicious recipes from around  the world, customize your own meal plans, and save
                  all your favorites all in one place. Whether you're cooking for health, fun, or family, we've got the 
                  perfect recipe for you. 
                </p>
              </div>
            </div>
            <div className={styles.randomFeatured}>
              <Featured/>
            </div>
          </div>

          {/* Featured Recipes (breakfasts??)*/}
          {/* Featured Recipes (lunches??)*/}
          {/* Featured Recipes (dinners??)*/}
          {/* Featured Recipes (random??)*/}
          {/* Component for new users: EX button to create your first meal plan, and a button to search*/}
        </main>
    </>
  );
}

export default Home
