
import React from "react";
import styles from "./LandingPage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";


// The news card which we cannot press on since it's a landing page
//display of the news section

function NewsCard({ title, imageURL, description, displayName, id}) {
  const navigate = useNavigate()
  return (
    <article className={styles.newsCard} onClick={() => navigate(`/article/${id}`)}>
      <img src={imageURL} alt={title} className={styles.newsImage} />
      <div className={styles.newsContent}>
        <h3 className={styles.newsTitle}>{title}</h3>
        <p className={styles.newsDescription}>
        <ReactQuill
            theme="bubble"
            value={description}
            readOnly={true}
            modules={{ toolbar: false }}
            style={{ width: "100%", height: "200px" }}
            className="!border-none no-scroll"
          />
        </p>
        <p className={styles.newsAuthor}>Written by <em>{displayName}</em></p>
      </div>
    </article>
  );
}

export default NewsCard;

