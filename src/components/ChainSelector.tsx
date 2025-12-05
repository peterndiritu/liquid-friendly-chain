import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chain } from "@/lib/tokenData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChainSelectorProps {
  chains: Chain[];
  selectedChain: Chain;
  onSelectChain: (chain: Chain) => void;
}

const ChainSelector = ({ chains, selectedChain, onSelectChain }: ChainSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-full flex items-center justify-between gap-3 p-3 rounded-lg",
            "bg-muted/50 hover:bg-muted/70 border border-border/50",
            "transition-all duration-200",
            open && "ring-2 ring-primary/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img
                src={selectedChain.logo}
                alt={selectedChain.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://cryptologos.cc/logos/ethereum-eth-logo.svg";
                }}
              />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">{selectedChain.name}</p>
              <p className="text-xs text-muted-foreground">Chain ID: {selectedChain.id}</p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto bg-popover border border-border shadow-lg z-50"
        align="start"
      >
        {chains.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => {
              onSelectChain(chain);
              setOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 p-3 cursor-pointer",
              selectedChain.id === chain.id && "bg-primary/10"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={chain.logo}
                alt={chain.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://cryptologos.cc/logos/ethereum-eth-logo.svg";
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{chain.name}</p>
              <p className="text-xs text-muted-foreground">{chain.shortName}</p>
            </div>
            {selectedChain.id === chain.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChainSelector;
