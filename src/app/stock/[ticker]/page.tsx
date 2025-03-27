import { Box, Typography } from "@mui/material";

import Styles from "./page.module.scss";

interface StockPageProps {
  params: {
    ticker: string;
  };
}

export default async function StockPage({ params }: StockPageProps) {
  const { ticker } = await params;

  console.log(ticker);
  return (
    <Box className={Styles.container}>
      <Typography variant="h4" component="h1" className={Styles.title}>
        {ticker.toUpperCase()} Stock Details
      </Typography>

      <Box id="overview" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          Overview
        </Typography>
      </Box>

      <Box id="technical" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          Technical Analysis
        </Typography>
      </Box>

      <Box id="history" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          Price History
        </Typography>
      </Box>

      <Box id="news" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          News
        </Typography>
      </Box>
    </Box>
  );
}
