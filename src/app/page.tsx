import FeatureSection from "@/containers/home-page/feature-section/FeatureSection";
import HeroSection from "@/containers/home-page/hero-section/HeroSection";
import SloganSection from "@/containers/home-page/slogan-section/SloganSection";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <main className={styles.main}>
        <SloganSection />
        <FeatureSection />
      </main>
    </div>
  );
}
