import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className={styles.header}>
      <div id="leftContainer">
        <h1>Recipe Advisor</h1>
      </div>
      <div id='rightContainer'>
        <nav>
          <ul className={styles.navLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to='/myplans/'>My Meal Plans</Link></li>
              <li><Link to='/search/'><img src="../../src/assets/search.png" alt="Search Icon" /></Link></li>
              {/*search icon source: <a href="https://www.flaticon.com/free-icons/magnifying-glass" title="magnifying glass icons">Magnifying glass icons created by chehuna - Flaticon</a>*/ }
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;