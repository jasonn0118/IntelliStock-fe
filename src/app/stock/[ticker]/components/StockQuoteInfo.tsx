"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

interface QuoteData {
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
  volume: number;
  avgVolume: string;
  change: string;
  changesPercentage: string;
  marketCap: string;
  previousClose: string;
  earningsAnnouncement: string;
  sharesOutstanding: string;
  timestamp: string;
}

interface StockQuoteInfoProps {
  quote?: QuoteData;
  isLoading?: boolean;
}

export function StockQuoteInfo({
  quote,
  isLoading = false,
}: StockQuoteInfoProps) {
  const theme = useTheme();

  const formatNumber = (num: string | number) => {
    const value = Number(num);
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toLocaleString();
  };

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
            <Grid item xs={12} sm={index === 6 ? 12 : 6} key={index}>
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
            <Typography variant="h4" sx={{ color: "#fff", mr: 1 }}>
              ${parseFloat(quote.price).toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: changeColor,
                mb: 0.5,
              }}
            >
              {isPositiveChange ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
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
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Day Range
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                ${parseFloat(quote.dayLow).toFixed(2)} - $
                {parseFloat(quote.dayHigh).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Year Range
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                ${parseFloat(quote.yearLow).toFixed(2)} - $
                {parseFloat(quote.yearHigh).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Volume
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                }}
              >
                {formatNumber(quote.volume)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avg. Volume
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                }}
              >
                {formatNumber(quote.avgVolume)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                50 Day Avg
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                ${parseFloat(quote.priceAvg50).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                200 Day Avg
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                ${parseFloat(quote.priceAvg200).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Market Cap
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                ${formatNumber(quote.marketCap)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
