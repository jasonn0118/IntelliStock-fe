"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

import { Sidebar } from "../components/sidebar/sidebar";

import Styles from "./layout.module.scss";

interface StockLayoutProps {
  children: ReactNode;
}

export default function StockLayout({ children }: StockLayoutProps) {
  return (
    <Box className={Styles.container}>
      <Box className={Styles.content}>{children}</Box>
      <Sidebar />
    </Box>
  );
}
