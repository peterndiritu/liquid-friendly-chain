import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Target } from "lucide-react";
import { SalesProgress } from "@/hooks/useSalesProgress";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesProgressCardProps {
  data: SalesProgress;
}

const SalesProgressCard = ({ data }: SalesProgressCardProps) => {
  const {
    totalUSDTRaised,
    totalFLDSold,
    hardCap,
    softCap,
    progressPercentage,
    isActive,
    isLoading,
  } = data;

  const softCapReached = totalUSDTRaised >= softCap;
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getProgressColor = () => {
    if (progressPercentage >= 70) return "text-green-500";
    if (progressPercentage >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return (
      <Card className="card-glow">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Presale Progress
          {isActive && (
            <span className="ml-auto text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
              LIVE
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Track the FLD token presale in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className={`font-bold ${getProgressColor()}`}>
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>${formatNumber(hardCap)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* USDT Raised */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">USDT Raised</p>
            </div>
            <p className="text-2xl font-bold text-blue-500">
              ${formatNumber(totalUSDTRaised)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              of ${formatNumber(hardCap)}
            </p>
          </div>

          {/* FLD Sold */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-muted-foreground">FLD Sold</p>
            </div>
            <p className="text-2xl font-bold text-purple-500">
              {formatNumber(totalFLDSold)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              tokens sold
            </p>
          </div>
        </div>

        {/* Soft Cap Indicator */}
        <div className={`p-3 rounded-lg border ${
          softCapReached 
            ? 'bg-green-500/10 border-green-500/20' 
            : 'bg-yellow-500/10 border-yellow-500/20'
        }`}>
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${softCapReached ? 'text-green-500' : 'text-yellow-500'}`} />
            <div className="flex-1">
              <p className="text-sm font-medium">
                Soft Cap {softCapReached ? 'Reached!' : 'Target'}
              </p>
              <p className="text-xs text-muted-foreground">
                ${formatNumber(softCap)} USDT {softCapReached ? '✓' : `(${((totalUSDTRaised / softCap) * 100).toFixed(0)}%)`}
              </p>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="text-center text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Updates every 30 seconds
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesProgressCard;
