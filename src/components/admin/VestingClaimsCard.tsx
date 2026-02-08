import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFluidContract, useVestedAmount } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { formatTokenAmount, truncateAddress } from "@/lib/fluidContract";
import { Calendar, Users, Building, Loader2, Clock } from "lucide-react";

export const VestingClaimsCard = () => {
  const { 
    teamPool, 
    foundPool, 
    teamClaimed, 
    foundationClaimed, 
    vestingStart,
    cliff,
    vestingDuration,
    teamWallet,
    foundationWallet,
    refetchAll 
  } = useFluidContract();
  const { claimTeam, claimFoundation, actionLoading } = useAdminActions();

  // Calculate vested amounts
  const { vestedAmount: teamVested } = useVestedAmount(teamPool, teamClaimed);
  const { vestedAmount: foundVested } = useVestedAmount(foundPool, foundationClaimed);

  const isClaimingTeam = actionLoading === "Claim Team Tokens";
  const isClaimingFoundation = actionLoading === "Claim Foundation Tokens";

  // Calculate vesting progress
  const now = BigInt(Math.floor(Date.now() / 1000));
  const vestingStartNum = vestingStart ? Number(vestingStart) : 0;
  const cliffNum = cliff ? Number(cliff) : 0;
  const durationNum = vestingDuration ? Number(vestingDuration) : 0;
  
  const cliffEndDate = vestingStartNum > 0 ? new Date((vestingStartNum + cliffNum) * 1000) : null;
  const vestingEndDate = vestingStartNum > 0 ? new Date((vestingStartNum + durationNum) * 1000) : null;
  const isCliffPassed = vestingStart && cliff ? now > vestingStart + cliff : false;

  const handleClaimTeam = async () => {
    try {
      await claimTeam();
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleClaimFoundation = async () => {
    try {
      await claimFoundation();
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  const teamClaimable = teamVested ? teamVested : BigInt(0);
  const foundClaimable = foundVested ? foundVested : BigInt(0);

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5 text-indigo-500" />
          Vesting Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Vesting Timeline */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Vesting Timeline</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-muted-foreground">Cliff End</div>
              <div className="font-medium text-foreground">
                {cliffEndDate ? cliffEndDate.toLocaleDateString() : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Vesting End</div>
              <div className="font-medium text-foreground">
                {vestingEndDate ? vestingEndDate.toLocaleDateString() : "N/A"}
              </div>
            </div>
          </div>
          {!isCliffPassed && (
            <div className="text-xs text-amber-500 mt-2">
              ⚠️ Cliff period not passed yet
            </div>
          )}
        </div>

        {/* Team Claim */}
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <span className="font-medium text-foreground">Team Tokens</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Total</div>
              <div className="font-medium">{formatTokenAmount(teamPool ?? BigInt(0))}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Claimed</div>
              <div className="font-medium">{formatTokenAmount(teamClaimed ?? BigInt(0))}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Claimable</div>
              <div className="font-medium text-green-500">{formatTokenAmount(teamClaimable)}</div>
            </div>
          </div>
          {teamWallet && (
            <div className="text-xs text-muted-foreground">
              Wallet: {truncateAddress(teamWallet)}
            </div>
          )}
          <Button
            onClick={handleClaimTeam}
            disabled={isClaimingTeam || teamClaimable <= BigInt(0)}
            className="w-full"
            size="sm"
          >
            {isClaimingTeam ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Claim Team Tokens"
            )}
          </Button>
        </div>

        {/* Foundation Claim */}
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-foreground">Foundation Tokens</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Total</div>
              <div className="font-medium">{formatTokenAmount(foundPool ?? BigInt(0))}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Claimed</div>
              <div className="font-medium">{formatTokenAmount(foundationClaimed ?? BigInt(0))}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Claimable</div>
              <div className="font-medium text-green-500">{formatTokenAmount(foundClaimable)}</div>
            </div>
          </div>
          {foundationWallet && (
            <div className="text-xs text-muted-foreground">
              Wallet: {truncateAddress(foundationWallet)}
            </div>
          )}
          <Button
            onClick={handleClaimFoundation}
            disabled={isClaimingFoundation || foundClaimable <= BigInt(0)}
            className="w-full"
            size="sm"
          >
            {isClaimingFoundation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Claim Foundation Tokens"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
