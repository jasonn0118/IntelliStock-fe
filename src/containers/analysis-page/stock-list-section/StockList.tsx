"use client";

import { formatLargeNumber } from "@/utils/formatNumber";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Styles from "./StockList.module.css";

export type StockListType = "marketCap" | "gainer";

interface StockItem {
  symbol: string;
  name: string;
  price: string;
  marketCap?: string;
  changesPercentage?: string;
}

interface StockListProps {
  type: StockListType;
  stocks: StockItem[];
}

const StockItem = (type: StockListType, stock: StockItem) => {
  return (
    <ListItem
      key={stock.symbol}
      divider
      sx={{
        height: "56px",
        "&:hover": { bgcolor: "action.hover", cursor: "pointer" },
      }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="add"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Added ${stock.symbol} to watchlist`);
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      }
      onClick={() => console.log(`Redirect to ${stock.symbol} details`)}
    >
      <ListItemAvatar>
        <Avatar>{stock.symbol[0]}</Avatar>
      </ListItemAvatar>
      <div className={Styles.stockContent}>
        <ListItemText primary={stock.symbol} />
        <ListItemText
          primary={`$${Number(stock.price).toFixed(2)}`}
          secondary="Price"
        />

        {type === "marketCap" ? (
          <ListItemText
            primary={formatLargeNumber(Number(stock.marketCap))}
            secondary="Market Cap"
          />
        ) : null}

        <ListItemIcon>
          {Number(stock.changesPercentage) > 0 ? (
            <ArrowDropUpIcon color="success" />
          ) : (
            <ArrowDropDownIcon color="error" />
          )}
          <ListItemText
            primary={`${Number(stock.changesPercentage).toFixed(2)}%`}
          />
        </ListItemIcon>
      </div>
    </ListItem>
  );
};

export default function StockList({ type, stocks }: StockListProps) {
  return (
    <List
      dense={true}
      sx={{
        border: "1px solid #020202",
        borderRadius: "8px",
        bgcolor: "#020202",
      }}
      subheader={
        <ListSubheader
          sx={{ bgcolor: "transparent", borderBottom: "1px solid" }}
        >
          {type === "marketCap" ? "Top 10 Market Cap" : "Top 10 Gainers"}
        </ListSubheader>
      }
    >
      {stocks.map((stock) => StockItem(type, stock))}
    </List>
  );
}
