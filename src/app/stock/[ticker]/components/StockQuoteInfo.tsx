"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { observer } from "mobx-react-lite";

import stockStore from "@/lib/store/stockStore";
import { formatLargeNumber } from "@/utils/formatNumber";

import { Quote } from "../types";

// Use the Quote type from types.ts instead of redefining
export type QuoteData = Quote;

interface StockQuoteInfoProps {
  quote?: QuoteData;
  isLoading?: boolean;
}

export const StockQuoteInfo = observer(
  ({ quote: propQuote, isLoading: propIsLoading }: StockQuoteInfoProps) => {
    // Use props if provided, otherwise use store
    const quote = propQuote || stockStore.dynamicData?.quotes?.[0];
    const isLoading =
      propIsLoading !== undefined ? propIsLoading : stockStore.isLoading;

    const formatPercentage = (value: string) => {
      const num = parseFloat(value);
      return `${num > 0 ? "+" : ""}${num.toFixed(2)}%`;
    };

    const isPositiveChange = quote
      ? parseFloat(quote.changesPercentage) >= 0
      : false;
    const changeColor = isPositiveChange ? "#4caf50" : "#f44336";

    // Card styling
    const cardStyle = {
      bgcolor: "#242424",
      boxShadow: "none",
      mb: 2,
      borderRadius: "8px",
      height: "100%",
      border: "1px solid #333",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        bgcolor: "#2a2a2a",
        borderColor: "#444",
      },
    };

    const labelStyle = {
      color: "text.secondary",
      fontSize: "0.875rem",
      fontWeight: 500,
      mb: 0.5,
    };

    const valueStyle = {
      color: "#fff",
      fontSize: "1.1rem",
      fontWeight: 700,
      letterSpacing: "0.01em",
      wordBreak: "break-word",
    };

    if (isLoading) {
      return (
        <>
          <Card sx={{ ...cardStyle, mb: 3 }}>
            <CardContent>
              <Skeleton variant="text" height={40} width="70%" />
              <Skeleton variant="text" height={30} width="50%" />
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {[...Array(7)].map((_, index) => (
              <Grid size={{ xs: 12, sm: index === 6 ? 12 : 6 }} key={index}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={24} width="80%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      );
    }

    if (!quote) {
      return (
        <Card sx={{ ...cardStyle, mb: 3 }}>
          <CardContent>
            <Typography variant="body1" color="text.secondary" align="center">
              Quote information is not available
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        <Card sx={{ ...cardStyle, mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
              <Typography
                variant="h4"
                sx={{ color: "#fff", mr: 1, fontWeight: 700 }}
              >
                ${parseFloat(quote.price).toFixed(2)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: changeColor,
                  mb: 0.5,
                  fontWeight: 600,
                }}
              >
                {isPositiveChange ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                <Typography variant="body1">
                  {formatPercentage(quote.changesPercentage)} ($
                  {parseFloat(quote.change).toFixed(2)})
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Last updated: {new Date(quote.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          <Grid size={12}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>Day Range</Typography>
                <Typography sx={valueStyle}>
                  ${parseFloat(quote.dayLow).toFixed(2)} - $
                  {parseFloat(quote.dayHigh).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>Year Range</Typography>
                <Typography sx={valueStyle}>
                  ${parseFloat(quote.yearLow).toFixed(2)} - $
                  {parseFloat(quote.yearHigh).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>Volume</Typography>
                <Typography sx={valueStyle}>
                  {formatLargeNumber(quote.volume)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>Avg. Volume</Typography>
                <Typography sx={valueStyle}>
                  {formatLargeNumber(quote.avgVolume)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>50 Day Avg</Typography>
                <Typography sx={valueStyle}>
                  ${parseFloat(quote.priceAvg50).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>200 Day Avg</Typography>
                <Typography sx={valueStyle}>
                  ${parseFloat(quote.priceAvg200).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>P/E Ratio</Typography>
                <Typography sx={valueStyle}>
                  {quote.pe !== "0" ? parseFloat(quote.pe).toFixed(2) : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>EPS</Typography>
                <Typography sx={valueStyle}>
                  ${parseFloat(quote.eps).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography sx={labelStyle}>Market Cap</Typography>
                <Typography sx={valueStyle}>
                  ${formatLargeNumber(quote.marketCap)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {quote.statistic && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography sx={labelStyle}>Forward P/E</Typography>
                    <Typography sx={valueStyle}>
                      {quote.statistic.forwardPE !== "0"
                        ? parseFloat(quote.statistic.forwardPE).toFixed(2)
                        : "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography sx={labelStyle}>Price to Book</Typography>
                    <Typography sx={valueStyle}>
                      {parseFloat(quote.statistic.priceToBook).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={12}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography sx={labelStyle}>52 Week Change</Typography>
                    <Typography
                      sx={{
                        ...valueStyle,
                        color:
                          parseFloat(quote.statistic.weekChange52) >= 0
                            ? "#4caf50"
                            : "#f44336",
                      }}
                    >
                      {parseFloat(quote.statistic.weekChange52) > 0 ? "+" : ""}
                      {parseFloat(quote.statistic.weekChange52).toFixed(2)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
);
