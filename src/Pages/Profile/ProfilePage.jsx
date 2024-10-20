import React from 'react';
import styles from './ProfilePage.module.css';
import IntroSection from './IntroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectSection';

function ProfilePage() {
  return (
    <main className={styles.profileContainer}>
      <IntroSection />
      <AboutSection />
      <ProjectsSection />
    </main>
  );
}

export default ProfilePage;