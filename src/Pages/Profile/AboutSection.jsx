import React from "react";
import styles from "./ProfilePage.module.css";

//library
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AboutSection({description}) {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <div className={styles.aboutTextColumn}>
          <p className={styles.aboutText}>
            <ReactQuill
              theme="bubble"
              value={description}
              readOnly={true}
              modules={{ toolbar: false }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
