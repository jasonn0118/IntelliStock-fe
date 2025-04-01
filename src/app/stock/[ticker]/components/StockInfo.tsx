"use client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

import { breakpoints } from "@/styles/breakpoints";

// Assets
import Logo from "../../../../../public/logo/Logo.png";

interface StockInfoProps {
  data: {
    name: string;
    ticker: string;
    description: string;
    industry: string;
    sector: string;
    marketCap: number;
    employees: number;
    founded: string;
  };
}

export function StockInfo({ data }: StockInfoProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  return (
    <Paper sx={{ p: 3, bgcolor: "#1e1e1e" }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 2, md: 0 },
            }}
          >
            <Image
              src={Logo}
              alt={`${data.ticker} Logo`}
              width={isMobile ? 120 : 160}
              height={isMobile ? 120 : 160}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={9}>
          <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {data.industry} • {data.sector}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#ddd", mb: 3, lineHeight: 1.6 }}
          >
            {data.description}
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Market Cap
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                ${(data.marketCap / 1e9).toFixed(2)}B
              </Typography>
            </Grid>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Employees
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {(data.employees / 1000).toFixed(1)}K
              </Typography>
            </Grid>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Founded
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.founded}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
