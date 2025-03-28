import { Box, Typography } from "@mui/material";

import { CompanyOverview } from "./components/CompanyOverview";
import Styles from "./page.module.scss";

interface StockPageProps {
  params: {
    ticker: string;
  };
}

async function getStockData(ticker: string) {
  try {
    console.log(`Fetching data for ticker: ${ticker}`);
    const response = await fetch(`http://localhost:3000/stocks/${ticker}`, {
      next: { revalidate: 300 },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch stock data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully");
    return data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}

export default async function StockPage({ params }: StockPageProps) {
  const { ticker } = await params;
  const stockData = await getStockData(ticker);

  return (
    <Box className={Styles.container}>
      <Typography variant="h4" component="h1" className={Styles.title}>
        {ticker.toUpperCase()} Stock Details
      </Typography>

      <Box className={Styles.section}>
        <CompanyOverview company={stockData.company} />
      </Box>

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
