"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { mediaQueries } from "@/styles/breakpoints";

import styles from "./StockSearchSection.module.scss";

interface Stock {
  symbol: string;
  name: string;
  price?: number;
  changesPercentage?: number;
}

const StockSearchSection = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Stock[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const isMobile = useMediaQuery(mediaQueries.sm);
  const router = useRouter();

  useEffect(() => {
    if (inputValue === "") {
      setOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const searchStocks = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/stocks/search?query=${encodeURIComponent(inputValue)}`
        );
        const data = await response.json();
        setOptions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error searching stocks:", error);
        setLoading(false);
        setOptions([]);
      }
    };

    const debounceTimer = setTimeout(searchStocks, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          fontSize: { xs: "1.1rem", sm: "1.2rem" },
          mb: 1,
          fontWeight: 500,
          color: "#f5f5f5",
        }}
        variant="h6"
      >
        Any stock in your mind?
      </Typography>
      <div className={styles.searchContainer}>
        <Autocomplete
          clearOnEscape
          handleHomeEndKeys
          id="stock-search-autocomplete"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={selectedStock}
          onChange={(event, newValue) => {
            // TODO: Redirect to stock detail page
            if (newValue) {
              // Redirect to stock detail page
              router.push(`/stock/${newValue.symbol}`);
            } else {
              setSelectedStock(null);
            }
          }}
          options={options}
          getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
          loading={loading}
          noOptionsText="No stocks found"
          filterOptions={(x) => x}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for a stock..."
              variant="outlined"
              fullWidth
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.symbol}
              style={{ backgroundColor: "#121212", color: "#f5f5f5" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  width: "100%",
                  borderBottom: "1px solid #222",
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                  },
                }}
              >
                {isMobile ? (
                  <>
                    <div className={styles.optionSymbol}>{option.symbol}</div>
                    <div className={styles.optionRight}>
                      {option.price && (
                        <div className={styles.optionPrice}>
                          ${option.price}
                        </div>
                      )}
                      {option.changesPercentage && (
                        <div
                          className={`${styles.optionChange} ${
                            option.changesPercentage >= 0
                              ? styles.positive
                              : styles.negative
                          }`}
                        >
                          {option.changesPercentage >= 0 ? (
                            <ArrowDropUpIcon className={styles.changeIcon} />
                          ) : (
                            <ArrowDropDownIcon className={styles.changeIcon} />
                          )}
                          {Math.abs(option.changesPercentage).toFixed(2)}%
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.optionLeft}>
                      <div className={styles.optionSymbol}>{option.symbol}</div>
                      <div className={styles.optionName}>{option.name}</div>
                    </div>
                    <div className={styles.optionRight}>
                      {option.price && (
                        <div className={styles.optionPrice}>
                          ${option.price}
                        </div>
                      )}
                      {option.changesPercentage && (
                        <div
                          className={`${styles.optionChange} ${
                            option.changesPercentage >= 0
                              ? styles.positive
                              : styles.negative
                          }`}
                        >
                          {option.changesPercentage >= 0 ? (
                            <ArrowDropUpIcon className={styles.changeIcon} />
                          ) : (
                            <ArrowDropDownIcon className={styles.changeIcon} />
                          )}
                          {Math.abs(option.changesPercentage).toFixed(2)}%
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Box>
            </li>
          )}
        />
      </div>
    </div>
  );
};

export default StockSearchSection;
