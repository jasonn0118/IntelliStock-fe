"use client";

import { Box, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRef } from "react";

import stockStore from "@/lib/store/stockStore";

import { StockQuoteInfo } from "../StockQuoteInfo";
import Styles from "./sidebar.module.scss";

export const Sidebar = observer(() => {
  const { dynamicData, isDynamicDataLoading } = stockStore;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const quoteData = dynamicData?.quotes?.[0];

  return (
    <Paper className={Styles.sidebar} elevation={0} ref={sidebarRef}>
      <Box p={3} pt={6}>
        <StockQuoteInfo quote={quoteData} isLoading={isDynamicDataLoading} />
      </Box>
    </Paper>
  );
});
