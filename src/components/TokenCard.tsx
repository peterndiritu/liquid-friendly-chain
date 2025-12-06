import TokenIcon from "./TokenIcon";
import { Check, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenCardProps {
  symbol: string;
  name: string;
  network?: string;
  logo?: string;
  isSelected: boolean;
  onClick: () => void;
  isNative?: boolean;
  livePrice?: number;
  change24h?: number;
  isLoadingPrice?: boolean;
}

const TokenCard = ({ 
  symbol, 
  name, 
  network, 
  logo, 
  isSelected, 
  onClick, 
  isNative,
  livePrice,
  change24h = 0,
  isLoadingPrice = false
}: TokenCardProps) => {
  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    return `${absChange.toFixed(1)}%`;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200",
        "bg-muted/50 hover:bg-muted/70 border border-border/50",
        "hover:scale-105 hover:shadow-lg",
        isSelected && "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full transition-all",
        "bg-gradient-to-br from-background to-muted",
        isSelected && "from-primary/20 to-primary/5"
      )}>
        <TokenIcon symbol={symbol} logo={logo} size="xl" />
      </div>
      <div className="text-center space-y-1">
        <p className={cn(
          "font-semibold text-foreground",
          isSelected && "text-primary"
        )}>
          {symbol}
        </p>
        
        {/* Price display */}
        {isLoadingPrice ? (
          <Skeleton className="h-4 w-14 mx-auto" />
        ) : livePrice !== undefined ? (
          <p className="text-xs font-medium text-muted-foreground">
            {formatPrice(livePrice)}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground truncate max-w-[80px]">
            {isNative ? "Native" : name}
          </p>
        )}
        
        {/* 24h change indicator */}
        {!isLoadingPrice && livePrice !== undefined && (
          <div className={cn(
            "flex items-center justify-center gap-0.5 text-[10px] font-medium",
            change24h > 0 && "text-green-500",
            change24h < 0 && "text-red-500",
            change24h === 0 && "text-muted-foreground"
          )}>
            {change24h > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : change24h < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {formatChange(change24h)}
          </div>
        )}
      </div>
    </button>
  );
};

export default TokenCard;
