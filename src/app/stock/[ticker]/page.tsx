"use client";

import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CompanyOverview } from "./components/CompanyOverview";
import { StockQuoteInfo } from "./components/StockQuoteInfo";
import { TechnicalAnalysis } from "./components/TechnicalAnalysis";
import Styles from "./page.module.scss";
import { StockData } from "./types";

export default function StockPage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    async function fetchStockData() {
      if (!ticker) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch static data
        const staticResponse = await fetch(
          `http://localhost:3000/stocks/${ticker}/static`,
          {
            next: { revalidate: 60 * 60 * 24 * 7 }, // 1 week
          }
        );

        if (!staticResponse.ok) {
          throw new Error(
            `Failed to fetch static data: ${staticResponse.status}`
          );
        }

        // Fetch dynamic data
        const dynamicResponse = await fetch(
          `http://localhost:3000/stocks/${ticker}/dynamic`,
          {
            next: { revalidate: 60 * 60 * 24 }, // 1 day
          }
        );

        if (!dynamicResponse.ok) {
          throw new Error(
            `Failed to fetch dynamic data: ${dynamicResponse.status}`
          );
        }

        const [staticData, dynamicData] = await Promise.all([
          staticResponse.json(),
          dynamicResponse.json(),
        ]);

        setStockData({
          static: staticData,
          dynamic: dynamicData,
        });
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
        <CompanyOverview company={stockData.static?.company} />
      </Box>
      {isMobile && (
        <Box className={Styles.section}>
          <StockQuoteInfo
            quote={stockData.dynamic?.quotes[0]}
            isLoading={isLoading}
          />
        </Box>
      )}

      <Box id="technical" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          Technical Analysis
        </Typography>
        <TechnicalAnalysis
          structuredAnalysis={stockData.dynamic?.structuredAnalysis}
          isLoading={isLoading}
        />
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
