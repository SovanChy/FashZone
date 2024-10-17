
import React from "react";
import styles from "./LandingPage.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/01a2981fb0e533fdb0c50eaa32c20189b28a253a0d63816d140c1ec31e9ea195?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179"
        alt="Landing page header image"
        className={styles.headerImage}
      />
    </header>
  );
}

export default Header;
