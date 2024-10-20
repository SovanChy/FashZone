
import React from "react";
import styles from "./LandingPage.module.css";

// The news card which we cannot press on since it's a landing page
//display of the news section

function NewsCard({ title, imageSrc, description, author }) {
  return (
    <article className={styles.newsCard}>
      <img src={imageSrc} alt={title} className={styles.newsImage} />
      <div className={styles.newsContent}>
        <h3 className={styles.newsTitle}>{title}</h3>
        <p className={styles.newsDescription}>{description}</p>
        <p className={styles.newsAuthor}>Written by <em>{author}</em></p>
      </div>
    </article>
  );
}

export default NewsCard;

