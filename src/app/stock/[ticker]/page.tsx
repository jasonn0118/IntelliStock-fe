"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CompanyOverview } from "./components/CompanyOverview";
import Styles from "./page.module.scss";

export default function StockPage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      if (!ticker) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3000/stocks/${ticker}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch stock data: ${response.status}`);
        }

        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStockData();
  }, [ticker]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stockData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>No data available for {ticker}</Typography>
      </Box>
    );
  }

  return (
    <Box className={Styles.container}>
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
