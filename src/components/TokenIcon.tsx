import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenIconProps {
  symbol: string;
  logo?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const TOKEN_LOGOS: Record<string, string> = {
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
  MATIC: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
  POL: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
  USDT: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
  USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
  AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
  ARB: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
  OP: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg",
  DAI: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg",
  BUSD: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg",
  WBTC: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg",
  FTM: "https://cryptologos.cc/logos/fantom-ftm-logo.svg",
  CRO: "https://cryptologos.cc/logos/cronos-cro-logo.svg",
  CELO: "https://cryptologos.cc/logos/celo-celo-logo.svg",
  GLMR: "https://cryptologos.cc/logos/moonbeam-glmr-logo.svg",
  CAKE: "https://cryptologos.cc/logos/pancakeswap-cake-logo.svg",
  WETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  WAVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
  cUSD: "https://cryptologos.cc/logos/celo-celo-logo.svg",
};

const TokenIcon = ({ symbol, logo, size = "md", className }: TokenIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const iconSize = sizeClasses[size];

  // Handle FLUID/FLD tokens with Droplets icon
  if (symbol === "FLD" || symbol === "FLUID") {
    return <Droplets className={cn(iconSize, "text-primary", className)} />;
  }

  // Use provided logo or lookup from map
  const logoUrl = logo || TOKEN_LOGOS[symbol];

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={symbol}
        className={cn(iconSize, "object-contain", className)}
        onError={(e) => {
          // Fallback to a generic coin icon
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
    );
  }

  // Fallback for unknown tokens
  return <Droplets className={cn(iconSize, "text-muted-foreground", className)} />;
};

export default TokenIcon;
