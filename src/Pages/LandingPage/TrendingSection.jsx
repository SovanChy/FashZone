
import React from "react";
import styles from "./LandingPage.module.css";

function TrendingSection() {
  return (
    <section className={styles.trendingSection}>
      <div className={styles.trendingGrid}>
        <div className={styles.trendingImageWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d23e2e2c24a58712c8f41b1bf602fc958fc1e1a6f0e93c85e9026816e5bff5fd?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179"
            alt="Trending fashion item"
            className={styles.trendingImage}
          />
        </div>
        <div className={styles.trendingContent}>
          <h2 className={styles.trendingTitle}>What is Trending?</h2>
          <p className={styles.trendingDescription}>
            Step up your style and embrace the latest fashion trends! Whether
            it's bold colors, sustainable choices, or retro vibes, now is the
            time to express yourself. Get inspired, mix it up, and make your
            mark.
            <br />
            <br />
            Start today—fashion is waiting for you!
          </p>
          <button className={styles.ctaButton}>Dive In With us!</button>
        </div>
      </div>
      <div className={styles.trendingGallery}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/391ebdbcac9130bbff11b4a88e8a92b604c4d57d3d81bbe97ba1da255abb6041?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179"
          alt="Trending fashion gallery image 1"
          className={styles.galleryImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e17e47fd8e890e564a34e62b5fc15548fff1dfad610b34187efc3c8960e4ac6?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179"
          alt="Trending fashion gallery image 2"
          className={styles.galleryImage}
        />
      </div>
    </section>
  );
}

export default TrendingSection;
