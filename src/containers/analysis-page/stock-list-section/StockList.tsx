"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { breakpoints, mediaQueries } from "@/styles/breakpoints";
import { formatLargeNumber } from "@/utils/formatNumber";

import Styles from "./StockList.module.scss";

export type StockListType = "marketCap" | "gainer";

interface StockItem {
  symbol: string;
  name: string;
  price: string;
  marketCap?: string;
  changesPercentage?: string;
  logoUrl?: string;
}

interface StockListProps {
  type: StockListType;
  stocks: StockItem[];
}

const StockItemComponent = observer(
  ({
    type,
    stock,
    isMobile,
    isMediumScreen,
    isSmallMediumScreen,
    isIPadAirSize,
  }: {
    type: StockListType;
    stock: StockItem;
    isMobile: boolean;
    isMediumScreen: boolean;
    isSmallMediumScreen: boolean;
    isIPadAirSize: boolean;
  }) => {
    const router = useRouter();
    const contentStyle = isIPadAirSize
      ? {
          gap: "0.15rem",
          flexWrap: "nowrap" as const,
        }
      : isMobile
      ? {
          gap: "0.25rem",
          flexWrap: "nowrap" as const,
          justifyContent: "space-between",
        }
      : {};

    const textContainerStyle = isIPadAirSize
      ? {
          minWidth: "50px",
          maxWidth: "80px",
        }
      : isMobile
      ? {
          minWidth: "auto",
          maxWidth: "auto",
        }
      : {};

    const changeIconStyle = isIPadAirSize
      ? {
          minWidth: "50px",
          flexDirection: "column" as const,
          alignItems: "flex-end" as const,
          justifyContent: "center" as const,
          marginLeft: 0,
        }
      : isMobile
      ? {
          minWidth: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }
      : {};

    return (
      <ListItem
        key={stock.symbol}
        divider
        sx={{
          height: isMobile
            ? "auto"
            : isIPadAirSize
            ? "70px"
            : isSmallMediumScreen
            ? "65px"
            : "56px",
          minHeight: isMobile ? "48px" : "auto",
          padding: isMobile
            ? "8px 12px"
            : isIPadAirSize
            ? "8px 12px"
            : "8px 16px",
          "&:hover": { bgcolor: "action.hover", cursor: "pointer" },
          position: "relative",
        }}
        onClick={() => router.push(`/stock/${stock.symbol}`)}
      >
        <ListItemAvatar
          sx={{ minWidth: isMobile || isIPadAirSize ? "40px" : "56px" }}
        >
          <Avatar
            sx={{
              width: isMobile ? "30px" : isIPadAirSize ? "28px" : "40px",
              height: isMobile ? "30px" : isIPadAirSize ? "28px" : "40px",
              bgcolor: "#333",
              border: "1px solid #444",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {stock.logoUrl ? (
              <Image
                src={stock.logoUrl}
                alt={`${stock.symbol} logo`}
                width={isMobile ? 30 : isIPadAirSize ? 28 : 40}
                height={isMobile ? 30 : isIPadAirSize ? 28 : 40}
                style={{ objectFit: "contain" }}
              />
            ) : (
              stock.symbol[0]
            )}
          </Avatar>
        </ListItemAvatar>
        <div className={Styles.stockContent} style={contentStyle}>
          <div className={Styles.stockItemText} style={textContainerStyle}>
            <ListItemText
              primary={stock.symbol}
              slotProps={{
                primary: {
                  style: {
                    fontSize: isMobile
                      ? "0.85rem"
                      : isIPadAirSize
                      ? "0.75rem"
                      : isSmallMediumScreen
                      ? "0.8rem"
                      : isMediumScreen
                      ? "0.9rem"
                      : undefined,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
              }}
            />
          </div>

          <div
            className={`${Styles.stockItemText} ${Styles.stockPrice}`}
            style={textContainerStyle}
          >
            <ListItemText
              primary={`$${Number(stock.price).toFixed(2)}`}
              secondary="Price"
              slotProps={{
                primary: {
                  style: {
                    fontSize: isMobile
                      ? "0.85rem"
                      : isIPadAirSize
                      ? "0.75rem"
                      : isSmallMediumScreen
                      ? "0.8rem"
                      : isMediumScreen
                      ? "0.9rem"
                      : undefined,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
                secondary: {
                  style: {
                    fontSize: isMobile
                      ? "0.75rem"
                      : isIPadAirSize
                      ? "0.65rem"
                      : isSmallMediumScreen
                      ? "0.7rem"
                      : isMediumScreen
                      ? "0.8rem"
                      : undefined,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
              }}
            />
          </div>

          {type === "marketCap" && (
            <div
              className={`${Styles.stockItemText} ${Styles.stockMarketCap}`}
              style={textContainerStyle}
            >
              <ListItemText
                primary={formatLargeNumber(Number(stock.marketCap))}
                secondary="Market Cap"
                slotProps={{
                  primary: {
                    style: {
                      fontSize: isMobile
                        ? "0.85rem"
                        : isIPadAirSize
                        ? "0.75rem"
                        : isSmallMediumScreen
                        ? "0.8rem"
                        : isMediumScreen
                        ? "0.9rem"
                        : undefined,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                  secondary: {
                    style: {
                      fontSize: isMobile
                        ? "0.75rem"
                        : isIPadAirSize
                        ? "0.65rem"
                        : isSmallMediumScreen
                        ? "0.7rem"
                        : isMediumScreen
                        ? "0.8rem"
                        : undefined,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                }}
              />
            </div>
          )}

          {(type === "gainer" || (type === "marketCap" && !isMobile)) &&
            stock.changesPercentage && (
              <div className={Styles.stockChangeIcon} style={changeIconStyle}>
                {Number(stock.changesPercentage) > 0 ? (
                  <ArrowDropUpIcon
                    color="success"
                    sx={{
                      fontSize: isMobile
                        ? "1.2rem"
                        : isIPadAirSize
                        ? "1.1rem"
                        : isSmallMediumScreen
                        ? "1.2rem"
                        : isMediumScreen
                        ? "1.3rem"
                        : "1.5rem",
                      marginRight:
                        isIPadAirSize || isSmallMediumScreen || isMediumScreen
                          ? 0
                          : "2px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    color="error"
                    sx={{
                      fontSize: isMobile
                        ? "1.2rem"
                        : isIPadAirSize
                        ? "1.1rem"
                        : isSmallMediumScreen
                        ? "1.2rem"
                        : isMediumScreen
                        ? "1.3rem"
                        : "1.5rem",
                      marginRight:
                        isIPadAirSize || isSmallMediumScreen || isMediumScreen
                          ? 0
                          : "2px",
                    }}
                  />
                )}
                <ListItemText
                  primary={`${Number(stock.changesPercentage).toFixed(2)}%`}
                  slotProps={{
                    primary: {
                      style: {
                        fontSize: isMobile
                          ? "0.85rem"
                          : isIPadAirSize
                          ? "0.7rem"
                          : isSmallMediumScreen
                          ? "0.75rem"
                          : isMediumScreen
                          ? "0.9rem"
                          : undefined,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        margin:
                          isIPadAirSize || isSmallMediumScreen || isMediumScreen
                            ? "0"
                            : undefined,
                        lineHeight:
                          isIPadAirSize || isSmallMediumScreen
                            ? "1"
                            : undefined,
                      },
                    },
                  }}
                />
              </div>
            )}
        </div>
        <div className={Styles.addButtonContainer}>
          <IconButton
            edge="end"
            aria-label="add"
            size={isMobile || isIPadAirSize ? "small" : "medium"}
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Added ${stock.symbol} to watchlist`);
            }}
          >
            <AddCircleOutlineIcon
              fontSize={isMobile || isIPadAirSize ? "small" : "medium"}
            />
          </IconButton>
        </div>
      </ListItem>
    );
  }
);

const StockList = observer(({ type, stocks }: StockListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));
  const isMediumScreen = useMediaQuery(mediaQueries.medium);
  const isSmallMediumScreen = useMediaQuery(mediaQueries.smallMedium);
  const isIPadAirSize = useMediaQuery(mediaQueries.ipadAir);
  const [showAll, setShowAll] = useState(false);

  const displayedStocks = isMobile && !showAll ? stocks.slice(0, 5) : stocks;

  return (
    <List
      dense={true}
      sx={{
        width: "100%",
        border: "1px solid #020202",
        borderRadius: "8px",
        bgcolor: "#020202",
        marginBottom: isMobile ? "1rem" : 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      subheader={
        <ListSubheader
          sx={{
            bgcolor: "transparent",
            borderBottom: "1px solid",
            padding: isMobile ? "8px 16px" : "8px 16px",
            fontSize: isMobile ? "0.95rem" : "inherit",
            color: "#f5f5f5",
          }}
        >
          {type === "marketCap" ? "Top 10 Market Cap" : "Top 10 Gainers"}
        </ListSubheader>
      }
    >
      {displayedStocks.map((stock) => (
        <StockItemComponent
          key={stock.symbol}
          type={type}
          stock={stock}
          isMobile={isMobile}
          isMediumScreen={isMediumScreen}
          isSmallMediumScreen={isSmallMediumScreen}
          isIPadAirSize={isIPadAirSize}
        />
      ))}

      {isMobile && stocks.length > 5 && (
        <ListItem
          sx={{
            justifyContent: "center",
            padding: "8px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Button
            size="small"
            onClick={() => setShowAll(!showAll)}
            variant="outlined"
            sx={{
              fontSize: "0.8rem",
              textTransform: "none",
              width: "100%",
              maxWidth: "200px",
            }}
          >
            {showAll ? "View Less" : "View More"}
          </Button>
        </ListItem>
      )}
    </List>
  );
});

export default StockList;
