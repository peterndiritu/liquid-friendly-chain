import { useState, useEffect } from "react";

interface TokenPriceData {
  price: number;
  change24h: number;
}

interface TokenPrices {
  [symbol: string]: TokenPriceData;
}

const COINCAP_IDS: Record<string, string> = {
  ETH: "ethereum",
  BNB: "binance-coin",
  MATIC: "polygon",
  POL: "polygon",
  AVAX: "avalanche",
  OP: "optimism",
  ARB: "arbitrum",
  FTM: "fantom",
  CRO: "crypto-com-coin",
  CELO: "celo",
  GLMR: "moonbeam",
  XDAI: "xdai",
  ETH_AURORA: "ethereum",
  MNT: "mantle",
  USDT: "tether",
  USDC: "usd-coin",
  FLD: "fluid",
};

export const useTokenPrices = (symbols: string[]) => {
  const [prices, setPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      
      const ids = symbols
        .map(symbol => COINCAP_IDS[symbol])
        .filter(Boolean)
        .join(',');
      
      if (!ids) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.coincap.io/v2/assets?ids=${ids}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch prices");
      
      const { data } = await response.json();
      
      const priceMap: TokenPrices = {};
      symbols.forEach(symbol => {
        const id = COINCAP_IDS[symbol];
        const asset = data.find((a: any) => a.id === id);
        
        if (asset) {
          priceMap[symbol] = {
            price: parseFloat(asset.priceUsd),
            change24h: parseFloat(asset.changePercent24Hr) || 0,
          };
        }
      });
      
      setPrices(priceMap);
      setLastUpdated(new Date());
      setError(null);
      
      // Cache prices in localStorage
      localStorage.setItem('cached_prices', JSON.stringify({
        prices: priceMap,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.error("Error fetching token prices:", err);
      setError("Failed to fetch prices");
      
      // Try to load from cache
      const cached = localStorage.getItem('cached_prices');
      if (cached) {
        const { prices: cachedPrices } = JSON.parse(cached);
        setPrices(cachedPrices);
        setError("Using cached prices");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (symbols.length > 0) {
      fetchPrices();
      
      const interval = setInterval(fetchPrices, 30000);
      
      return () => clearInterval(interval);
    } else {
      setIsLoading(false);
    }
  }, [symbols.join(',')]);

  const refresh = () => {
    if (symbols.length > 0) {
      fetchPrices();
    }
  };

  return { prices, isLoading, error, lastUpdated, refresh };
};
