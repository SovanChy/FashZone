import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useTimestampFormat from "../../Hook/useTimeStampFormat";

function OpportunityCard({ title, imageURL, salary, description, deadline, company}) {
  const navigate = useNavigate();
  const {formatTimestamp} = useTimestampFormat()

  return (
    <article className={styles.opportunityCard}>
      <h3 className={styles.opportunityTitle}>{title}</h3>
      <div className={styles.opportunityContent}>
        <img
          src={imageURL}
          alt={`${title} opportunity`}
          className={styles.opportunityImage}
        />
        <div className={styles.opportunityDescription}>
          <p>
            <strong>Salary: {salary}</strong> 
          </p>
          <p>
            <strong>Deadline: {deadline ? `${new Date(deadline).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}`
                      : "No date"}</strong> 
          </p>
          <p>
            <strong>Company: {company}</strong>
          </p>
          <ReactQuill
            theme="bubble"
            value={description}
            readOnly={true}
            modules={{ toolbar: false }}
            style={{ width: "100%", height: "200px"}}
            className="!border-none no-scroll"               

          />
        </div>{" "}
      </div>
      <button
        className={styles.viewMoreButton}
        onClick={() => navigate("/signup")}
      >
        View more
      </button>
    </article>
  );
}

export default OpportunityCard;
