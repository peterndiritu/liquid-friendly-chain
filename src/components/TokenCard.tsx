import TokenIcon from "./TokenIcon";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  symbol: string;
  name: string;
  network?: string;
  logo?: string;
  isSelected: boolean;
  onClick: () => void;
  isNative?: boolean;
}

const TokenCard = ({ symbol, name, network, logo, isSelected, onClick, isNative }: TokenCardProps) => {
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
      <div className="text-center">
        <p className={cn(
          "font-semibold text-foreground",
          isSelected && "text-primary"
        )}>
          {symbol}
        </p>
        <p className="text-xs text-muted-foreground truncate max-w-[80px]">
          {isNative ? "Native" : name}
        </p>
      </div>
    </button>
  );
};

export default TokenCard;
