import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import TokenBalanceRow from "./TokenBalanceRow";
import { Skeleton } from "./ui/skeleton";

const TokenBalances = () => {
  const { balances, isLoading, refresh } = useTokenBalances();
  const { chainName, chainId } = useWalletStatus();
  
  const symbols = balances.map(b => b.symbol);
  const { prices, isLoading: isPricesLoading } = useTokenPrices(symbols);
  
  const balancesWithUSD = balances.map(balance => ({
    ...balance,
    usdPrice: prices[balance.symbol],
    usdValue: prices[balance.symbol] 
      ? parseFloat(balance.balance) * prices[balance.symbol]
      : undefined,
  }));
  
  const netBalance = balancesWithUSD.reduce((sum, token) => {
    return sum + (token.usdValue || 0);
  }, 0);

  return (
    <Card className="card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle>Token Balances</CardTitle>
            <CardDescription>
              Your balances on {chainName || 'Unknown Network'}
            </CardDescription>
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
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenBalances;
