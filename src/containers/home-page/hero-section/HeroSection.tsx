import React from "react";

import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          AI-Powered <span>Stock Analysis</span>
        </h1>
        <p className={styles.subtitle}>
          Gain deep insights into the stock market with AI-driven analytics.
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
    </section>
  );
}
