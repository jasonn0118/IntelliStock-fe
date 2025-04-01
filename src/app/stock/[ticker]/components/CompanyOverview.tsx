"use client";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useState } from "react";

import stockStore from "@/lib/store/stockStore";
import { breakpoints } from "@/styles/breakpoints";

import { Company } from "../types";

interface CompanyOverviewProps {
  company?: Company;
  isLoading?: boolean;
}

export const CompanyOverview = observer(
  ({
    company: propCompany,
    isLoading: propIsLoading,
  }: CompanyOverviewProps) => {
    // Use props if provided, otherwise use store
    const company = propCompany || stockStore.staticData?.company;
    const isLoading =
      propIsLoading !== undefined ? propIsLoading : stockStore.isLoading;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));
    const [expanded, setExpanded] = useState(false);

    if (isLoading) {
      return (
        <Paper sx={{ p: 3, bgcolor: "#1e1e1e" }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Skeleton variant="rectangular" width={160} height={160} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={24} width="40%" sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={i}>
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={24} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      );
    }

    if (!company) {
      return (
        <Paper sx={{ p: 3, bgcolor: "#1e1e1e" }}>
          <Typography variant="h6" color="text.secondary" align="center">
            Company information is not available
          </Typography>
        </Paper>
      );
    }

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <Paper sx={{ p: 3, bgcolor: "#1e1e1e" }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 2, md: 0 },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: isMobile ? 120 : 160,
                    height: isMobile ? 120 : 160,
                    bgcolor: "#333",
                    border: "2px solid #444",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {company.logoUrl ? (
                    <Image
                      src={company.logoUrl}
                      alt={`${company.ticker} logo`}
                      width={isMobile ? 120 : 160}
                      height={isMobile ? 120 : 160}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    company.ticker[0]
                  )}
                </Avatar>
                <Divider
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    bgcolor: "#444",
                    opacity: 0.5,
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 9 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{ color: "#fff", display: "inline" }}
              >
                {company.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#888", display: "inline", ml: 1 }}
              >
                ({company.ticker})
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {company.industry} • {company.sector}
            </Typography>

            <Box sx={{ position: "relative", mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#ddd",
                  lineHeight: 1.6,
                  ...(isMobile &&
                    !expanded && {
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }),
                }}
              >
                {company.description}
              </Typography>
              {isMobile && (
                <Button
                  variant="text"
                  size="small"
                  onClick={toggleExpand}
                  sx={{
                    mt: 1,
                    color: "#7986cb",
                    padding: 0,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {expanded ? "Show less" : "...more"}
                </Button>
              )}
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    p: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    CEO
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {company.ceo}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    p: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Employees
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {(parseInt(company.fullTimeEmployees) / 1000).toFixed(1)}K
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    p: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {company.city}, {company.state}, {company.country}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                    p: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Website
                  </Typography>
                  <Typography
                    variant="body1"
                    component="a"
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#7986cb",
                      textDecoration: "none",
                      wordBreak: "break-word",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {new URL(company.website).hostname}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
);
