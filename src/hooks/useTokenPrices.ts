import { useState, useEffect } from "react";

interface TokenPrices {
  [symbol: string]: number;
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

  useEffect(() => {
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
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        
        if (!response.ok) throw new Error("Failed to fetch prices");
        
        const data = await response.json();
        
        const priceMap: TokenPrices = {};
        symbols.forEach(symbol => {
          const id = COINGECKO_IDS[symbol];
          if (id && data[id]) {
            priceMap[symbol] = data[id].usd;
          }
        });
        
        setPrices(priceMap);
        setError(null);
      } catch (err) {
        console.error("Error fetching token prices:", err);
        setError("Failed to fetch prices");
      } finally {
        setIsLoading(false);
      }
    };

    if (symbols.length > 0) {
      fetchPrices();
      
      const interval = setInterval(fetchPrices, 60000);
      
      return () => clearInterval(interval);
    } else {
      setIsLoading(false);
    }
  }, [symbols.join(',')]);

  return { prices, isLoading, error };
};
