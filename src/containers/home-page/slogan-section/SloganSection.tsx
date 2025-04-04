import { Typography } from "@mui/material";
import styles from "./SloganSection.module.scss";

export default function SloganSection() {
  return (
    <section>
      <Typography
        fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
        className={styles.slogan}
        pt={2}
      >
        Smarter Investing with AI-Driven Market Insights.
      </Typography>
    </section>
  );
}
