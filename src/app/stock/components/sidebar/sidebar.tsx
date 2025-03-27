"use client";

import AssessmentIcon from "@mui/icons-material/Assessment";
import NewsIcon from "@mui/icons-material/Newspaper";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";

import { breakpoints } from "@/styles/breakpoints";

import Styles from "./sidebar.module.scss";

const menuItems = [
  { text: "Overview", icon: <TrendingUpIcon />, href: "#overview" },
  { text: "Technical Analysis", icon: <AssessmentIcon />, href: "#technical" },
  { text: "Price History", icon: <TimelineIcon />, href: "#history" },
  { text: "News", icon: <NewsIcon />, href: "#news" },
];

export const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));
  const params = useParams();
  const ticker = params.ticker as string;

  if (isMobile) {
    return null; // Hide sidebar on mobile
  }

  return (
    <Paper className={Styles.sidebar} elevation={0}>
      <Box className={Styles.header}>
        <Typography variant="h6" component="h2">
          {ticker.toUpperCase()}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
      <List className={Styles.menu}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              className={Styles.menuItem}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
