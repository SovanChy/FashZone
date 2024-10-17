
import React from "react";
import styles from "./LandingPage.module.css";
import NewsCard from "./NewsCard";

const newsArticles = [
  {
    title: "Beige Runway",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/33d6526b1b2c78f4563225dbba45bdb0582fb38be65c823bf42c5b7514824390?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
  },
  {
    title: "Dior-Jungle Collection",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2ed5f70c36dbfd8ef5659748d565b181cbd9bce8970a16fa283165af10991256?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
  },
  {
    title: "Winter-Spring whatever collection",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e0fb4803079a73cdb300c39efc9f6b56d9355e203e4110bfb29bd39f848f399e?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
  },
];

function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <h2 className={styles.sectionTitle}>News/ Article</h2>
      <div className={styles.newsGrid}>
        {newsArticles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
