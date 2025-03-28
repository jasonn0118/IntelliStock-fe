"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { Sidebar } from "./components/sidebar/sidebar";

import Styles from "./layout.module.scss";

interface StockLayoutProps {
  children: ReactNode;
}

export default function StockLayout({ children }: StockLayoutProps) {
  const params = useParams();
  const ticker = params.ticker as string;
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStockData() {
      if (!ticker) return;

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/stocks/${ticker}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch stock data: ${response.status}`);
        }

        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStockData();
  }, [ticker]);

  const quoteData = stockData?.quotes?.[0];

  return (
    <Box className={Styles.container}>
      <Box className={Styles.content}>{children}</Box>
      <Sidebar quoteData={quoteData} isLoading={isLoading} />
    </Box>
  );
}
