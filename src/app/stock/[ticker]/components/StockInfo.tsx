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
import { Company } from "../types";

interface StockInfoProps {
  data: Company;
  marketCap?: string;
}

export function StockInfo({ data, marketCap }: StockInfoProps) {
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
              src={data.logoUrl || Logo}
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
                {marketCap && parseFloat(marketCap) > 0
                  ? `$${(parseFloat(marketCap) / 1e9).toFixed(2)}B`
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Employees
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {parseInt(data.fullTimeEmployees || "0") > 0
                  ? parseInt(data.fullTimeEmployees || "0") > 1000
                    ? `${(parseInt(data.fullTimeEmployees) / 1000).toFixed(1)}K`
                    : data.fullTimeEmployees
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                CEO
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.ceo || "N/A"}
              </Typography>
            </Grid>
            <Grid xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Country
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.country || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
