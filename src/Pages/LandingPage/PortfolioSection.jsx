
import React from "react";
import styles from "./LandingPage.module.css";
import PortfolioCard from "./PortfolioCard";
import { useCollection } from "../../Hook/useCollection";

const portfolioItems = [
  {
    name: "Edna Mode",
    role: "Designer",
    description:
      "As a skilled Pattern Maker, I specialize in turning fashion concepts into precise, production-ready patterns. My expertise spans both traditional and digital methods of pattern drafting, ensuring accuracy, perfect fit, and efficiency in production. With a keen eye for detail, I excel at working with different fabrics and garment structures,",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7d45fb55b09ff8ece79a9b3d9c7d1b2783987c3bef04d9dc9a25603e5b557805?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
  },
  {
    name: "Floral Sofia",
    role: "Model",
    description:
      "As a skilled Pattern Maker, I specialize in turning fashion concepts into precise, production-ready patterns. My expertise spans both traditional and digital methods of pattern drafting, ensuring accuracy, perfect fit, and efficiency in production. With a keen eye for detail, I excel at working with different fabrics and garment structures,",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9eef641c471e02984fb0560bb5b9b53d3614b0931d6e6d7436300ca1cd479af4?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
  },
];

function PortfolioSection() {
  const { documents: usersDocuments, error: usersError } = useCollection("users");

  return (
    <section className={styles.portfolioSection}>
      <h2 className={styles.sectionTitle}>Portfolio</h2>
      <div className={styles.portfolioGrid}>
        {usersDocuments && usersDocuments.slice(0,2).map((item, index) => (
          <PortfolioCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

export default PortfolioSection;
