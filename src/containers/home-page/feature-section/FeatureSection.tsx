import FeatureCard from "@/app/_components/cards/FeatureCard";
import Styles from "./FeatureSection.module.css";

export default function FeatureSection() {
  return (
    <section className={Styles.featureSection}>
      <h3>What features we are proudly provide</h3>
      <div className={Styles.cardWrapper}>
        <FeatureCard
          title="AI-Powered Stock Analysis"
          description="Leverage AI-driven insights to analyze stock trends, predict movements, and optimize investment decisions."
          link="analysis"
        />

        <FeatureCard
          title="Personalized Watchlist"
          description="Track your favorite stocks, set custom alerts, and get AI-based recommendations for smarter investments."
          link="watchlist"
        />

        <FeatureCard
          title="AI-Curated Financial News"
          description="Stay ahead with AI-powered financial news, sentiment analysis, and market-moving updates tailored for you."
          link="news"
        />

        <FeatureCard
          title="Secure User Dashboard"
          description="Manage your portfolio, customize settings, and securely access AI insights with a user-friendly dashboard."
          link="dashboard"
        />
      </div>
    </section>
  );
}
