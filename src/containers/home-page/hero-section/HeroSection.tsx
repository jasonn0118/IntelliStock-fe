import { Button, Typography } from "@mui/material";
import Link from "next/link";

import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <Typography
          variant="h1"
          fontSize={{ xs: "2rem", sm: "2.5rem", md: "3rem" }}
          fontWeight="bold"
          className={styles.title}
          pb={{ xs: 1, sm: 2 }}
        >
          AI-Powered <span>Stock Analysis</span>
        </Typography>
        <Typography
          variant="h5"
          fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }}
          pb={{ xs: 1, sm: 2 }}
          className={styles.subtitle}
        >
          Gain deep insights into the stock market with AI-driven analytics.
        </Typography>
        <Button variant="contained">
          <Link href="/analysis">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
