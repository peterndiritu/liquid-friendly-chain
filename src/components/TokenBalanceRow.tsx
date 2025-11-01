import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Copy, ExternalLink, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TokenIcon from "./TokenIcon";
import { toast } from "sonner";

interface TokenBalanceRowProps {
  symbol: string;
  balance: string;
  type: 'native' | 'ERC20';
  address?: string;
  usdPrice?: number;
  usdValue?: number;
  chainId?: number;
  priceChange24h?: number;
}

const TokenBalanceRow = ({ 
  symbol, 
  balance, 
  type, 
  address,
  usdPrice,
  usdValue,
  chainId,
  priceChange24h
}: TokenBalanceRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const balanceNum = parseFloat(balance);
  const hasBalance = balanceNum > 0;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const viewOnExplorer = () => {
    const explorers: Record<number, string> = {
      1: "https://etherscan.io",
      56: "https://bscscan.com",
      137: "https://polygonscan.com",
      43114: "https://snowtrace.io",
      42161: "https://arbiscan.io",
      10: "https://optimistic.etherscan.io",
      8453: "https://basescan.org",
      250: "https://ftmscan.com",
      25: "https://cronoscan.com",
      324: "https://explorer.zksync.io",
      59144: "https://lineascan.build",
      534352: "https://scrollscan.com",
      42220: "https://celoscan.io",
      1284: "https://moonscan.io",
      100: "https://gnosisscan.io",
      1313161554: "https://aurorascan.dev",
      5000: "https://explorer.mantle.xyz",
      81457: "https://blastscan.io",
      7777777: "https://explorer.zora.energy",
    };
    
    if (chainId && address) {
      const explorerUrl = explorers[chainId];
      if (explorerUrl) {
        window.open(`${explorerUrl}/token/${address}`, '_blank');
      }
    }
  };

  const addToWallet = async () => {
    if (!address) return;
    
    try {
      await (window as any).ethereum?.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals: 18,
          },
        },
      });
      toast.success(`${symbol} added to wallet`);
    } catch (error) {
      toast.error("Failed to add token to wallet");
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div 
          className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
            hasBalance ? 'bg-primary/5 hover:bg-primary/10' : 'bg-muted/30 opacity-60'
          } ${isOpen ? 'rounded-b-none border-b border-border/50' : ''}`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
              <TokenIcon symbol={symbol} />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{symbol}</p>
              <p className="text-xs text-muted-foreground">
                {type === 'native' ? 'Native Token' : 'ERC20 Token'}
              </p>
            </div>
          </div>
          <div className="text-right mr-3">
            <p className="font-bold">{balanceNum.toFixed(4)}</p>
            {usdValue !== undefined && (
              <div className="flex items-center justify-end gap-1.5">
                <p className="text-xs text-muted-foreground">
                  ${usdValue.toFixed(2)}
                </p>
                {priceChange24h !== undefined && (
                  <span className={`text-xs flex items-center gap-0.5 ${
                    priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {priceChange24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(priceChange24h).toFixed(1)}%
                  </span>
                )}
              </div>
            )}
          </div>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="bg-muted/30 p-4 rounded-b-lg space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Token Type</p>
              <p className="font-medium">{type}</p>
            </div>
            {usdPrice && (
              <div>
                <p className="text-muted-foreground text-xs mb-1">Price (USD)</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">${usdPrice.toFixed(6)}</p>
                  {priceChange24h !== undefined && (
                    <span className={`text-xs flex items-center gap-0.5 ${
                      priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {priceChange24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(priceChange24h).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {address && (
            <div>
              <p className="text-muted-foreground text-xs mb-1">Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-background px-2 py-1 rounded flex-1 truncate">
                  {address}
                </code>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
          
          {address && type === 'ERC20' && (
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWallet();
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add to Wallet
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  viewOnExplorer();
                }}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Explorer
              </Button>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TokenBalanceRow;
