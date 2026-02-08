import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { truncateAddress } from "@/lib/fluidContract";
import { Shield, Loader2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const OwnershipCard = () => {
  const { owner, refetchAll } = useFluidContract();
  const { transferOwnership, renounceOwnership, actionLoading } = useAdminActions();
  
  const [newOwner, setNewOwner] = useState("");

  const isTransferring = actionLoading === "Transfer Ownership";
  const isRenouncing = actionLoading === "Renounce Ownership";

  const handleTransfer = async () => {
    if (!newOwner || !newOwner.startsWith("0x")) return;
    try {
      await transferOwnership(newOwner);
      setNewOwner("");
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleRenounce = async () => {
    try {
      await renounceOwnership();
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-destructive/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-destructive" />
          Ownership (Danger Zone)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Owner */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Current Owner</div>
          <div className="font-mono text-sm text-foreground break-all">
            {owner || "Loading..."}
          </div>
        </div>

        {/* Transfer Ownership */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Transfer Ownership</label>
          <div className="flex gap-2">
            <Input
              placeholder="New owner address (0x...)"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="flex-1 font-mono text-xs"
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isTransferring || !newOwner}
                >
                  {isTransferring ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Confirm Ownership Transfer
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>You are about to transfer contract ownership to:</p>
                    <p className="font-mono text-xs bg-muted p-2 rounded break-all">
                      {newOwner}
                    </p>
                    <p className="text-destructive">
                      This action cannot be undone. You will lose admin access.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleTransfer}>
                    Confirm Transfer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Renounce Ownership */}
        <div className="pt-4 border-t border-destructive/30">
          <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-xs text-destructive">
              <strong>Warning:</strong> Renouncing ownership is permanent and irreversible. 
              The contract will have no owner and admin functions will be permanently disabled.
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isRenouncing}
              >
                {isRenouncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Renounce Ownership"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Renounce Ownership Forever?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>This action is <strong>permanent and irreversible</strong>.</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>No one will be able to change token price</li>
                    <li>No one will be able to manage payment tokens</li>
                    <li>No one will be able to use emergency stop</li>
                    <li>No one will be able to claim vested tokens</li>
                  </ul>
                  <p className="text-destructive font-medium">
                    Are you absolutely sure?
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleRenounce}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Renounce Forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
