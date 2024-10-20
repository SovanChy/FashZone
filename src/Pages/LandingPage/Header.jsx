
import React from "react";
import styles from "./LandingPage.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <img
        src="https://awsimages.detik.net.id/community/media/visual/2022/03/09/saint-laurent-womenswear-springsummer-2022.jpeg?w=1200"
        alt="Landing page header image"
        className={styles.headerImage}
      />
    </header>
  );
}

export default Header;
