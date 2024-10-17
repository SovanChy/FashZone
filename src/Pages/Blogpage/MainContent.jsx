
import React from "react";
import styles from "./BlogComponent.module.css";

function MainContent() {
  return (
    <article className={styles.mainContent}>
      <p className={styles.articleText}>
        Lorem ipsum dolor sit amet consectetur. Amet eros tortor nisl ac
        integer. Scelerisque blandit duis viverra enim. Nunc pellentesque odio
        eu diam scelerisque. Mattis nunc viverra nisl lorem tellus. Egestas
        ipsum et adipiscing ornare felis placerat nec convallis. Quisque
        ultricies tristique interdum tempus. Mattis eu lectus ultrices placerat
        odio id mauris. Nullam odio diam aliquam quam risus mollis. Pretium in
        et velit donec. Massa eget quis pharetra interdum nisl morbi volutpat.
        Sed arcu enim tincidunt et a adipiscing elementum rhoncus. Ut fames
        semper eget odio pharetra aliquet consequat facilisi amet. Consequat
        proin lacus posuere volutpat magna aliquam senectus elit arcu. Vitae sit
        dictum congue a amet aliquam.
      </p>
      <div className={styles.imageContainer}>
        <img
          src="https://assets.vogue.in/photos/62ac338a683ad778c714a4b3/1:1/w_2284,h_2284,c_limit/1403336210"
          alt="Fashion image 1"
          className={styles.contentImage}
        />
        <img
          src="https://blog.theluxurycloset.com/wp-content/uploads/2023/05/DIOR-INDIA-SHOW-REVIEW-voguebus-story-inline-1-1350x900.webp"
          alt="Fashion image 2"
          className={styles.contentImage}
        />
      </div>
      <p className={styles.articleText}>
        Lorem ipsum dolor sit amet consectetur. Amet eros tortor nisl ac
        integer. Scelerisque blandit duis viverra enim. Nunc pellentesque odio
        eu diam scelerisque. Mattis nunc viverra nisl lorem tellus. Egestas
        ipsum et adipiscing ornare felis placerat nec convallis. Quisque
        ultricies tristique interdum tempus. Mattis eu lectus ultrices placerat
        odio id mauris. Nullam odio diam aliquam quam risus mollis. Pretium in
        et velit donec. Massa eget quis pharetra interdum nisl morbi volutpat.
        Sed arcu enim tincidunt et a adipiscing elementum rhoncus. Ut fames
        semper eget odio pharetra aliquet consequat facilisi amet. Consequat
        proin lacus posuere volutpat magna aliquam senectus elit arcu. Vitae sit
        dictum congue a amet aliquam.
      </p>
    </article>
  );
}

export default MainContent;
