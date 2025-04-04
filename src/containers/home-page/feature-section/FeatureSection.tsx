import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import FeatureCard from "@/containers/home-page/feature-section/FeatureCard";

import Styles from "./FeatureSection.module.scss";

export default function FeatureSection() {
  return (
    <section className={Styles.container}>
      <Typography
        variant="h4"
        fontSize={{ xs: "1rem", sm: "1.5rem", md: "2rem" }}
        className={Styles.title}
        pb={2}
      >
        What features we are proudly provide
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FeatureCard
            title="AI-Powered Stock Analysis"
            description="Leverage AI-driven insights to analyze stock trends, predict movements, and optimize investment decisions."
            link="analysis"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FeatureCard
            title="Personalized Watchlist"
            description="Track your favorite stocks, set custom alerts, and get AI-based recommendations for smarter investments."
            link="watchlist"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FeatureCard
            title="AI-Curated Financial News"
            description="Stay ahead with AI-powered financial news, sentiment analysis, and market-moving updates tailored for you."
            link="news"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FeatureCard
            title="Secure User Dashboard"
            description="Manage your portfolio, customize settings, and securely access AI insights with a user-friendly dashboard."
            link="dashboard"
          />
        </Grid>
      </Grid>
    </section>
  );
}
