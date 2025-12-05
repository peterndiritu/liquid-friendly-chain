import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2, Gift } from "lucide-react";

interface AirdropClaimDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim: () => Promise<boolean | void>;
  isLoading: boolean;
  isEligible: boolean;
  isClaimed: boolean;
  claimableAmount: string;
}

const AirdropClaimDialog = ({
  open,
  onOpenChange,
  onClaim,
  isLoading,
  isEligible,
  isClaimed,
  claimableAmount,
}: AirdropClaimDialogProps) => {
  const handleClaim = async () => {
    const success = await onClaim();
    if (success) {
      // Keep dialog open to show success message
      setTimeout(() => {
        onOpenChange(false);
      }, 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Claim FLUID Airdrop
          </DialogTitle>
          <DialogDescription>
            Check your eligibility and claim your FLUID tokens
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isClaimed ? (
            <Alert className="border-primary/50">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription>
                You have already claimed your airdrop of {claimableAmount} FLUID tokens!
              </AlertDescription>
            </Alert>
          ) : isEligible ? (
            <>
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-6 text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold gradient-text">{claimableAmount} FLD</h3>
                <p className="text-sm text-muted-foreground">Available to claim</p>
              </div>

              <Button
                onClick={handleClaim}
                disabled={isLoading}
                className="w-full button-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  "Claim Now"
                )}
              </Button>
            </>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Your wallet is not eligible for the airdrop. Make sure you're connected with the correct wallet.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-xs text-center text-muted-foreground">
            Airdrop tokens will be sent directly to your connected wallet
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AirdropClaimDialog;
