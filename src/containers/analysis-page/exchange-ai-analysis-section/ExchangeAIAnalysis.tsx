"use client";

import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

import { breakpoints } from "@/styles/breakpoints";
import { formatLargeNumber } from "@/utils/formatNumber";
import { SentimentBar } from "./SentimentBar";
import { StatCard } from "./StatCard";

import Styles from "./ExchangeAIAnalysis.module.scss";

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

const mockAIInsight = {
  overallMarketSentiment:
    "The overall market sentiment on March 25, 2025, is notably mixed, as reflected by the NASDAQ Composite Index's modest gain of 0.46%. Despite this positive movement, the broader market indicators suggest a lack of strong upward momentum. The advance/decline ratio of 0.49 indicates more stocks are declining than advancing, suggesting underlying bearish sentiment. The neutral market sentiment reflects a state of caution, with investors possibly awaiting clearer economic signals or earnings results to drive decisive action.",
  keyTechnicalIndicatorsAndMarketBreadth:
    "The technical indicators suggest a lack of strong bullish momentum despite the index's gain. With 853 declining stocks overshadowing the 415 advancing ones, the market breadth highlights a predominantly bearish undertone. The advance/decline ratio of 0.49 further underscores this imbalance, suggesting that the gains in the Composite Index are driven by a concentrated few rather than a broad-based rally. This divergence between index performance and market breadth could indicate potential volatility or impending consolidation.",
  volumeAnalysisAndTradingActivity:
    "The trading volume of 5,855,819,000 shares indicates healthy market participation; however, it does not necessarily reflect bullish enthusiasm. The substantial volume, combined with the prevailing number of declining stocks, suggests that there may be significant selling pressure or profit-taking occurring. This level of activity might also imply that institutional investors are adjusting their positions in response to broader economic indicators or sector-specific news. Traders should watch for volume spikes in individual stocks, as these could signal shifts in market sentiment.",
  peRatioEvaluation:
    "The average P/E ratio stands at an unusually low 0.57, which may indicate that the market is undervaluing earnings relative to historical norms. Such a low P/E could be a sign of investor skepticism about future earnings growth or broader economic concerns. This atypical valuation metric suggests that investors might be pricing in potential risks or downturns, and it warrants close attention to upcoming earnings reports and economic forecasts to gauge whether this sentiment is justified.",
  keyPointsToWatch:
    "In the next trading session, investors should monitor the performance of key technological and growth sectors, as these have historically driven NASDAQ's gains. Additionally, any changes in the advance/decline ratio could signal shifts in market sentiment or momentum. Keeping an eye on economic data releases and corporate earnings announcements will be crucial, as these could provide the catalysts needed to confirm or negate current market trends. The movement in market leaders and heavily weighted stocks in the index should also be observed closely.",
  recommendations:
    "Given the current market conditions, it would be prudent for investors to adopt a cautious approach. Diversification remains key, as the mixed sentiment suggests potential volatility. Investors should consider maintaining positions in defensive sectors while selectively adding exposure to technology and growth stocks that have strong fundamentals. It is also advisable to keep an eye on macroeconomic indicators and fiscal policy developments, as these could heavily influence market dynamics. For traders, employing strategies that capitalize on short-term volatility might be beneficial while maintaining a focus on risk management.",
};

