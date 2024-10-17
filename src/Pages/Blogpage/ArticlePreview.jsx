
import React from "react";
import styles from "./BlogComponent.module.css";

function ArticlePreview({ title, subtitle, author }) {
  return (
    <article className={styles.articlePreview}>
      <h2 className={styles.previewTitle}>{title}</h2>
      <p className={styles.previewSubtitle}>{subtitle}</p>
      <p className={styles.previewAuthor}>Written by <em>{author}</em></p>
    </article>
  );
}

export default ArticlePreview;
