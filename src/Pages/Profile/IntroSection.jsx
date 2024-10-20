import React from 'react';
import styles from './ProfilePage.module.css';

function IntroSection() {
  return (
    <section className={styles.headerSection}>
      <div className={styles.introColumn}>
        <div className={styles.introBox}>
          <div className={styles.introContent}>
            <h1 className={styles.name}>Mercy carl</h1>
            <p className={styles.title}>Designer</p>
          </div>
        </div>
      </div>
      <div className={styles.imageColumn}>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a61fabaa275ea119c6d01cd256d6fabfebdfe5e11fc8e797be43522db1c180ca?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd" className={styles.profileImage} alt="Mercy Carl, Designer" />
      </div>
    </section>
  );
}

export default IntroSection;