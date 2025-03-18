"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#4caf50",
          dark: "#388e3c",
          contrastText: "#fff",
        },
      },
    },
  },
});

export default theme;
