"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import { Sidebar } from "./components/sidebar/sidebar";
import { QuoteData } from "./components/StockQuoteInfo";
import Styles from "./layout.module.scss";

interface StockData {
  company?: {
    id: number;
    ticker: string;
    name: string;
    industry: string;
    sector: string;
    website: string;
    description: string;
    ceo: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    logoUrl: string;
  };
  quotes?: QuoteData[];
}

interface StockLayoutProps {
  children: ReactNode;
}

export default function StockLayout({ children }: StockLayoutProps) {
  const params = useParams();
  const ticker = params.ticker as string;
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

      {!isMobile && (
        <Box className={Styles.sidebarContainer}>
          <Sidebar quoteData={quoteData} isLoading={isLoading} />
        </Box>
      )}
    </Box>
  );
}
