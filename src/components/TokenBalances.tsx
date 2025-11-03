import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import TokenBalanceRow from "./TokenBalanceRow";
import { Skeleton } from "./ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const TokenBalances = () => {
  const { balances, isLoading, refresh } = useTokenBalances();
  const { chainName, chainId } = useWalletStatus();
  
  const symbols = balances.map(b => b.symbol);
  const { prices, isLoading: isPricesLoading, error, lastUpdated, refresh: refreshPrices, usingFallback } = useTokenPrices(symbols);
  
  const balancesWithUSD = balances.map(balance => ({
    ...balance,
    usdPrice: prices[balance.symbol]?.price,
    usdValue: prices[balance.symbol]?.price 
      ? parseFloat(balance.balance) * prices[balance.symbol].price
      : undefined,
    priceChange24h: prices[balance.symbol]?.change24h,
  }));
  
  const netBalance = balancesWithUSD.reduce((sum, token) => {
    return sum + (token.usdValue || 0);
  }, 0);

  return (
    <Card className="card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Token Balances
              {isPricesLoading && (
                <span className="text-xs text-primary flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Your balances on {chainName || 'Unknown Network'}
            </CardDescription>
            {lastUpdated && !isPricesLoading && (
              <p className="text-xs text-muted-foreground mt-1">
                Prices updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              </p>
            )}
            {usingFallback && (
              <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Showing estimated prices
                </p>
              </div>
            )}
            {!isPricesLoading && netBalance > 0 && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-muted-foreground">Net Balance</p>
                <p className="text-xl font-bold text-primary">
                  ${netBalance.toFixed(2)} USD
                </p>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={refresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {error && !usingFallback && (
          <div className="mt-3 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={refreshPrices}
              className="ml-auto"
            >
              Retry
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : balancesWithUSD.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tokens found</p>
            <p className="text-xs mt-1">Connect your wallet to view balances</p>
          </div>
        ) : (
          <div className="space-y-2">
            {balancesWithUSD
              .sort((a, b) => (b.usdValue || 0) - (a.usdValue || 0))
              .map((token) => (
                <TokenBalanceRow
                  key={token.symbol}
                  symbol={token.symbol}
                  balance={token.balance}
                  type={token.type}
                  address={token.address}
                  usdPrice={token.usdPrice}
                  usdValue={token.usdValue}
                  chainId={chainId}
                  priceChange24h={token.priceChange24h}
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenBalances;
