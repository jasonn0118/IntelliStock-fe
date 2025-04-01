import { makeAutoObservable, runInAction } from "mobx";

import { StockDynamic, StockStatic } from "@/app/stock/[ticker]/types";

class StockStore {
  staticData: StockStatic | null = null;
  dynamicData: StockDynamic | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  currentTicker: string | null = null;
  fetchInProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStockData(ticker: string) {
    if (!ticker) return;

    if (this.fetchInProgress && this.currentTicker === ticker) {
      console.log(
        `Already fetching data for ${ticker}, skipping duplicate request`
      );
      return;
    }

    console.log(`Starting fetch for ticker: ${ticker}`);
    this.fetchInProgress = true;
    this.currentTicker = ticker;

    try {
      this.isLoading = true;
      this.error = null;

      console.log(`Fetching static data for ${ticker}`);
      const staticResponse = await fetch(
        `http://localhost:3000/stocks/${ticker}/static`,
        {
          next: { revalidate: 60 * 60 * 24 * 7 }, // 1 week
        }
      );
      if (!staticResponse.ok) {
        throw new Error(
          `Failed to fetch static data: ${staticResponse.status}`
        );
      }

      console.log(`Fetching dynamic data for ${ticker}`);
      const dynamicResponse = await fetch(
        `http://localhost:3000/stocks/${ticker}/dynamic`,
        {
          next: { revalidate: 60 * 60 * 24 }, // 1 day
        }
      );
      if (!dynamicResponse.ok) {
        throw new Error(
          `Failed to fetch dynamic data: ${dynamicResponse.status}`
        );
      }

      console.log(`Waiting for both responses for ${ticker}`);
      const [staticResult, dynamicResult] = await Promise.all([
        staticResponse.json(),
        dynamicResponse.json(),
      ]);

      runInAction(() => {
        console.log(`Updating store with data for ${ticker}`);
        this.staticData = staticResult;
        this.dynamicData = dynamicResult;
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
      runInAction(() => {
        this.error = "Failed to load stock data. Please try again later.";
      });
    } finally {
      runInAction(() => {
        console.log(`Fetch completed for ${ticker}`);
        this.isLoading = false;
        this.fetchInProgress = false;
      });
    }
  }

  reset() {
    console.log(`Resetting store, was loading data for: ${this.currentTicker}`);
    this.staticData = null;
    this.dynamicData = null;
    this.isLoading = true;
    this.error = null;
    this.currentTicker = null;
    this.fetchInProgress = false;
  }
}

const stockStore = new StockStore();
export default stockStore;
