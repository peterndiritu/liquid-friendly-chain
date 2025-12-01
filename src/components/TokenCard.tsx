import TokenIcon from "./TokenIcon";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  symbol: string;
  name: string;
  network: string;
  isSelected: boolean;
  onClick: () => void;
}

const TokenCard = ({ symbol, name, network, isSelected, onClick }: TokenCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "token-card group",
        isSelected && "selected"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all",
          "bg-gradient-to-br from-primary/20 to-primary/5",
          "group-hover:from-primary/30 group-hover:to-primary/10",
          isSelected && "from-primary/40 to-primary/20 shadow-lg shadow-primary/20"
        )}>
          <TokenIcon symbol={symbol} size="lg" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">{symbol}</p>
          <p className="text-xs text-muted-foreground">{network}</p>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isSelected && "rotate-180 text-primary"
        )} />
      </div>
    </button>
  );
};

export default TokenCard;
