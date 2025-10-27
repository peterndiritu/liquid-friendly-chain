import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import TokenBalanceRow from "./TokenBalanceRow";
import { Skeleton } from "./ui/skeleton";

const TokenBalances = () => {
  const { balances, isLoading, refresh } = useTokenBalances();
  const { chainName } = useWalletStatus();

  return (
    <Card className="card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Token Balances</CardTitle>
            <CardDescription>Your balances on {chainName || 'Unknown Network'}</CardDescription>
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
        ) : balances.length > 0 ? (
          <div className="space-y-3">
            {balances
              .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance))
              .map(token => (
                <TokenBalanceRow
                  key={token.symbol}
                  symbol={token.symbol}
                  balance={token.balance}
                  type={token.type}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tokens found</p>
            <p className="text-xs mt-1">Connect your wallet to view balances</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenBalances;
