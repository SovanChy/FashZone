
import React from "react";
import styles from "./BlogComponent.module.css";

function ImageGallery() {
  return (
    <section className={styles.imageGallery}>
      <div className={styles.galleryItem}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a149ad48edf4a691b88ef9b285e91ab5e508f093613f7f5583400706ff05831e?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
          alt="Fashion gallery image 1"
          className={styles.galleryImage}
        />
      </div>
      <div className={styles.galleryItem}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/935da7f35446014b1cd11a070677db7027623ebd9bee4bcf9665903edf38ccde?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
          alt="Fashion gallery image 2"
          className={styles.galleryImage}
        />
      </div>
    </section>
  );
}

export default ImageGallery;
