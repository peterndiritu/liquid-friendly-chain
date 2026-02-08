import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { formatUsd6 } from "@/lib/fluidContract";
import { DollarSign, Loader2 } from "lucide-react";

export const PriceControlCard = () => {
  const { tokenPriceUsd6, refetchAll } = useFluidContract();
  const { setPrice, actionLoading } = useAdminActions();
  const [newPrice, setNewPrice] = useState("");

  const currentPrice = tokenPriceUsd6 ? formatUsd6(tokenPriceUsd6) : "0.000000";
  const isLoading = actionLoading === "Set Price";

  const handleSetPrice = async () => {
    if (!newPrice || isNaN(parseFloat(newPrice))) return;
    try {
      await setPrice(newPrice);
      setNewPrice("");
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="w-5 h-5 text-green-500" />
          Price Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Current Price</div>
          <div className="text-2xl font-bold text-foreground">${currentPrice}</div>
          <div className="text-xs text-muted-foreground mt-1">USD per FLD token</div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">New Price (USD)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.000001"
              min="0"
              placeholder="1.00"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSetPrice}
              disabled={isLoading || !newPrice}
              className="min-w-24"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
