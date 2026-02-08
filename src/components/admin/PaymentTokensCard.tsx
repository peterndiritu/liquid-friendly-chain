import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useIsPaymentTokenAllowed } from "@/hooks/useFluidContract";
import { Coins, Loader2, Check, X } from "lucide-react";

// Common payment tokens on Polygon
const COMMON_TOKENS = [
  { symbol: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" },
  { symbol: "USDC", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" },
  { symbol: "DAI", address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" },
];

const TokenStatus = ({ symbol, address }: { symbol: string; address: string }) => {
  const { isAllowed, isLoading } = useIsPaymentTokenAllowed(address);
  const { setPaymentToken, actionLoading } = useAdminActions();

  const isUpdating = actionLoading === "Set Payment Token";

  const handleToggle = async () => {
    try {
      await setPaymentToken(address, !isAllowed);
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{symbol}</span>
        <span className="text-xs text-muted-foreground font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : isAllowed ? (
          <span className="flex items-center gap-1 text-xs text-green-500">
            <Check className="w-3 h-3" /> Allowed
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <X className="w-3 h-3" /> Disabled
          </span>
        )}
        <Button
          size="sm"
          variant={isAllowed ? "destructive" : "default"}
          onClick={handleToggle}
          disabled={isUpdating || isLoading}
          className="h-7 text-xs"
        >
          {isUpdating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : isAllowed ? (
            "Disable"
          ) : (
            "Enable"
          )}
        </Button>
      </div>
    </div>
  );
};

export const PaymentTokensCard = () => {
  const [customToken, setCustomToken] = useState("");
  const { setPaymentToken, actionLoading } = useAdminActions();

  const isAddingCustom = actionLoading === "Set Payment Token";

  const handleAddCustom = async () => {
    if (!customToken || !customToken.startsWith("0x")) return;
    try {
      await setPaymentToken(customToken, true);
      setCustomToken("");
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="w-5 h-5 text-purple-500" />
          Payment Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          {COMMON_TOKENS.map((token) => (
            <TokenStatus key={token.address} {...token} />
          ))}
        </div>
        
        <div className="pt-2 border-t border-border">
          <label className="text-sm text-muted-foreground mb-2 block">Add Custom Token</label>
          <div className="flex gap-2">
            <Input
              placeholder="0x..."
              value={customToken}
              onChange={(e) => setCustomToken(e.target.value)}
              className="flex-1 font-mono text-xs"
            />
            <Button
              onClick={handleAddCustom}
              disabled={isAddingCustom || !customToken}
              size="sm"
            >
              {isAddingCustom ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
