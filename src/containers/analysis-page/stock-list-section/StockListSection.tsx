"use client";

import { observer } from "mobx-react-lite";

import marketStore from "@/lib/store/marketStore";

import StockList from "./StockList";
import Styles from "./StockListSection.module.scss";

const StockListSection = observer(() => {
  const { marketCapStocks, gainerStocks, isTopStocksLoading } = marketStore;

  // No useEffect here, data is fetched by the parent Analysis component

  if (isTopStocksLoading) return <p>Loading Top Stocks...</p>;

  return (
    <section className={Styles.stockListSection}>
      <div className={Styles.stockListsContainer}>
        <div className={Styles.stockListCard}>
          <StockList type="marketCap" stocks={marketCapStocks} />
        </div>
        <div className={Styles.stockListCard}>
          <StockList type="gainer" stocks={gainerStocks} />
        </div>
      </div>
    </section>
  );
});

export default StockListSection;
