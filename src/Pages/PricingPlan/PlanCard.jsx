
import React from "react";
import styles from "./PricingPlans.module.css";

const PlanCard = ({ title, features, price, buttonText }) => {
  return (
    <div className={styles.planCard}>
      <h2 className={styles.planTitle}>{title}</h2>
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/14e8bc34d6341559ac9325bfa712699451b73ec646693b31b2c768820a1f5759?placeholderIfAbsent=true&apiKey=4c9afea5c10940a19f40b930532a4cdd"
              alt=""
              className={styles.featureIcon}
            />
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
      {price && <p className={styles.planPrice}>{price}</p>}
      <button className={styles.getPlanButton}>{buttonText}</button>
    </div>
  );
};

export default PlanCard;
