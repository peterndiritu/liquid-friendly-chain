import { ReactNode } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { useFluidContract } from "@/hooks/useFluidContract";
import { DEPLOYER_ADDRESS } from "@/lib/fluidContract";
import { ShieldX, Loader2, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminAccessGuardProps {
  children: ReactNode;
}

export const AdminAccessGuard = ({ children }: AdminAccessGuardProps) => {
  const account = useActiveAccount();
  const { owner, isLoading } = useFluidContract();

  // Not connected
  if (!account) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-border">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Wallet className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Connect Your Wallet</h2>
              <p className="text-muted-foreground text-sm">
                You need to connect your wallet to access the admin dashboard.
              </p>
            </div>
            <ConnectButton
              client={client}
              connectModal={{ size: "compact" }}
              theme="dark"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading owner from contract
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-border">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying admin access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is owner (on-chain) or deployer (hardcoded fallback)
  const isOwner = owner?.toLowerCase() === account.address.toLowerCase();
  const isDeployer = account.address.toLowerCase() === DEPLOYER_ADDRESS.toLowerCase();
  const hasAccess = isOwner || isDeployer;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/50">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldX className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Access Denied</h2>
              <p className="text-muted-foreground text-sm">
                Only the contract owner can access the admin dashboard.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
              <div className="text-xs text-muted-foreground">Connected Wallet</div>
              <div className="font-mono text-xs text-foreground break-all">{account.address}</div>
            </div>
            {owner && (
              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <div className="text-xs text-muted-foreground">Contract Owner</div>
                <div className="font-mono text-xs text-foreground break-all">{owner}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Access granted
  return <>{children}</>;
};
