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
import { observer } from "mobx-react-lite";

import marketStore from "@/lib/store/marketStore";
import { breakpoints } from "@/styles/breakpoints";
import { formatLargeNumber } from "@/utils/formatNumber";

import Styles from "./ExchangeAIAnalysis.module.scss";
import { SentimentBar } from "./SentimentBar";
import { StatCard } from "./StatCard";

const ExchangeAIAnalysis = observer(() => {
  const { marketSummary, isLoading } = marketStore;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  // No useEffect here, data is fetched by the parent Analysis component

  if (isLoading) {
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
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Market Cap"
            value={formatLargeNumber(marketSummary.stats.totalMarketCap)}
            change={marketSummary.stats.marketCapChangePercent}
            isPositive={marketSummary.stats.marketCapChangePercent > 0}
            subtitle={`Avg P/E: ${marketSummary.stats.averagePE.toFixed(2)}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Market Breadth"
            value={`${marketSummary.breadth.advanceDeclineRatio.toFixed(2)}`}
            subtitle={`Advancing: ${marketSummary.breadth.advancingCount} | Declining: ${marketSummary.breadth.decliningCount}`}
          />
        </Grid>
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

        {isLoading ? (
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
                Volume Analysis & Trading Activity:
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
                P/E Ratio Evaluation:
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
                color: "#f5f5f5",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              AI analysis is not available for today&apos;s market data yet.
            </Typography>
          </Paper>
        )}
      </Box>
    </section>
  );
});

export default ExchangeAIAnalysis;
