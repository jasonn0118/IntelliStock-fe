"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import { Sidebar } from "./components/sidebar/sidebar";
import Styles from "./layout.module.scss";

interface StockLayoutProps {
  children: ReactNode;
}

const StockLayout = observer(({ children }: StockLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className={Styles.container}>
      <Box className={Styles.content}>{children}</Box>

      {!isMobile && (
        <Box className={Styles.sidebarContainer}>
          <Sidebar />
        </Box>
      )}
    </Box>
  );
});

export default StockLayout;
