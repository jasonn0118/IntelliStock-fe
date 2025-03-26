import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { breakpoints } from "@/styles/breakpoints";

interface SentimentBarProps {
  sentiment: string;
}

export const SentimentBar = ({ sentiment }: SentimentBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

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
        return "50%"; // default to middle for neutral
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
          overflow: "hidden",
          background:
            "linear-gradient(to right, #ff0000, #ff6b6b, #ffd700, #90ee90, #00ff00)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          height: "12px",
          mt: "2px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: getSentimentPosition(sentiment),
            top: 0,
            transform: "translate(-50%, 0)",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "8px solid #fff",
            filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))",
          }}
        />
      </Box>
    </Box>
  );
};
