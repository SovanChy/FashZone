import React from 'react';
import styles from './ProfilePage.module.css';

const projects = [
  { id: 1, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/da6388239ab22a53eab009136608d5e1f05c90230abd1048cbd5515829782488?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd", alt: "Project 1" },
  { id: 2, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ba0ed04127d39e73112ae5a9e9321a3b5ca3c375b7549da12e230885bd036f2?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd", alt: "Project 2" },
  { id: 3, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3a8600dd506929064060297848c4991cdb819e6d9d5bca784c5be335701a1d7?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd", alt: "Project 3" }
];

function ProjectsSection() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.projectsTitle}>My Projects</h2>
      <div className={styles.projectsGrid}>
        <div className={styles.projectsRow}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectColumn}>
              <div className={styles.projectCard}>
                <img loading="lazy" src={project.src} className={styles.projectImage} alt={project.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;