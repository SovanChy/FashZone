
import React from "react";
import styles from "./PricingPlans.module.css";
import PlanCard from "./PlanCard";

const PricingPlans = () => {
  const plans = [
    {
      title: "Free",
      features: ["Browsing", "Post Picture"],
      buttonText: "Get Plan",
    },
    {
      title: "Premium",
      features: [
        "Browsing",
        "Post Picture",
        "Unlimited Portfolio Posting",
        "Unlimited Article Posting",
        "Conduct Events",
      ],
      price: "24.90$/Month",
      buttonText: "Get Plan",
    },
    {
      title: "Standard",
      features: [
        "Browsing",
        "Post Picture",
        "Limited Portfolio Posting",
        "Limited Article Posting",
      ],
      price: "14.90$/Month",
      buttonText: "Get Plan",
    },
  ];

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>Choose Your pRemium!</h1>
        <div className={styles.planContainer}>
          <div className={styles.planGrid}>
            {plans.map((plan, index) => (
              <div key={index} className={styles.planColumn}>
                <PlanCard {...plan} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
