import React, { useState } from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {

  const [selectedPage, setSelectedPage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const page = event.target.value;
    setSelectedPage(page);
    
    if (page) {
      navigate(page); // navigate to the selected page in dd
    }
  };

  return (
    <footer className={styles.footer}>

      <label htmlFor="pageSelect">USE FOR TESTING</label>
      <select
        id="pageSelect"
        value={selectedPage}
        onChange={handleChange}
      >
        {/* <option value="">--Select a page--</option> */}
        <option value="/">home</option>
        <option value="/recipe">blank recipe</option>
        <option value="/recipe/53071">recipe with ID</option>
        <option value="/favorites/">Favorites</option>
        <option value="/myplans/">myplans</option>
        <option value="/plan/">blank plan</option>
        <option value="/plan/planname">plan with name</option>
        <option value="/search/">searchNoQuery</option>
        <option value="/search/a">search a query</option>


      </select>

      <h1>&copy; Group 4</h1>
      <h1>|</h1>
      <h1><a href="" target="_blank">A link to somewhere</a></h1>
    </footer>
  );
};
export default Footer;