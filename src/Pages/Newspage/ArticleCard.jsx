
import React from "react";
import styles from "./NewsSection.module.css";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import BlogComponent from "../Blogpage/BlogComponent";



// //3 pictures align with each other 

// function ArticleCard({ image, title, excerpt, author, LinkContainer}) {
//   return (
//     <article className={styles.articleContent}>
//       <img src={image} alt={title} className={styles.articleImage} />
//       <h3 className={styles.articleTitle}>{title}</h3>
//       <p className={styles.articleExcerpt}>{excerpt}</p>
//       <p className={styles.articleAuthor}>Written by {author}</p>
//       <LinkContainer to = "./Blogpage/BlogComponent"></LinkContainer>

      
//     </article>
//   );
// }

// export default ArticleCard;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './ArticleCard.module.css';

// interface ArticleCardProps {
//   image: string;
//   title: string;
//   excerpt: string;
//   author: string;
// }

export default function ArticleCard({ image, title, excerpt, author }) {
  return (
//link to BlogComponent
    <Link to="./BlogComponent" className={styles.articleLink}> 
      <article className={styles.articleCard}>
        <img src={image} alt={title} className={styles.articleImage} />
        <div className={styles.articleContent}>
          <h3 className={styles.articleTitle}>{title}</h3>
          <p className={styles.articleExcerpt}>{excerpt}</p>
          <p className={styles.articleAuthor}>Written by {author}</p>
        </div>
      </article>
    </Link>
  );
}
