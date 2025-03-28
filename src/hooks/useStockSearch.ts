import { useEffect, useState } from "react";

interface StockSearchResult {
  symbol: string;
  name: string;
}

export function useStockSearch(query: string) {
  const [data, setData] = useState<StockSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const searchStocks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/stocks/search?query=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const results = await response.json();
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchStocks();
  }, [query]);

  return { data, isLoading, error };
}
