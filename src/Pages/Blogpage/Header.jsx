import React from "react";
import styles from "./BlogComponent.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>RUNWAY</h1>
        <h2 className={styles.headerSubtitle}>DIOR COLLECTION</h2>
        <p className={styles.headerAuthor}>Written by <em>"Gasolina Tanky"</em></p>
      </div>
      <img
        src="https://blog.theluxurycloset.com/wp-content/uploads/2023/05/dior-cruise-2023-1655458948.jpg"
        alt="Dior Collection Header Image"
        className={styles.headerImage}
      />
    </header>
    
  );
}

export default Header;
