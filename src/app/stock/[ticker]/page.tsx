"use client";

import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

import stockStore from "@/lib/store/stockStore";

import { CompanyOverview } from "./components/CompanyOverview";
import { StockQuoteInfo } from "./components/StockQuoteInfo";
import { TechnicalAnalysis } from "./components/TechnicalAnalysis";
import Styles from "./page.module.scss";

const StockPage = observer(() => {
  const { isLoading, error, isStaticDataLoading, isDynamicDataLoading } =
    stockStore;
  const params = useParams();
  const ticker = params.ticker as string;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dataFetchedRef = useRef(false);

  // Data fetching moved here from layout for consistency
  useEffect(() => {
    if (!dataFetchedRef.current) {
      console.log(`StockPage: Fetching data for ticker ${ticker}`);
      stockStore.reset();
      stockStore.fetchStockData(ticker);
      dataFetchedRef.current = true;
    }

    return () => {
      console.log(`StockPage: Cleanup for ticker ${ticker}`);
      dataFetchedRef.current = false;
      stockStore.reset();
    };
  }, [ticker]);

  if (isLoading && isStaticDataLoading) {
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

  return (
    <Box className={Styles.container}>
      <Box className={Styles.section}>
        <CompanyOverview isLoading={isStaticDataLoading} />
      </Box>
      {isMobile && (
        <Box className={Styles.section}>
          <StockQuoteInfo isLoading={isDynamicDataLoading} />
        </Box>
      )}

      <Box id="technical" className={Styles.section}>
        <Typography variant="h5" component="h2" className={Styles.sectionTitle}>
          Technical Analysis
        </Typography>
        <TechnicalAnalysis isLoading={isDynamicDataLoading} />
      </Box>
    </Box>
  );
});

export default StockPage;
