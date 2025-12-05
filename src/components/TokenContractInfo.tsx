import { useState } from "react";
import { FLD_TOKEN_ADDRESS } from "@/lib/contracts";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TokenContractInfo = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(FLD_TOKEN_ADDRESS);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Token address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handleAddToWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: [{
          type: "ERC20",
          options: {
            address: FLD_TOKEN_ADDRESS,
            symbol: "FLD",
            decimals: 18,
          },
        }] as unknown as any[],
      });
      toast({
        title: "Token added!",
        description: "FLD token has been added to your wallet",
      });
    } catch (err) {
      toast({
        title: "Failed to add token",
        description: "User rejected the request",
        variant: "destructive",
      });
    }
  };

  const polygonscanUrl = `https://polygonscan.com/token/${FLD_TOKEN_ADDRESS}`;

  return (
    <div className="p-4 rounded-lg bg-card border">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">FLUID Token Contract</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            Polygon
          </span>
        </div>
        
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border border-border/50">
          <code className="text-xs font-mono text-foreground flex-1 truncate">
            {FLD_TOKEN_ADDRESS}
          </code>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-1 min-w-[80px]"
          >
            {copied ? (
              <Check className="w-3 h-3 mr-1 text-green-500" />
            ) : (
              <Copy className="w-3 h-3 mr-1" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-[100px]"
          >
            <a href={polygonscanUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              Polygonscan
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToWallet}
            className="flex-1 min-w-[100px]"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add to Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenContractInfo;
