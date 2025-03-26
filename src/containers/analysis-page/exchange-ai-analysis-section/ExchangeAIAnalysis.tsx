"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Card,
  CardContent,
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

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  subtitle,
}: {
  title: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
  subtitle?: string | React.ReactNode;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  return (
    <Card className={Styles.statCard}>
      <CardContent>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
          >
            {value}
          </Typography>
          {change !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: isPositive ? "success.main" : "error.main",
                fontSize: isMobile ? "0.75rem" : "0.875rem",
              }}
            >
              {isPositive ? (
                <ArrowDropUpIcon
                  sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
                />
              ) : (
                <ArrowDropDownIcon
                  sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
                />
              )}
              {Math.abs(change).toFixed(2)}%
            </Box>
          )}
        </Box>
        {subtitle && (
          <Box sx={{ mt: 1 }}>
            {typeof subtitle === "string" ? (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: isMobile ? "0.7rem" : "0.75rem" }}
              >
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const SentimentBar = ({ sentiment }: { sentiment: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "very negative":
        return "#ff0000";
      case "negative":
        return "#ff6b6b";
      case "neutral":
        return "#ffd700";
      case "positive":
        return "#90ee90";
      case "very positive":
        return "#00ff00";
      default:
        return "#ffd700";
    }
  };

  const getSentimentPosition = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "very negative":
        return "0%";
      case "negative":
        return "25%";
      case "neutral":
        return "50%";
      case "positive":
        return "75%";
      case "very positive":
        return "100%";
      default:
        return "50%";
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#aaa",
            fontSize: isMobile ? "0.7rem" : "0.75rem",
          }}
        >
          Very Negative
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography
          variant="caption"
          sx={{
            color: "#aaa",
            fontSize: isMobile ? "0.7rem" : "0.75rem",
          }}
        >
          Very Positive
        </Typography>
      </Box>
      <Box
        sx={{
          height: "8px",
          borderRadius: "4px",
          backgroundColor: "#333",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: getSentimentPosition(sentiment),
            backgroundColor: getSentimentColor(sentiment),
            transition: "all 0.3s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: getSentimentPosition(sentiment),
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "0",
            height: "0",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "8px solid #fff",
            filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))",
          }}
        />
      </Box>
    </Box>
  );
};

export default function ExchangeAIAnalysis() {
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  useEffect(() => {
    const fetchMarketSummary = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/stocks/market-summary?date=2024-03-25"
        );
        const data = await response.json();
        setMarketSummary(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketSummary();
  }, []);

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
