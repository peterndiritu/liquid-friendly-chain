import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenBalance } from "@/hooks/useTokenBalances";
import { formatDistanceToNow } from "date-fns";

interface PortfolioValueProps {
  balances: TokenBalance[];
  isLoading: boolean;
  lastUpdated?: Date | null;
  onRefresh?: () => void;
}

const PortfolioValue = ({ balances, isLoading, lastUpdated, onRefresh }: PortfolioValueProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const totalValue = balances.reduce((sum, token) => {
    return sum + (token.usdValue || 0);
  }, 0);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const topTokens = balances
    .filter(b => b.usdValue && b.usdValue > 0)
    .sort((a, b) => (b.usdValue || 0) - (a.usdValue || 0))
    .slice(0, 3);

  const tokenBreakdown = topTokens.map(token => ({
    symbol: token.symbol,
    value: token.usdValue || 0,
    percentage: totalValue > 0 ? ((token.usdValue || 0) / totalValue * 100) : 0,
  }));

  if (isLoading) {
    return (
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Total Portfolio Value
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-green-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">LIVE</span>
            </div>
            {onRefresh && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 w-8"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-1">
            Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-4xl font-bold text-primary mb-1">
              ${totalValue.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Across {balances.filter(b => parseFloat(b.balance) > 0).length} tokens
            </p>
          </div>

          {tokenBreakdown.length > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground mb-3">
                TOP HOLDINGS
              </p>
              {tokenBreakdown.map(token => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-medium text-sm">{token.symbol}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${token.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-3">
                    {token.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioValue;
