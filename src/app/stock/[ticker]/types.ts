export interface Company {
  id: number;
  ticker: string;
  name: string;
  industry: string;
  sector: string;
  website: string;
  description: string;
  ceo: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockStatic {
  id: string;
  ticker: string;
  name: string;
  exchange: string;
  company: Company;
}

export interface Quote {
  id: string;
  date: string;
  open: string;
  dayHigh: string;
  dayLow: string;
  yearLow: string;
  yearHigh: string;
  price: string;
  priceAvg50: string;
  priceAvg200: string;
  adjClose: string | null;
  volume: number;
  avgVolume: string;
  change: string;
  changesPercentage: string;
  eps: string;
  pe: string;
  marketCap: string;
  previousClose: string;
  earningsAnnouncement: string;
  sharesOutstanding: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  stock: {
    id: string;
    ticker: string;
    name: string;
    exchange: string;
    lastUpdated: string;
    companyId: number;
    createdAt: string;
    updatedAt: string;
  };
  statistic: {
    id: string;
    date: string;
    enterpriseValue: string;
    forwardPE: string;
    priceToBook: string;
    enterpriseToRevenue: string;
    enterpriseToEbitda: string;
    profitMargins: string;
    trailingEps: string;
    sharesOutstanding: string;
    floatShares: string;
    heldPercentInsiders: string;
    heldPercentInstitutions: string;
    sharesShort: string;
    shortRatio: string;
    shortPercentOfFloat: string;
    pegRatio: string | null;
    weekChange52: string;
    spWeekChange52: string;
    lastFiscalYearEnd: string;
    mostRecentQuarter: string;
    quoteId: string;
    stockId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StructuredAnalysis {
  ticker: string;
  analysis: {
    companyProfile: string;
    valuation: string;
    performance: string;
    ownership: string;
    shortInterest: string;
    strengthsAndRisks: string;
    summary: string;
    sentiment: string;
  };
}

export interface StockDynamic {
  quotes: Quote[];
  statistics: Quote["statistic"][];
  structuredAnalysis: StructuredAnalysis;
  lastUpdated: string;
}

export interface StockData {
  static?: StockStatic;
  dynamic?: StockDynamic;
}
