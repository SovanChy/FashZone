import React from "react";
import styles from "./NewsSection.module.css";
import ArticleCard from "./ArticleCard";
import BlogCard from "./BlogCard";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Article data

// Blog data

function NewsSection() {
  const navigate = useNavigate();
  

  return (
    <section className={styles.newsContainer}>
      <nav className={styles.navLinks}>
        <span>Blog</span>
        <span>Must-read</span>
        <span>Article</span>
      </nav>
      <div className={styles.contentWrapper}>
       
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/545a95243f184a5e89756a5a5e30a1dbd5fcd1ac072f4060a1b461e8ef4a1d43?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
            alt="Featured news"
            className={styles.heroImage}
          />
  
        <h2
          className={styles.sectionTitle}
          onClick={() => navigate("/article")}
        >
          Articles
        </h2>
        <h2
          className={styles.sectionTitle}
        >
          Trending
        </h2>
        <Row className="g-4 mt-4">
          <Col md={12} className="mb-4">
            <ArticleCard />
          </Col>
        </Row>
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

        <h2 className={styles.sectionTitle} onClick={(e) => navigate('/blog')}>Blogs</h2>
        <div>
          <BlogCard/>
        </div>
        
      </div>
    </section>
  );
}

export default NewsSection;
