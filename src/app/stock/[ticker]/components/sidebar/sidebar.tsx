"use client";

import { Box, Paper } from "@mui/material";
import { useRef } from "react";

import { QuoteData, StockQuoteInfo } from "../StockQuoteInfo";
import Styles from "./sidebar.module.scss";

interface SidebarProps {
  quoteData?: QuoteData;
  isLoading?: boolean;
}

export const Sidebar = ({ quoteData, isLoading = false }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <Paper className={Styles.sidebar} elevation={0} ref={sidebarRef}>
      <Box p={3} pt={6}>
        <StockQuoteInfo quote={quoteData} isLoading={isLoading} />
      </Box>
    </Paper>
  );
};
