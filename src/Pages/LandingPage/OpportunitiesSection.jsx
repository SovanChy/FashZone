
import React from "react";
import styles from "./LandingPage.module.css";
import OpportunityCard from "./OpportunityCard";

const opportunities = [
  {
    title: "Designer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fdca4a854deba2b355eb92fa51742dd12a54ddb9950df98139ea71ece9b3b32b?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s",
  },
  {
    title: "Digital Marketing Agent",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8c0f748c0607e82324723a57171e55f07b4bf536769859f607943ed84c74f2bf?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s",
  },
  {
    title: "Designer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fdca4a854deba2b355eb92fa51742dd12a54ddb9950df98139ea71ece9b3b32b?placeholderIfAbsent=true&apiKey=17f720a5f6cf49c2bf2c38812f1e2179",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s",
  },
];

function OpportunitiesSection() {
  return (
    <section className={styles.opportunitiesSection}>
      <h2 className={styles.sectionTitle}>Opportunities</h2>
      {opportunities.map((opportunity, index) => (
        <OpportunityCard key={index} {...opportunity} />
      ))}
    </section>
  );
}

export default OpportunitiesSection;
