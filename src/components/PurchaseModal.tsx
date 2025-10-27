import { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FLD_PRICE_USD } from "@/lib/contracts";
import { Loader2, Coins } from "lucide-react";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { TOKEN_CONTRACTS } from "@/lib/thirdweb";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (amount: number, token: string) => Promise<boolean | void>;
  isLoading: boolean;
}

// Available tokens for purchase
const AVAILABLE_TOKENS = [
  { symbol: "ETH", name: "Ethereum", price: 3500 },
  { symbol: "BNB", name: "BNB", price: 600 },
  { symbol: "MATIC", name: "Polygon", price: 0.90 },
  { symbol: "POL", name: "Polygon", price: 0.90 },
  { symbol: "AVAX", name: "Avalanche", price: 38 },
  { symbol: "USDT", name: "Tether USD", price: 1 },
  { symbol: "USDC", name: "USD Coin", price: 1 },
];

const PurchaseModal = ({ open, onOpenChange, onPurchase, isLoading }: PurchaseModalProps) => {
  const [tokenAmount, setTokenAmount] = useState("1");
  const [selectedToken, setSelectedToken] = useState("BNB");
  const { chain, chainName } = useWalletStatus();
  const { balances } = useTokenBalances();

  // Reset selected token when chain changes
  useEffect(() => {
    if (chain) {
      const chainId = chain.id as keyof typeof TOKEN_CONTRACTS;
      
      // Set to native token of the chain
      if (chainName?.includes("Ethereum")) setSelectedToken("ETH");
      else if (chainName?.includes("BSC") || chainName?.includes("BNB")) setSelectedToken("BNB");
      else if (chainName?.includes("Polygon")) setSelectedToken("POL");
      else if (chainName?.includes("Avalanche")) setSelectedToken("AVAX");
      else if (chainName?.includes("Arbitrum")) setSelectedToken("ETH");
      else if (chainName?.includes("Optimism")) setSelectedToken("ETH");
      else if (chainName?.includes("Base")) setSelectedToken("ETH");
    }
  }, [chain, chainName]);

  const calculateFLDAmount = (amount: number, tokenSymbol: string) => {
    const token = AVAILABLE_TOKENS.find(t => t.symbol === tokenSymbol);
    const tokenPriceUSD = token?.price || 1;
    const usdValue = amount * tokenPriceUSD;
    return (usdValue / FLD_PRICE_USD).toFixed(2);
  };

  const handlePurchase = async () => {
    const amount = parseFloat(tokenAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    
    const success = await onPurchase(amount, selectedToken);
    if (success) {
      onOpenChange(false);
      setTokenAmount("1");
    }
  };

  const fldAmount = calculateFLDAmount(parseFloat(tokenAmount) || 0, selectedToken);
  const selectedTokenData = AVAILABLE_TOKENS.find(t => t.symbol === selectedToken);

  // Filter available tokens based on current network
  const availableTokens = AVAILABLE_TOKENS.filter(token => {
    if (!chain) return true;
    const chainId = chain.id as keyof typeof TOKEN_CONTRACTS;
    const tokensOnChain = TOKEN_CONTRACTS[chainId];
    
    // Native tokens
    if (token.symbol === "ETH" && (chainName?.includes("Ethereum") || chainName?.includes("Arbitrum") || chainName?.includes("Optimism") || chainName?.includes("Base"))) return true;
    if (token.symbol === "BNB" && chainName?.includes("BSC")) return true;
    if ((token.symbol === "MATIC" || token.symbol === "POL") && chainName?.includes("Polygon")) return true;
    if (token.symbol === "AVAX" && chainName?.includes("Avalanche")) return true;
    
    // ERC20 tokens
    if ((token.symbol === "USDT" || token.symbol === "USDC") && tokensOnChain && token.symbol in tokensOnChain) return true;
    
    return false;
  });

  // Get balance for selected token
  const selectedTokenBalance = balances.find(b => b.symbol === selectedToken || (b.symbol === "POL" && selectedToken === "MATIC"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            Buy FLD Tokens
          </DialogTitle>
          <DialogDescription>
            Purchase FLD tokens on {chainName || 'current network'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Token Selector */}
          <div className="space-y-2">
            <Label htmlFor="token-select">Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger id="token-select">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{token.symbol}</span>
                      <span className="text-muted-foreground text-sm">- {token.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTokenBalance && (
              <p className="text-xs text-muted-foreground mt-1">
                Available: {parseFloat(selectedTokenBalance.balance).toFixed(4)} {selectedToken}
              </p>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="token-amount">Amount ({selectedToken})</Label>
            <Input
              id="token-amount"
              type="number"
              step="0.01"
              min="0.01"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder={`Enter ${selectedToken} amount`}
            />
            {selectedTokenData && (
              <p className="text-xs text-muted-foreground">
                Current Price: ${selectedTokenData.price.toLocaleString()} USD
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You will receive:</span>
              <span className="font-bold text-primary">{fldAmount} FLD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per FLD:</span>
              <span className="font-semibold">${FLD_PRICE_USD}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Value:</span>
              <span className="font-semibold">
                ${((parseFloat(tokenAmount) || 0) * (selectedTokenData?.price || 1)).toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-3">
            <p className="text-xs text-muted-foreground">
              💡 {availableTokens.length} token{availableTokens.length > 1 ? 's' : ''} available on {chainName}. Switch networks to access more tokens.
            </p>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading || parseFloat(tokenAmount) <= 0}
            className="w-full button-glow"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Coins className="mr-2 h-4 w-4" />
                Confirm Purchase
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
