import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FLD_PRICE_USD, MIN_PURCHASE_BNB, MAX_PURCHASE_BNB } from "@/lib/contracts";
import { Loader2 } from "lucide-react";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (bnbAmount: number) => Promise<boolean | void>;
  isLoading: boolean;
}

const PurchaseModal = ({ open, onOpenChange, onPurchase, isLoading }: PurchaseModalProps) => {
  const [bnbAmount, setBnbAmount] = useState("0.5");

  const calculateFLDAmount = (bnb: number) => {
    // Approximate BNB price in USD (could be fetched from API)
    const bnbPriceUSD = 600;
    const usdValue = bnb * bnbPriceUSD;
    return (usdValue / FLD_PRICE_USD).toFixed(2);
  };

  const handlePurchase = async () => {
    const amount = parseFloat(bnbAmount);
    if (isNaN(amount) || amount < MIN_PURCHASE_BNB || amount > MAX_PURCHASE_BNB) {
      return;
    }
    
    const success = await onPurchase(amount);
    if (success) {
      onOpenChange(false);
      setBnbAmount("0.5");
    }
  };

  const fldAmount = calculateFLDAmount(parseFloat(bnbAmount) || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy FLD Tokens</DialogTitle>
          <DialogDescription>
            Purchase FLD tokens using BNB on Binance Smart Chain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bnb-amount">Amount (BNB)</Label>
            <Input
              id="bnb-amount"
              type="number"
              step="0.1"
              min={MIN_PURCHASE_BNB}
              max={MAX_PURCHASE_BNB}
              value={bnbAmount}
              onChange={(e) => setBnbAmount(e.target.value)}
              placeholder="Enter BNB amount"
            />
            <p className="text-xs text-muted-foreground">
              Min: {MIN_PURCHASE_BNB} BNB • Max: {MAX_PURCHASE_BNB} BNB
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You will receive:</span>
              <span className="font-semibold">{fldAmount} FLD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per FLD:</span>
              <span className="font-semibold">${FLD_PRICE_USD}</span>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading || parseFloat(bnbAmount) < MIN_PURCHASE_BNB}
            className="w-full button-glow"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Purchase"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
