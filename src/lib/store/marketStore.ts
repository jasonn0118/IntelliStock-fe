import { makeAutoObservable, runInAction } from "mobx";

interface MarketSummary {
  date: string;
  exchange: string;
  compositeIndex: {
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  stats: {
    totalMarketCap: number;
    marketCapChangePercent: number;
    averagePE: number;
    totalVolume: number;
    advancingStocks: number;
    decliningStocks: number;
    unchangedStocks: number;
    advanceDeclineRatio: number;
  };
  breadth: {
    sentiment: string;
    advancingCount: number;
    decliningCount: number;
    unchangedCount: number;
    advanceDeclineRatio: number;
  };
  timestamp: number;
  aiAnalysis?: {
    overallMarketSentiment: string;
    keyTechnicalIndicatorsAndMarketBreadth: string;
    volumeAnalysisAndTradingActivity: string;
    peRatioEvaluation: string;
    keyPointsToWatch: string;
    recommendations: string;
  };
}

interface StockItem {
  symbol: string;
  name: string;
  price: string;
  marketCap?: string;
  changesPercentage?: string;
  logoUrl?: string;
}

class MarketStore {
  // Market summary data
  marketSummary: MarketSummary | null = null;

  // Top stocks data
  marketCapStocks: StockItem[] = [];
  gainerStocks: StockItem[] = [];

  // Shared loading and error states
  isLoading: boolean = true;
  isTopStocksLoading: boolean = true;
  error: string | null = null;

  // Fetch status flags
  marketSummaryFetchInProgress: boolean = false;
  topStocksFetchInProgress: boolean = false;
  allMarketDataFetchInProgress: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMarketSummary(dateString?: string) {
    // Skip if already fetching
    if (this.marketSummaryFetchInProgress) {
      return;
    }

    try {
      this.marketSummaryFetchInProgress = true;
      this.isLoading = true;
      this.error = null;

      const dateParam = dateString
        ? new Date(dateString).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stocks/market-summary?date=${dateParam}`,
        {
          next: { revalidate: 60 * 60 }, // 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch market summary: ${response.status}`);
      }

      const data = await response.json();

      runInAction(() => {
        this.marketSummary = data;
      });
    } catch (error) {
      console.error("Error fetching market summary:", error);
      runInAction(() => {
        this.error = "Failed to load market summary. Please try again later.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.marketSummaryFetchInProgress = false;
      });
    }
  }

  async fetchTopStocks() {
    if (this.topStocksFetchInProgress) {
      console.log(
        "Top stocks fetch already in progress, skipping duplicate request"
      );
      return;
    }

    this.topStocksFetchInProgress = true;

    try {
      this.isTopStocksLoading = true;
      this.error = null;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stocks/top-stocks`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch top stocks: ${response.status}`);
      }

      const data = await response.json();

      runInAction(() => {
        this.marketCapStocks = data.marketCap;
        this.gainerStocks = data.gainers;
      });
    } catch (error) {
      console.error("Error fetching top stocks:", error);
      runInAction(() => {
        this.error = "Failed to load top stocks. Please try again later.";
      });
    } finally {
      runInAction(() => {
        this.isTopStocksLoading = false;
        this.topStocksFetchInProgress = false;
      });
    }
  }

  // Fetch all market data at once
  async fetchAllMarketData() {
    // Skip if already fetching all data
    if (this.allMarketDataFetchInProgress) {
      return;
    }

    this.allMarketDataFetchInProgress = true;

    // Use Promise.all to fetch both in parallel
    await Promise.all([this.fetchMarketSummary(), this.fetchTopStocks()]);

    this.allMarketDataFetchInProgress = false;
  }

  reset() {
    this.marketSummary = null;
    this.marketCapStocks = [];
    this.gainerStocks = [];
    this.isLoading = true;
    this.isTopStocksLoading = true;
    this.error = null;
    this.marketSummaryFetchInProgress = false;
    this.topStocksFetchInProgress = false;
    this.allMarketDataFetchInProgress = false;
  }
}

const marketStore = new MarketStore();
export default marketStore;
