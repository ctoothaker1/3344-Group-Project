import React, { useState } from "react";
import styles from "./Footer.module.css";
const Footer = () => {

  return (
    <footer className={styles.footer}>
      <h1>&copy; Group 4</h1>
      <h1>|</h1>
      <h1><a href="https://github.com/ctoothaker1/3344-Group-Project" target="_blank">GitHub Repository</a></h1>
    </footer>
  );
};
export default Footer;