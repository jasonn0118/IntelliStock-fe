import { makeAutoObservable, runInAction } from "mobx";

import { StockDynamic, StockStatic } from "@/app/stock/[ticker]/types";

class StockStore {
  staticData: StockStatic | null = null;
  dynamicData: StockDynamic | null = null;
  isLoading: boolean = true;
  isStaticDataLoading: boolean = true;
  isDynamicDataLoading: boolean = true;
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
      this.isStaticDataLoading = true;
      this.isDynamicDataLoading = true;
      this.error = null;

      // Create promises for both requests
      console.log(`Fetching static data for ${ticker}`);
      const staticPromise = fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stocks/${ticker}/static`,
        {
          next: { revalidate: 60 * 60 * 24 * 7 }, // 1 week
        }
      );

      console.log(`Fetching dynamic data for ${ticker}`);
      const dynamicPromise = fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stocks/${ticker}/dynamic`,
        {
          next: { revalidate: 60 * 60 * 24 }, // 1 day
        }
      );

      // Handle static data as soon as it comes in
      const staticResponse = await staticPromise;
      if (!staticResponse.ok) {
        throw new Error(
          `Failed to fetch static data: ${staticResponse.status}`
        );
      }

      const staticResult = await staticResponse.json();
      runInAction(() => {
        console.log(`Updating store with static data for ${ticker}`);
        this.staticData = staticResult;
        this.isStaticDataLoading = false;
      });

      // Continue waiting for dynamic data
      const dynamicResponse = await dynamicPromise;
      if (!dynamicResponse.ok) {
        throw new Error(
          `Failed to fetch dynamic data: ${dynamicResponse.status}`
        );
      }

      const dynamicResult = await dynamicResponse.json();
      runInAction(() => {
        console.log(`Updating store with dynamic data for ${ticker}`);
        this.dynamicData = dynamicResult;
        this.isDynamicDataLoading = false;
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
      runInAction(() => {
        this.error = "Failed to load stock data. Please try again later.";
      });
    } finally {
      runInAction(() => {
        console.log(`Fetch completed for ${ticker}`);
        this.isLoading = this.isStaticDataLoading || this.isDynamicDataLoading;
        this.fetchInProgress = false;
      });
    }
  }

  reset() {
    console.log(`Resetting store, was loading data for: ${this.currentTicker}`);
    this.staticData = null;
    this.dynamicData = null;
    this.isLoading = true;
    this.isStaticDataLoading = true;
    this.isDynamicDataLoading = true;
    this.error = null;
    this.currentTicker = null;
    this.fetchInProgress = false;
  }
}

const stockStore = new StockStore();
export default stockStore;
