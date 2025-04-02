// Third-party imports
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

// Local imports
import { StockDynamic } from "@/app/stock/[ticker]/types";
import stockStore from "@/lib/store/stockStore";

interface TechnicalAnalysisProps {
  structuredAnalysis?: StockDynamic["structuredAnalysis"];
  isLoading?: boolean;
}

export const TechnicalAnalysis = observer(
  ({
    structuredAnalysis: propStructuredAnalysis,
    isLoading: propIsLoading,
  }: TechnicalAnalysisProps) => {
    // Use props if provided, otherwise use store
    const structuredAnalysis =
      propStructuredAnalysis || stockStore.dynamicData?.structuredAnalysis;
    const isLoading =
      propIsLoading !== undefined ? propIsLoading : stockStore.isLoading;

    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!structuredAnalysis) {
      return null;
    }

    const analysisSections = [
      {
        title: "Company Profile",
        content: structuredAnalysis.analysis.companyProfile,
      },
      {
        title: "Valuation",
        content: structuredAnalysis.analysis.valuation,
      },
      {
        title: "Performance",
        content: structuredAnalysis.analysis.performance,
      },
      {
        title: "Ownership",
        content: structuredAnalysis.analysis.ownership,
      },
      {
        title: "Short Interest",
        content: structuredAnalysis.analysis.shortInterest,
      },
      {
        title: "Strengths & Risks",
        content: structuredAnalysis.analysis.strengthsAndRisks,
      },
    ];

    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Summary Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Summary
              </Typography>
              <Typography variant="body1" paragraph>
                {structuredAnalysis.analysis.summary}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color:
                    structuredAnalysis.analysis.sentiment === "bullish"
                      ? "success.main"
                      : structuredAnalysis.analysis.sentiment === "bearish"
                      ? "error.main"
                      : "text.primary",
                }}
              >
                Market Sentiment:{" "}
                {structuredAnalysis.analysis.sentiment.charAt(0).toUpperCase() +
                  structuredAnalysis.analysis.sentiment.slice(1)}
              </Typography>
            </Paper>
          </Grid>

          {/* Analysis Sections */}
          {analysisSections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
);
