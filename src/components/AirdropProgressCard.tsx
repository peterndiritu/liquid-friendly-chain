import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift, Users, Package } from "lucide-react";
import { AirdropProgress } from "@/hooks/useAirdropProgress";
import { Skeleton } from "@/components/ui/skeleton";
import { FLD_PRICE_USD } from "@/lib/contracts";

interface AirdropProgressCardProps {
  data: AirdropProgress;
}

const AirdropProgressCard = ({ data }: AirdropProgressCardProps) => {
  const {
    totalAllocation,
    totalClaimed,
    remainingAllocation,
    progressPercentage,
    uniqueClaimers,
    isLoading,
  } = data;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  const estimatedValue = totalClaimed * FLD_PRICE_USD;

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
          <Gift className="w-5 h-5 text-blue-500" />
          Airdrop Distribution
        </CardTitle>
        <CardDescription>
          Community airdrop claim progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Claimed</span>
            <span className="font-bold text-blue-500">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 FLD</span>
            <span>{formatNumber(totalAllocation)} FLD</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Total Claimed */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex items-center gap-1 mb-1">
              <Package className="w-3 h-3 text-blue-500" />
              <p className="text-xs text-muted-foreground">Claimed</p>
            </div>
            <p className="text-lg font-bold text-blue-500">
              {formatNumber(totalClaimed)}
            </p>
            <p className="text-xs text-muted-foreground">FLD</p>
          </div>

          {/* Remaining */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center gap-1 mb-1">
              <Gift className="w-3 h-3 text-purple-500" />
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
            <p className="text-lg font-bold text-purple-500">
              {formatNumber(remainingAllocation)}
            </p>
            <p className="text-xs text-muted-foreground">FLD</p>
          </div>

          {/* Unique Claimers */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-3 h-3 text-green-500" />
              <p className="text-xs text-muted-foreground">Claimers</p>
            </div>
            <p className="text-lg font-bold text-green-500">
              {formatNumber(uniqueClaimers)}
            </p>
            <p className="text-xs text-muted-foreground">wallets</p>
          </div>
        </div>

        {/* Estimated Value */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Value Claimed</p>
              <p className="text-2xl font-bold gradient-text">
                ${formatNumber(estimatedValue)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Per Claim Avg</p>
              <p className="text-lg font-semibold text-primary">
                {uniqueClaimers > 0 ? formatNumber(totalClaimed / uniqueClaimers) : '0'} FLD
              </p>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="text-center text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Real-time blockchain data
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirdropProgressCard;
