import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TokenCard from "./TokenCard";
import TokenIcon from "./TokenIcon";
import ChainSelector from "./ChainSelector";
import { CHAINS, MIN_PURCHASE_USD, Token, Chain } from "@/lib/tokenData";
import { FLD_PRICE_USD } from "@/lib/contracts";
import { ArrowDownUp, Loader2, ShoppingCart } from "lucide-react";

interface IntegratedPurchaseWidgetProps {
  onPurchase: (tokenAmount: number, tokenSymbol: string) => Promise<void>;
  isLoading: boolean;
}

const IntegratedPurchaseWidget = ({ onPurchase, isLoading }: IntegratedPurchaseWidgetProps) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(CHAINS[1]); // BSC default
  const [selectedToken, setSelectedToken] = useState<Token>(CHAINS[1].tokens[0]); // BNB default
  const [usdAmount, setUsdAmount] = useState<string>("100");

  // When chain changes, select the first (native) token
  useEffect(() => {
    setSelectedToken(selectedChain.tokens[0]);
  }, [selectedChain]);

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
          Buy FLUID Tokens
        </CardTitle>
        <CardDescription>Select your preferred network and payment token</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chain Selector */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Select Network</Label>
          <ChainSelector
            chains={CHAINS}
            selectedChain={selectedChain}
            onSelectChain={setSelectedChain}
          />
        </div>

        {/* Token Grid */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Select Token</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {selectedChain.tokens.map((token) => (
              <TokenCard
                key={token.symbol}
                symbol={token.symbol}
                name={token.name}
                logo={token.logo}
                isSelected={selectedToken.symbol === token.symbol}
                onClick={() => setSelectedToken(token)}
                isNative={token.isNative}
              />
            ))}
          </div>
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
              className="pl-7 pr-24 h-12 text-lg font-semibold bg-muted/50 border-border/50"
              min={MIN_PURCHASE_USD}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <TokenIcon symbol={selectedToken.symbol} logo={selectedToken.logo} size="md" />
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
          <Label className="text-base font-semibold">You Receive (FLUID)</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                <TokenIcon symbol="FLUID" size="lg" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{calculateFLD()}</p>
                <p className="text-xs text-muted-foreground">FLUID Tokens</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Price per FLUID</p>
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
