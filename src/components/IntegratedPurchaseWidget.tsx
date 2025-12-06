import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TokenCard from "./TokenCard";
import TokenIcon from "./TokenIcon";
import ChainSelector from "./ChainSelector";
import { CHAINS, MIN_PURCHASE_USD, Token, Chain } from "@/lib/tokenData";
import { FLD_PRICE_USD } from "@/lib/contracts";
import { usePurchaseWidgetPrices, TokenWithPrice } from "@/hooks/usePurchaseWidgetPrices";
import { ArrowDownUp, Loader2, ShoppingCart, RefreshCw, Zap, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface IntegratedPurchaseWidgetProps {
  onPurchase: (tokenAmount: number, tokenSymbol: string) => Promise<void>;
  isLoading: boolean;
}

const IntegratedPurchaseWidget = ({ onPurchase, isLoading }: IntegratedPurchaseWidgetProps) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(CHAINS[1]); // BSC default
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<string>(CHAINS[1].tokens[0].symbol);
  const [usdAmount, setUsdAmount] = useState<string>("100");

  // Fetch live prices for current chain
  const { 
    tokensWithPrices, 
    isLoading: pricesLoading, 
    lastUpdated, 
    refresh, 
    usingFallback 
  } = usePurchaseWidgetPrices(selectedChain);

  // Get selected token with live price
  const selectedToken = useMemo(() => {
    return tokensWithPrices.find(t => t.symbol === selectedTokenSymbol) || tokensWithPrices[0];
  }, [tokensWithPrices, selectedTokenSymbol]);

  // When chain changes, select the first (native) token
  useEffect(() => {
    setSelectedTokenSymbol(selectedChain.tokens[0].symbol);
  }, [selectedChain]);

  const calculateFLD = () => {
    const usd = parseFloat(usdAmount) || 0;
    return (usd / FLD_PRICE_USD).toFixed(2);
  };

  const calculateTokenAmount = () => {
    const usd = parseFloat(usdAmount) || 0;
    const price = selectedToken?.livePrice || selectedToken?.price || 1;
    return (usd / price).toFixed(6);
  };

  const handlePurchase = async () => {
    const tokenAmount = parseFloat(calculateTokenAmount());
    if (tokenAmount > 0) {
      await onPurchase(tokenAmount, selectedToken.symbol);
    }
  };

  const isValidAmount = parseFloat(usdAmount) >= MIN_PURCHASE_USD;

  const formatLastUpdated = () => {
    if (!lastUpdated) return null;
    return formatDistanceToNow(lastUpdated, { addSuffix: true });
  };

  return (
    <Card className="purchase-widget-card animate-fade-in">
      <CardHeader className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl gradient-text flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              Buy FLUID Tokens
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Select your preferred network and payment token</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={usingFallback ? "secondary" : "default"}
              className={usingFallback ? "" : "bg-green-500/20 text-green-500 border-green-500/30"}
            >
              <Zap className="w-3 h-3 mr-1" />
              {usingFallback ? "Estimated" : "Live"}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={refresh}
              disabled={pricesLoading}
              className="h-8 w-8"
              title="Refresh prices"
            >
              <RefreshCw className={`w-4 h-4 ${pricesLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3" />
            Updated {formatLastUpdated()}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0 md:pt-0">
        <div className="space-y-1.5 md:space-y-2">
          <Label className="text-sm md:text-base font-semibold">Select Network</Label>
          <ChainSelector
            chains={CHAINS}
            selectedChain={selectedChain}
            onSelectChain={setSelectedChain}
          />
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <Label className="text-sm md:text-base font-semibold">Select Token</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {tokensWithPrices.map((token) => (
              <TokenCard
                key={token.symbol}
                symbol={token.symbol}
                name={token.name}
                logo={token.logo}
                isSelected={selectedTokenSymbol === token.symbol}
                onClick={() => setSelectedTokenSymbol(token.symbol)}
                isNative={token.isNative}
                livePrice={token.livePrice}
                change24h={token.change24h}
                isLoadingPrice={pricesLoading}
              />
            ))}
          </div>
        </div>

        {/* USD Amount Input */}
        <div className="space-y-1.5 md:space-y-2">
          <Label htmlFor="usd-amount" className="text-sm md:text-base font-semibold">
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
              className="pl-7 pr-20 md:pr-24 h-10 md:h-12 text-base md:text-lg font-semibold bg-muted/50 border-border/50"
              min={MIN_PURCHASE_USD}
            />
            <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 md:gap-2">
              <TokenIcon symbol={selectedToken?.symbol || ''} logo={selectedToken?.logo} size="md" />
              <span className="text-xs md:text-sm font-semibold text-foreground">
                {selectedToken?.symbol}
              </span>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            💡 Min: ${MIN_PURCHASE_USD} • Approx. {calculateTokenAmount()} {selectedToken?.symbol} @ ${selectedToken?.livePrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
        <div className="space-y-1.5 md:space-y-2">
          <Label className="text-sm md:text-base font-semibold">You Receive (FLUID)</Label>
          <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20">
                <TokenIcon symbol="FLUID" size="lg" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">{calculateFLD()}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">FLUID Tokens</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] md:text-sm text-muted-foreground">Price per FLUID</p>
              <p className="text-sm md:text-base font-semibold text-foreground">${FLD_PRICE_USD}</p>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <Button
          onClick={handlePurchase}
          disabled={isLoading || !isValidAmount}
          className="w-full h-12 md:h-14 text-base md:text-lg font-semibold buy-button-gradient hover:scale-105 transition-transform"
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
