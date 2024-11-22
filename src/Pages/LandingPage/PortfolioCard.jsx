import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import ReactQuill, { displayName } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Image} from 'react-bootstrap'
function PortfolioCard({ displayName, occupations, description, imageURL, id}) {
  const navigate = useNavigate();

  return (
    <article className={styles.portfolioCard} onClick={() => navigate(`profile/${id}`)}>
      <div className={styles.portfolioInfo}>
        <h3 className={styles.portfolioName}>{displayName}</h3>
        <p className={styles.portfolioRole}>{occupations}</p>
        <p className={styles.portfolioDescription}>
      
          <ReactQuill
            theme="bubble"
            value={description}
            readOnly={true}
            modules={{ toolbar: false }}
            style={{ width: "80%", height: "400px" }}
            className="!border-none no-scroll"
          />
        </p>
        {/* <button className={styles.viewMoreButton}>View More</button> */}
        <button className={styles.PButton} onClick={() => navigate("signup")}>
          View More
        </button>
      </div>
      {/* <div className={styles.portfolioImageWrapper}> */}
      <Image
        fluid
        src={imageURL}
        alt={`${displayName}'s portfolio`}
        className={styles.portfolioImage}
      />
      {/* </div> */}
    </article>
  );
}

export default PortfolioCard;
