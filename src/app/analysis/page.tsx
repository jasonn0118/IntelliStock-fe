import StockListSection from "@/containers/analysis-page/stock-list-section/StockListSection";
import StockSearchSection from "@/containers/analysis-page/stock-search-section/StockSearchSection";
import Styles from "./page.module.css";

export default function Analysis() {
  return (
    <div>
      <main>
        <div className={Styles.page}>
          <StockListSection />
          <StockSearchSection />
          <div>AI generated analysis section</div>
        </div>
      </main>
    </div>
  );
}
