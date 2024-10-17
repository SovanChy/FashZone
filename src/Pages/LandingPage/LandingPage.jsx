
import React from "react";
import styles from "./LandingPage.module.css";
import Header from "./Header";
import TrendingSection from "./TrendingSection";
import OpportunitiesSection from "./OpportunitiesSection";
import PortfolioSection from "./PortfolioSection";
import NewsSection from "./NewsSection";

function LandingPage() {
  return (
    <main className={styles.landingPage}>
      <Header />
      <TrendingSection />
      <OpportunitiesSection />
      <PortfolioSection />
      <NewsSection />
    </main>
  );
}

export default LandingPage;
