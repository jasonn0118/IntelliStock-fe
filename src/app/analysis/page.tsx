import StockListSection from "@/containers/analysis-page/stock-list-section/StockListSection";
import Styles from "./page.module.css";

export default function Analysis() {
  return (
    <div>
      <main>
        <div className={Styles.page}>
          <StockListSection />
          <div>Search section</div>
          <div>AI generated analysis section</div>
        </div>
      </main>
    </div>
  );
}
