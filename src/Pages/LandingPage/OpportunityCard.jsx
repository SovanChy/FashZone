
import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

function OpportunityCard({ title, imageSrc, description }) {
  const navigate = useNavigate()

  return (
    <article className={styles.opportunityCard}>
      <h3 className={styles.opportunityTitle}>{title}</h3>
      <div className={styles.opportunityContent}>
        <img
          src={imageSrc}
          alt={`${title} opportunity`}
          className={styles.opportunityImage}
        />
        <div className={styles.opportunityDescription}>
          <p>
            <strong>Salary:</strong> Negotiate
          </p>
          <p>
            <strong>Experience:</strong>
          </p>
          <p>{description}</p>
        </div> </div>
        <button className={styles.viewMoreButton} onClick={() => navigate("/signup")}>View more</button>
     
    </article>
  );
}

export default OpportunityCard;
