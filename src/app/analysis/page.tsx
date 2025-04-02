"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

import ExchangeAIAnalysis from "@/containers/analysis-page/exchange-ai-analysis-section/ExchangeAIAnalysis";
import StockListSection from "@/containers/analysis-page/stock-list-section/StockListSection";
import StockSearchSection from "@/containers/analysis-page/stock-search-section/StockSearchSection";
import marketStore from "@/lib/store/marketStore";

import Styles from "./page.module.css";

const Analysis = observer(() => {
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (!dataFetchedRef.current) {
      marketStore.fetchAllMarketData();
      dataFetchedRef.current = true;
    }

    return () => {
      dataFetchedRef.current = false;
      marketStore.reset();
    };
  }, []);

  return (
    <div>
      <main>
        <div className={Styles.page}>
          <StockListSection />
          <StockSearchSection />
          <ExchangeAIAnalysis />
        </div>
      </main>
    </div>
  );
});

export default Analysis;
