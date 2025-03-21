"use client";

import { useEffect, useState } from "react";
import StockList from "./StockList";
import Styles from "./StockListSection.module.css";

interface StockItem {
  symbol: string;
  name: string;
  price: string;
  marketCap?: string;
  changesPercentage?: string;
}

export default function StockListSection() {
  const [marketCapStocks, setMarketCapStocks] = useState<StockItem[]>([]);
  const [gainerStocks, setGainerStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("http://localhost:3000/stocks/top-stocks");
        const data = await res.json();
        setMarketCapStocks(data.marketCap);
        setGainerStocks(data.gainers);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
  }, []);

  if (loading) return <p>Loading Top Stocks...</p>;

  return (
    <section className={Styles.stockListSection}>
      <div className={Styles.stockListsContainer}>
        <StockList type="marketCap" stocks={marketCapStocks}/>
        <StockList type="gainer" stocks={gainerStocks}/>
      </div>
    </section>
  );
}
