import { useState, useEffect } from "react";

interface TokenPriceData {
  price: number;
  change24h: number;
}

interface TokenPrices {
  [symbol: string]: TokenPriceData;
}

const COINCAP_IDS: Record<string, string> = {
  // Native tokens
  ETH: "ethereum",
  BNB: "binance-coin",
  MATIC: "polygon",
  POL: "polygon",
  AVAX: "avalanche",
  FTM: "fantom",
  CRO: "crypto-com-coin",
  CELO: "celo",
  GLMR: "moonbeam",
  
  // Stablecoins
  USDT: "tether",
  USDC: "usd-coin",
  DAI: "dai",
  BUSD: "binance-usd",
  cUSD: "celo-dollar",
  
  // Wrapped & other tokens
  WBTC: "wrapped-bitcoin",
  WETH: "ethereum",
  WAVAX: "avalanche",
  CAKE: "pancakeswap-token",
  ARB: "arbitrum",
  OP: "optimism",
  
  // L2/Bridge tokens
  MNT: "mantle",
  XDAI: "xdai",
  ETH_AURORA: "ethereum",
  
  // Project token (uses fallback)
  FLD: "fluid",
  FLUID: "fluid",
};

const FALLBACK_PRICES: TokenPrices = {
  // Native tokens
  ETH: { price: 3500, change24h: 0 },
  BNB: { price: 645, change24h: 0 },
  POL: { price: 0.50, change24h: 0 },
  MATIC: { price: 0.50, change24h: 0 },
  AVAX: { price: 42, change24h: 0 },
  FTM: { price: 0.85, change24h: 0 },
  CRO: { price: 0.14, change24h: 0 },
  CELO: { price: 0.80, change24h: 0 },
  GLMR: { price: 0.35, change24h: 0 },
  
  // Stablecoins
  USDT: { price: 1.00, change24h: 0 },
  USDC: { price: 1.00, change24h: 0 },
  DAI: { price: 1.00, change24h: 0 },
  BUSD: { price: 1.00, change24h: 0 },
  cUSD: { price: 1.00, change24h: 0 },
  
  // Wrapped & other tokens
  WBTC: { price: 100000, change24h: 0 },
  WETH: { price: 3500, change24h: 0 },
  WAVAX: { price: 42, change24h: 0 },
  CAKE: { price: 2.80, change24h: 0 },
  ARB: { price: 0.95, change24h: 0 },
  OP: { price: 2.10, change24h: 0 },
  
  // L2/Bridge tokens
  MNT: { price: 0.72, change24h: 0 },
  XDAI: { price: 1.00, change24h: 0 },
  ETH_AURORA: { price: 3500, change24h: 0 },
  
  // Project token
  FLD: { price: 1.00, change24h: 0 },
  FLUID: { price: 1.00, change24h: 0 },
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

      // Get unique CoinCap IDs for the requested symbols
      const uniqueIds = [...new Set(
        symbols
          .map(symbol => COINCAP_IDS[symbol])
          .filter(Boolean)
      )];
      
      if (uniqueIds.length === 0) {
        // No valid IDs, use fallback prices
        const fallbackMap: TokenPrices = {};
        symbols.forEach(symbol => {
          if (FALLBACK_PRICES[symbol]) {
            fallbackMap[symbol] = FALLBACK_PRICES[symbol];
          }
        });
        setPrices(fallbackMap);
        setUsingFallback(true);
        setIsLoading(false);
        return;
      }

      const ids = uniqueIds.join(',');

      // Fetch real-time prices directly from CoinCap API
      const response = await fetch(`https://api.coincap.io/v2/assets?ids=${ids}`);
      
      if (!response.ok) throw new Error("Failed to fetch prices");
      
      const { data } = await response.json();
      
      // Map CoinCap data to our format
      const priceMap: TokenPrices = {};
      
      // Build a reverse lookup from CoinCap ID to price data
      const coinCapPrices: Record<string, { price: number; change24h: number }> = {};
      data.forEach((asset: any) => {
        coinCapPrices[asset.id] = {
          price: parseFloat(asset.priceUsd),
          change24h: parseFloat(asset.changePercent24Hr || '0'),
        };
      });
      
      // Map each symbol to its price
      symbols.forEach(symbol => {
        const coinCapId = COINCAP_IDS[symbol];
        if (coinCapId && coinCapPrices[coinCapId]) {
          priceMap[symbol] = coinCapPrices[coinCapId];
        } else if (FALLBACK_PRICES[symbol]) {
          priceMap[symbol] = FALLBACK_PRICES[symbol];
        }
      });
      
      setPrices(priceMap);
      setLastUpdated(new Date());
      setError(null);
      setUsingFallback(false);
      
      // Cache prices in localStorage
      localStorage.setItem('cached_prices', JSON.stringify({
        prices: priceMap,
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
      
      // Auto-refresh every 30 seconds
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
