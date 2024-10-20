



import React from "react";
import styles from "./NewsSection.module.css";
import ArticleCard from "./ArticleCard";
import BlogPost from "./BlogPost";

// Article data
const articles = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6632fcf6780d3ad9a1f1975ca34d842f2875621076451fbc6ec1ca5ec7cfe3be?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Beige Runway",
    excerpt: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jennifer",
    link: "/articles/beige-runway",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/dadc31540fab0df7971e76d09089ab87a79412d6e6ec6e1b0d4586c9e9043e37?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Dior-Jungle Collection",
    excerpt: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
    link: "/articles/dior-jungle-collection",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b637dd4937a6606a7262f4f0d64a58c576de4e6eb97a132efec7c4161271d4ff?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Winter-Spring Collection",
    excerpt: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
    link: "/articles/winter-spring-collection",
  },
];

// Blog data
const blogPosts = [
  {
    title: "October Runway",
    content: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin.",
    author: "Jenny",
  },
  {
    title: "The Best Fashion show you don't want to miss",
    content: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin.",
    author: "Alliza",
  },
  {
    title: "New Winter Collection",
    content: "Lorem ipsum dolor sit amet consectetur. Sed et id at proin.",
    author: "Author",
  },
];

function NewsSection() {
  return (
    <section className={styles.newsContainer}>
      <nav className={styles.navLinks}>
        <span>Blog</span>
        <span>Must-read</span>
        <span>Article</span>
      </nav>
      <div className={styles.contentWrapper}>
        <a href="/featured-news">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/545a95243f184a5e89756a5a5e30a1dbd5fcd1ac072f4060a1b461e8ef4a1d43?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
            alt="Featured news"
            className={styles.heroImage}
          />
        </a>
        <h2 className={styles.sectionTitle}>Must-read</h2>
        <div className={styles.articleGrid}>
          <div className={styles.articleRow}>
            {articles.map((article, index) => (
              <div key={index} className={styles.articleColumn}>
                <a href={article.link}>
                  <ArticleCard {...article} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageGallery}>
          <div className={styles.imageRow}>
            <div className={styles.imageColumn}>
              <a href="/gallery-image1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aeeec48b95ddbf4bbe7b59db89ab92c6f08e15f5354de53143d6c099bfa0b01?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
                  alt="Gallery image 1"
                  className={styles.galleryImage}
                />
              </a>
            </div>
            <div className={styles.imageColumn}>
              <a href="/gallery-image2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/afe381ce27c9cbadacfa0836070baf06a0a9ba1fb000f4f662666e48381021c1?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
                  alt="Gallery image 2"
                  className={styles.galleryImage}
                />
              </a>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Blogs</h2>
        {blogPosts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
