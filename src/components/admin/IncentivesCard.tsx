import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFluidContract } from "@/hooks/useFluidContract";
import { useAdminActions } from "@/hooks/useAdminActions";
import { formatTokenAmount } from "@/lib/fluidContract";
import { Gift, Loader2, Send } from "lucide-react";

export const IncentivesCard = () => {
  const { incPool, incentivesUsed, refetchAll } = useFluidContract();
  const { sendIncentive, actionLoading } = useAdminActions();
  
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const isSending = actionLoading === "Send Incentive";
  const available = incPool && incentivesUsed 
    ? incPool - incentivesUsed 
    : BigInt(0);

  const handleSend = async () => {
    if (!recipientAddress || !amount) return;
    try {
      await sendIncentive(recipientAddress, amount);
      setRecipientAddress("");
      setAmount("");
      setTimeout(refetchAll, 2000);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className="w-5 h-5 text-cyan-500" />
          Incentives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Pool</div>
            <div className="font-semibold text-foreground">{formatTokenAmount(incPool ?? BigInt(0))}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Used</div>
            <div className="font-semibold text-foreground">{formatTokenAmount(incentivesUsed ?? BigInt(0))}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">Available</div>
            <div className="font-semibold text-green-500">{formatTokenAmount(available)}</div>
          </div>
        </div>

        {/* Send Form */}
        <div className="space-y-3 pt-2 border-t border-border">
          <label className="text-sm text-muted-foreground">Send Incentive Tokens</label>
          <Input
            placeholder="Recipient address (0x...)"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="font-mono text-xs"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount (FLD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isSending || !recipientAddress || !amount}
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
