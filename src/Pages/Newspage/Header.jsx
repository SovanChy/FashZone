import React from "react";
import styles from "./BlogComponent.module.css";

function Header({document}) {
  console.log(document)
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>{document.title}</h1>
        <p className={styles.headerAuthor}>Written by <em>{document.displayName}</em></p>
      </div>
      <img
        src={document.imageURL}
        alt="Dior Collection Header Image"
        className={styles.headerImage}
      />
    </header>
    
  );
}

export default Header;
