import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { SalesProgress } from "@/hooks/useSalesProgress";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface USDTCollectionTrackerProps {
  data: SalesProgress;
}

const USDTCollectionTracker = ({ data }: USDTCollectionTrackerProps) => {
  const { totalUSDTRaised, isLoading } = data;
  const [displayAmount, setDisplayAmount] = useState(0);

  // Animated counter effect
  useEffect(() => {
    if (!isLoading) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = totalUSDTRaised / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalUSDTRaised) {
          setDisplayAmount(totalUSDTRaised);
          clearInterval(timer);
        } else {
          setDisplayAmount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [totalUSDTRaised, isLoading]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (isLoading) {
    return (
      <Card className="card-glow col-span-full">
        <CardContent className="pt-6">
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow col-span-full animate-scale-in bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="w-5 h-5 text-primary" />
          Total USDT Collected
        </CardTitle>
        <CardDescription>
          Real-time tracking from smart contract
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Main Amount Display */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <DollarSign className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <p className="text-5xl font-bold gradient-text tracking-tight">
                  {formatNumber(displayAmount)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  USDT Collected via Smart Contract
                </p>
              </div>
            </div>
          </div>

          {/* Visual Indicator */}
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-bold text-green-500">Active</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live on BSC
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default USDTCollectionTracker;
