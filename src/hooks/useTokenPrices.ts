import { useState, useEffect } from "react";

interface TokenPriceData {
  price: number;
  change24h: number;
}

interface TokenPrices {
  [symbol: string]: TokenPriceData;
}

const COINGECKO_IDS: Record<string, string> = {
  ETH: "ethereum",
  BNB: "binancecoin",
  MATIC: "matic-network",
  POL: "matic-network",
  AVAX: "avalanche-2",
  OP: "optimism",
  ARB: "arbitrum",
  FTM: "fantom",
  CRO: "crypto-com-chain",
  CELO: "celo",
  GLMR: "moonbeam",
  XDAI: "xdai",
  ETH_AURORA: "ethereum",
  MNT: "mantle",
  USDT: "tether",
  USDC: "usd-coin",
  FLD: "fluid-network",
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
        .map(symbol => COINGECKO_IDS[symbol])
        .filter(Boolean)
        .join(',');
      
      if (!ids) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) throw new Error("Failed to fetch prices");
      
      const data = await response.json();
      
      const priceMap: TokenPrices = {};
      symbols.forEach(symbol => {
        const id = COINGECKO_IDS[symbol];
        if (id && data[id]) {
          priceMap[symbol] = {
            price: data[id].usd,
            change24h: data[id].usd_24h_change || 0,
          };
        }
      });
      
      setPrices(priceMap);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching token prices:", err);
      setError("Failed to fetch prices");
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
