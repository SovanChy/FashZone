
import React from "react";
import styles from "./LandingPage.module.css";

function PortfolioCard({ name, role, description, imageSrc }) {
  return (
    <article className={styles.portfolioCard}>
      <div className={styles.portfolioInfo}>
        <h3 className={styles.portfolioName}>{name}</h3>
        <p className={styles.portfolioRole}>{role}</p>
        <p className={styles.portfolioDescription}>{description}</p>
        {/* <button className={styles.viewMoreButton}>View More</button> */}
        <button className={styles.PButton}>View More</button>
      </div>
      {/* <div className={styles.portfolioImageWrapper}> */}
        <img
          src={imageSrc}
          alt={`${name}'s portfolio`}
          className={styles.portfolioImage}
        />
      {/* </div> */}
    </article>
  );
}

export default PortfolioCard;
