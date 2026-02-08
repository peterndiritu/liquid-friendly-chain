import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { formatTokenAmount, truncateAddress } from "@/lib/fluidContract";
import { Droplets, Lock, Unlock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const LiquidityCard = () => {
  const { liqPool, liquidityClaimed, liquidityUnlocked, refetchAll } = useFluidContract();
  const { unlockLiquidity, claimLiquidity, actionLoading } = useAdminActions();
  
  const [claimAddress, setClaimAddress] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  const isUnlocked = liquidityUnlocked === true;
  const isUnlocking = actionLoading === "Unlock Liquidity";
  const isClaiming = actionLoading === "Claim Liquidity";

  const available = liqPool && liquidityClaimed 
    ? liqPool - liquidityClaimed 
    : BigInt(0);

  const handleUnlock = async () => {
    try {
      await unlockLiquidity();
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleClaim = async () => {
    if (!claimAddress || !claimAmount) return;
    try {
      await claimLiquidity(claimAddress, claimAmount);
      setClaimAddress("");
      setClaimAmount("");
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Droplets className="w-5 h-5 text-blue-500" />
          Liquidity Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Pool</div>
            <div className="font-semibold text-foreground">{formatTokenAmount(liqPool ?? BigInt(0))}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Claimed</div>
            <div className="font-semibold text-foreground">{formatTokenAmount(liquidityClaimed ?? BigInt(0))}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Available</div>
            <div className="font-semibold text-green-500">{formatTokenAmount(available)}</div>
          </div>
        </div>

        {/* Lock Status */}
        <div className={cn(
          "rounded-lg p-3 flex items-center justify-between",
          isUnlocked ? "bg-green-500/10" : "bg-amber-500/10"
        )}>
          <div className="flex items-center gap-2">
            {isUnlocked ? (
              <Unlock className="w-5 h-5 text-green-500" />
            ) : (
              <Lock className="w-5 h-5 text-amber-500" />
            )}
            <span className={cn(
              "font-medium",
              isUnlocked ? "text-green-500" : "text-amber-500"
            )}>
              {isUnlocked ? "Liquidity Unlocked" : "Liquidity Locked"}
            </span>
          </div>
          {!isUnlocked && (
            <Button
              size="sm"
              onClick={handleUnlock}
              disabled={isUnlocking}
            >
              {isUnlocking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Unlock"
              )}
            </Button>
          )}
        </div>

        {/* Claim Form */}
        {isUnlocked && (
          <div className="space-y-3 pt-2 border-t border-border">
            <label className="text-sm text-muted-foreground">Claim Liquidity</label>
            <Input
              placeholder="Recipient address (0x...)"
              value={claimAddress}
              onChange={(e) => setClaimAddress(e.target.value)}
              className="font-mono text-xs"
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount (FLD)"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleClaim}
                disabled={isClaiming || !claimAddress || !claimAmount}
              >
                {isClaiming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Claim"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
