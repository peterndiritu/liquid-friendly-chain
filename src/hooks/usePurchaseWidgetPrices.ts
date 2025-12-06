import { useMemo } from "react";
import { useTokenPrices } from "./useTokenPrices";
import { Chain, Token } from "@/lib/tokenData";

export interface TokenWithPrice extends Token {
  livePrice: number;
  change24h: number;
}

export const usePurchaseWidgetPrices = (chain: Chain) => {
  // Extract unique symbols from chain tokens
  const symbols = useMemo(() => {
    return chain.tokens.map(t => t.symbol);
  }, [chain.id]);

  const { prices, isLoading, error, lastUpdated, refresh, usingFallback } = useTokenPrices(symbols);

  // Merge live prices with token data
  const tokensWithPrices: TokenWithPrice[] = useMemo(() => {
    return chain.tokens.map(token => ({
      ...token,
      livePrice: prices[token.symbol]?.price ?? token.price,
      change24h: prices[token.symbol]?.change24h ?? 0,
    }));
  }, [chain.tokens, prices]);

  return { 
    tokensWithPrices, 
    isLoading, 
    error, 
    lastUpdated, 
    refresh, 
    usingFallback 
  };
};
