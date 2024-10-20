import React from "react";
import styles from "./NewsSection.module.css";

function ArticleCard({ image, title, excerpt, author }) {
  return (
    <article className={styles.articleContent}>
      <img src={image} alt={title} className={styles.articleImage} />
      <h3 className={styles.articleTitle}>{title}</h3>
      <p className={styles.articleExcerpt}>{excerpt}</p>
      <p className={styles.articleAuthor}>Written by {author}</p>
      {/* Link can be added below if necessary */}
      {/* <LinkContainer to="./Blogpage/BlogComponent"></LinkContainer> */}
    </article>
  );
}

export default ArticleCard;
