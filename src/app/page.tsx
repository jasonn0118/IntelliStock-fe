import FeatureSection from "@/containers/home-page/feature-section/FeatureSection";
import HeroSection from "@/containers/home-page/hero-section/HeroSection";
import SloganSection from "@/containers/home-page/slogan-section/SloganSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <SloganSection />
        <FeatureSection />
      </main>
      <footer className={styles.footer}>
        <section>Footer</section>
      </footer>
    </div>
  );
}
