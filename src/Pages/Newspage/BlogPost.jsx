
import React from "react";
import styles from "./NewsSection.module.css";

//As lit view the 1 in the buttom

function BlogPost({ title, content, author}) {
  return (
    <article>
      <h3 className={styles.blogTitle}>{title}</h3>
      <p className={styles.blogContent}>{content}</p>
      <p className={styles.blogAuthor}>Written by <em>{author}</em></p>
    </article>
  );
}

export default BlogPost;
