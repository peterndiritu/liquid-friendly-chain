import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TokenCard from "./TokenCard";
import TokenIcon from "./TokenIcon";
import { PAYMENT_TOKENS, MIN_PURCHASE_USD } from "@/lib/tokenData";
import { FLD_PRICE_USD } from "@/lib/contracts";
import { ArrowDownUp, ChevronDown, Loader2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegratedPurchaseWidgetProps {
  onPurchase: (tokenAmount: number, tokenSymbol: string) => Promise<void>;
  isLoading: boolean;
}

const IntegratedPurchaseWidget = ({ onPurchase, isLoading }: IntegratedPurchaseWidgetProps) => {
  const [selectedToken, setSelectedToken] = useState(PAYMENT_TOKENS.primary[1]); // BNB default
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const [showMore, setShowMore] = useState(false);

  const allTokens = [...PAYMENT_TOKENS.primary, ...PAYMENT_TOKENS.secondary];

  const calculateFLD = () => {
    const usd = parseFloat(usdAmount) || 0;
    return (usd / FLD_PRICE_USD).toFixed(2);
  };

  const calculateTokenAmount = () => {
    const usd = parseFloat(usdAmount) || 0;
    return (usd / selectedToken.price).toFixed(6);
  };

  const handlePurchase = async () => {
    const tokenAmount = parseFloat(calculateTokenAmount());
    if (tokenAmount > 0) {
      await onPurchase(tokenAmount, selectedToken.symbol);
    }
  };

  const isValidAmount = parseFloat(usdAmount) >= MIN_PURCHASE_USD;

  return (
    <Card className="purchase-widget-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl gradient-text flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Buy FLD Tokens
        </CardTitle>
        <CardDescription>Select your preferred payment method and amount</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Select Payment Method */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Select Payment Method</Label>
          
          {/* Primary Tokens Grid */}
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_TOKENS.primary.map((token) => (
              <TokenCard
                key={token.symbol}
                symbol={token.symbol}
                name={token.name}
                network={token.network}
                isSelected={selectedToken.symbol === token.symbol}
                onClick={() => setSelectedToken(token)}
              />
            ))}
          </div>

          {/* More Tokens Collapsible */}
          <Collapsible open={showMore} onOpenChange={setShowMore}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <span className="text-sm font-medium text-muted-foreground">+ Other Cryptos</span>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  showMore && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_TOKENS.secondary.map((token) => (
                  <TokenCard
                    key={token.symbol}
                    symbol={token.symbol}
                    name={token.name}
                    network={token.network}
                    isSelected={selectedToken.symbol === token.symbol}
                    onClick={() => setSelectedToken(token)}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* USD Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="usd-amount" className="text-base font-semibold">
            You Pay
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              $
            </span>
            <Input
              id="usd-amount"
              type="number"
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              placeholder="100"
              className="pl-7 pr-20 h-12 text-lg font-semibold bg-muted/50 border-border/50"
              min={MIN_PURCHASE_USD}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <TokenIcon symbol={selectedToken.symbol} />
              <span className="text-sm font-semibold text-foreground">
                {selectedToken.symbol}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            💡 Min: ${MIN_PURCHASE_USD} • Approx. {calculateTokenAmount()} {selectedToken.symbol}
          </p>
        </div>

        {/* Swap Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-card px-4 py-2 rounded-full border border-border/50">
              <ArrowDownUp className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* You Receive Section */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">You Receive (FLD)</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                <TokenIcon symbol="FLD" size="lg" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{calculateFLD()}</p>
                <p className="text-xs text-muted-foreground">FLD Tokens</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Price per FLD</p>
              <p className="font-semibold text-foreground">${FLD_PRICE_USD}</p>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <Button
          onClick={handlePurchase}
          disabled={isLoading || !isValidAmount}
          className="w-full h-14 text-lg font-semibold buy-button-gradient hover:scale-105 transition-transform"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy ${usdAmount || "0"}
            </>
          )}
        </Button>

        {!isValidAmount && usdAmount && (
          <p className="text-sm text-destructive text-center">
            Minimum purchase amount is ${MIN_PURCHASE_USD}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegratedPurchaseWidget;
