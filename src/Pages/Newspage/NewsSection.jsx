//the 1 that works

// import React from "react";
// import styles from "./NewsSection.module.css";
// import ArticleCard from "./ArticleCard";
// import BlogPost from "./BlogPost";

// const articles = [
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/6632fcf6780d3ad9a1f1975ca34d842f2875621076451fbc6ec1ca5ec7cfe3be?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
//     title: "Beige Runway",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
//     author: "Jessica",
//   },
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/dadc31540fab0df7971e76d09089ab87a79412d6e6ec6e1b0d4586c9e9043e37?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
//     title: "Dior-Jungle Collection",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
//     author: "Jessica",
//   },
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/b637dd4937a6606a7262f4f0d64a58c576de4e6eb97a132efec7c4161271d4ff?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
//     title: "Winter-Spring whatever collection",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
//     author: "Jessica",
//   },
// ];

// const blogPosts = [
//   {
//     title: "title",
//     content:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
//     author: "Author",
//   },
//   {
//     title: "title",
//     content:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
//     author: "Author",
//   },
//   {
//     title: "title",
//     content:
//       "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
//     author: "Author",
//   },
// ];

// function NewsSection() {
//   return (
//     <section className={styles.newsContainer}>
//       <nav className={styles.navLinks}>
//         <span>Blog</span>
//         <span>Must-read</span>
//         <span>Article</span>
//       </nav>
//       <div className={styles.contentWrapper}>
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/545a95243f184a5e89756a5a5e30a1dbd5fcd1ac072f4060a1b461e8ef4a1d43?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
//           alt="Featured news"
//           className={styles.heroImage}
//         />
//         <h2 className={styles.sectionTitle}>Must-read</h2>
//         <div className={styles.articleGrid}>
//           <div className={styles.articleRow}>
//             {articles.map((article, index) => (
//               <div key={index} className={styles.articleColumn}>
//                 <ArticleCard {...article} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className={styles.imageGallery}>
//           <div className={styles.imageRow}>
//             <div className={styles.imageColumn}>
//               <img
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aeeec48b95ddbf4bbe7b59db89ab92c6f08e15f5354de53143d6c099bfa0b01?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
//                 alt=""
//                 className={styles.galleryImage}
//               />
//             </div>
//             <div className={styles.imageColumn}>
//               <img
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/afe381ce27c9cbadacfa0836070baf06a0a9ba1fb000f4f662666e48381021c1?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
//                 alt=""
//                 className={styles.galleryImage}
//               />
//             </div>
//           </div>
//         </div>
//         <h2 className={styles.sectionTitle}>Blogs</h2>
//         {blogPosts.map((post, index) => (
//           <BlogPost key={index} {...post} />
//         ))}
//       </div>
//       <footer className={styles.footer}>
//         <div className={styles.footerContent}>
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ea3fe1c7a99a51490b34d03d0f4f3f5699d866843a3a1ce2e39dfbb2ca0f033?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
//             alt="Footer logo"
//             className={styles.footerLogo}
//           />
//           <p className={styles.footerText}>
//             Lorem ipsum dolor sit amet consectetur. Orci aliquam nibh at ut. Et
//             eget enim aliquam velit. Nulla mi semper egestas gravida nunc.
//             Tellus eu ornare vestibulum pellentesque lectus leo ultrices. In
//             tempus turpis amet id sit sollicitudin fames vitae nam.
//           </p>
//           <h2 className={styles.footerBrand}>FashZone</h2>
//         </div>
//       </footer>
//     </section>
//   );
// }

// export default NewsSection



// the one that the img are links
// The main page fro news page

import React from "react";
import styles from "./NewsSection.module.css";
import ArticleCard from "./ArticleCard";
import BlogPost from "./BlogPost";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

// export default function BlogComponent();

//Article data
const articles = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6632fcf6780d3ad9a1f1975ca34d842f2875621076451fbc6ec1ca5ec7cfe3be?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Beige Runway",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jennifer",
    link: LinkContainer,
     // Example link- add link to blog post
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dadc31540fab0df7971e76d09089ab87a79412d6e6ec6e1b0d4586c9e9043e37?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Dior-Jungle Collection",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
    link: "/articles/dior-jungle-collection", // Example link
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b637dd4937a6606a7262f4f0d64a58c576de4e6eb97a132efec7c4161271d4ff?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd",
    title: "Winter-Spring Collection",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida",
    author: "Jessica",
    link: "/articles/winter-spring-collection", // Example link
  },
];

//Blog data
const blogPosts = [
  {
    title: "title",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
    author: "Author",
  },
  {
    title: "title",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
    author: "Author",
  },
  {
    title: "title",
    content:
      "Lorem ipsum dolor sit amet consectetur. Sed et id at proin. Gravida pellentesque eget accumsan non ullamcorper. Id quam nec proin eu congue arcu non vitae commodo. Adipiscing tempor bibendum condimentum tempor id libero.",
    author: "Author",
  },
];

export default function NewsSection() {
  return (

    <div className={styles.newsContainer}>
      <nav className={styles.navLinks}>
      <Link to="/blog"><span>Blog</span></Link>
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

{/* Article card  place */}
      {/* <LinkContainer to="/BlogComponent"> */}
          <div className={styles.articleRow}>
            {articles.map((article, index) => (
              <div key={index} className={styles.articleColumn}>
                <a href={article.link}>
                  <ArticleCard {...article} />
                </a>
              </div>
            ))}
          </div>
          {/* </LinkContainer> */}
{/* End of article */}

        </div>
        <div className={styles.imageGallery}>
          <div className={styles.imageRow}>  {/* For the 2 image that align with each other */}
            <div className={styles.imageColumn}>

{/* the 2 imge that align qith each other */}

              <a href="/gallery-image1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aeeec48b95ddbf4bbe7b59db89ab92c6f08e15f5354de53143d6c099bfa0b01?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd/"
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
    </div>
  );
}




