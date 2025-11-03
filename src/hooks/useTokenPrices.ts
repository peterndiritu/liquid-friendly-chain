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

const FALLBACK_PRICES: TokenPrices = {
  POL: { price: 0.45, change24h: 0 },
  MATIC: { price: 0.45, change24h: 0 },
  ETH: { price: 2650, change24h: 0 },
  USDT: { price: 1.00, change24h: 0 },
  USDC: { price: 1.00, change24h: 0 },
  BNB: { price: 315, change24h: 0 },
  AVAX: { price: 28, change24h: 0 },
  OP: { price: 1.85, change24h: 0 },
  ARB: { price: 0.72, change24h: 0 },
  FTM: { price: 0.68, change24h: 0 },
  CRO: { price: 0.09, change24h: 0 },
  CELO: { price: 0.65, change24h: 0 },
  GLMR: { price: 0.22, change24h: 0 },
  XDAI: { price: 1.00, change24h: 0 },
  MNT: { price: 0.72, change24h: 0 },
  FLD: { price: 0.10, change24h: 0 },
  ETH_AURORA: { price: 2650, change24h: 0 },
};

export const useTokenPrices = (symbols: string[]) => {
  const [prices, setPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      
      if (symbols.length === 0) {
        setIsLoading(false);
        return;
      }

      // Use fallback prices directly - Edge function has network restrictions
      const fallbackMap: TokenPrices = {};
      symbols.forEach(symbol => {
        if (FALLBACK_PRICES[symbol]) {
          fallbackMap[symbol] = FALLBACK_PRICES[symbol];
        }
      });
      
      setPrices(fallbackMap);
      setLastUpdated(new Date());
      setError(null);
      setUsingFallback(true);
      
      // Cache prices in localStorage
      localStorage.setItem('cached_prices', JSON.stringify({
        prices: fallbackMap,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.error("Error fetching token prices:", err);
      
      // Try cache first
      const cached = localStorage.getItem('cached_prices');
      if (cached) {
        const { prices: cachedPrices, timestamp } = JSON.parse(cached);
        const cacheAge = Date.now() - timestamp;
        
        // Use cache if less than 1 hour old
        if (cacheAge < 3600000) {
          setPrices(cachedPrices);
          setError("Using cached prices");
          setUsingFallback(false);
          setIsLoading(false);
          return;
        }
      }
      
      // Fall back to static prices
      const fallbackMap: TokenPrices = {};
      symbols.forEach(symbol => {
        if (FALLBACK_PRICES[symbol]) {
          fallbackMap[symbol] = FALLBACK_PRICES[symbol];
        }
      });
      
      setPrices(fallbackMap);
      setError("Using estimated prices - live data unavailable");
      setUsingFallback(true);
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

  return { prices, isLoading, error, lastUpdated, refresh, usingFallback };
};
