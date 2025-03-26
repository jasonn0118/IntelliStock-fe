import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

import { breakpoints } from "@/styles/breakpoints";

import Styles from "./ExchangeAIAnalysis.module.scss";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
  subtitle?: string | ReactNode;
}

export const StatCard = ({
  title,
  value,
  change,
  isPositive,
  subtitle,
}: StatCardProps) => {
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
