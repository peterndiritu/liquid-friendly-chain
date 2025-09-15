import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, TrendingUp, Shield, Link2, Coins, BarChart3 } from "lucide-react";

const ExploreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const exploreItems = [
    { icon: Zap, label: "Technology", href: "#technology" },
    { icon: TrendingUp, label: "Features", href: "#features" },
    { icon: Shield, label: "Security", href: "#security" },
    { icon: Link2, label: "Cross-Chain", href: "#cross-chain" },
    { icon: Coins, label: "Tokenomics", href: "#tokenomics" },
    { icon: BarChart3, label: "Analytics", href: "#analytics" },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="text-foreground hover:text-primary flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        Explore
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-56 z-50 bg-background border border-border rounded-lg shadow-xl animate-fade-in">
            <div className="py-2">
              {exploreItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreDropdown;