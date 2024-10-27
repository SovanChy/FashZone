import React from "react";
import styles from "./BlogComponent.module.css";
import Header from "./Header";
import MainContent from "./MainContent";
import ImageGallery from "./ImageGallery";
import ArticlePreview from "./ArticlePreview";
// export default function BlogComponent()


function BlogComponent() 
{
  return (
    <main className={styles.blogContainer}>
      <Header />
      <section className={styles.contentWrapper}>
        <MainContent />
      </section>
      <ImageGallery />
      <section className={styles.articlePreviews}>
        <ArticlePreview
          title="DIOR Runway"
          subtitle="Autumn-Winter Show - DÉFILÉS PRÊT-À-PORTER - Women's Fashion | DIOR"
          author="Selena"
        />
        <ArticlePreview
          title="Winter-Spring whatever collection"
          subtitle="Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida"
          author="Jessica"
        />
      </section>
  
    </main>
  );
}

export default BlogComponent;