export default function ExchangeAIAnalysis() {
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  useEffect(() => {
    const fetchMarketSummary = async () => {
      setAiLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/stocks/market-summary?date=2024-03-25"
        );
        const data = await response.json();
        setMarketSummary(data);
        setLoading(false);
        setAiLoading(false);
      } catch (error) {
        console.error("Error fetching market summary:", error);
      } finally {
        setLoading(false);
        setAiLoading(false);
      }
    };

    fetchMarketSummary();
  }, []);

  useEffect(() => {
    const simulateAIInsight = async () => {
      if (!marketSummary) return;

      setAiLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMarketSummary((prev) =>
        prev ? { ...prev, aiAnalysis: mockAIInsight } : null
      );
    };

    simulateAIInsight();
  }, [marketSummary]);

  if (loading) {
    return <Typography>Loading market summary...</Typography>;
  }

  if (!marketSummary) {
    return <Typography>No market summary data available</Typography>;
  }

  return (
    <section className={Styles.container}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontSize: isMobile ? "1.1rem" : "1.25rem",
          color: "#f5f5f5",
        }}
      >
        Market Summary
      </Typography>

      <Grid container spacing={2}>
        {/* Composite Index Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Composite Index"
            value={marketSummary.compositeIndex.price.toFixed(2)}
            change={marketSummary.compositeIndex.changePercent}
            isPositive={marketSummary.compositeIndex.changePercent > 0}
            subtitle={`Volume: ${formatLargeNumber(
              marketSummary.compositeIndex.volume
            )}`}
          />
        </Grid>

        {/* Market Cap Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Market Cap"
            value={formatLargeNumber(marketSummary.stats.totalMarketCap)}
            change={marketSummary.stats.marketCapChangePercent}
            isPositive={marketSummary.stats.marketCapChangePercent > 0}
            subtitle={`Avg P/E: ${marketSummary.stats.averagePE.toFixed(2)}`}
          />
        </Grid>

        {/* Market Breadth Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Market Breadth"
            value={`${marketSummary.breadth.advanceDeclineRatio.toFixed(2)}`}
            subtitle={`Advancing: ${marketSummary.breadth.advancingCount} | Declining: ${marketSummary.breadth.decliningCount}`}
          />
        </Grid>

        {/* Volume Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Volume"
            value={formatLargeNumber(marketSummary.stats.totalVolume)}
            subtitle={`${
              marketSummary.stats.advancingStocks +
              marketSummary.stats.decliningStocks +
              marketSummary.stats.unchangedStocks
            } Stocks Traded`}
          />
        </Grid>

        {/* Sentiment Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Market Sentiment"
            value={
              marketSummary.breadth.sentiment.charAt(0).toUpperCase() +
              marketSummary.breadth.sentiment.slice(1)
            }
            subtitle={
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: isMobile ? "0.7rem" : "0.75rem",
                  }}
                >
                  {`${marketSummary.breadth.advancingCount} Advancing, ${marketSummary.breadth.decliningCount} Declining`}
                </Typography>
                <SentimentBar sentiment={marketSummary.breadth.sentiment} />
              </Box>
            }
          />
        </Grid>

        {/* Exchange Info Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Exchange"
            value={marketSummary.exchange}
            subtitle={`Last Updated: ${new Date(
              marketSummary.timestamp * 1000
            ).toLocaleString()}`}
          />
        </Grid>
      </Grid>

      {/* AI Insight Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: isMobile ? "1.1rem" : "1.25rem",
            color: "#f5f5f5",
          }}
        >
          AI Market Analysis
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : marketSummary?.aiAnalysis ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "#121212",
              border: "1px solid #333",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#f5f5f5",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              {marketSummary.aiAnalysis.overallMarketSentiment}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                Technical Analysis & Market Breadth:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#f5f5f5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  mb: 2,
                }}
              >
                {
                  marketSummary.aiAnalysis
                    .keyTechnicalIndicatorsAndMarketBreadth
                }
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                Volume Analysis:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#f5f5f5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  mb: 2,
                }}
              >
                {marketSummary.aiAnalysis.volumeAnalysisAndTradingActivity}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                P/E Ratio Analysis:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#f5f5f5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  mb: 2,
                }}
              >
                {marketSummary.aiAnalysis.peRatioEvaluation}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                Key Points to Watch:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#f5f5f5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  mb: 2,
                }}
              >
                {marketSummary.aiAnalysis.keyPointsToWatch}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                Recommendations:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#f5f5f5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                {marketSummary.aiAnalysis.recommendations}
              </Typography>
            </Box>
          </Paper>
        ) : (
          <Typography color="error">
            Unable to generate AI insights at this time.
          </Typography>
        )}
      </Box>
    </section>
  );
}
