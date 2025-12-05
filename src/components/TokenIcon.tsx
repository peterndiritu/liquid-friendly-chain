import { Coins, DollarSign, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenIconProps {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TokenIcon = ({ symbol, size = "md", className }: TokenIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const iconSize = sizeClasses[size];

  const iconMap: Record<string, JSX.Element> = {
    ETH: <Coins className={cn(iconSize, "text-blue-500", className)} />,
    BNB: <Coins className={cn(iconSize, "text-yellow-500", className)} />,
    MATIC: <Coins className={cn(iconSize, "text-purple-500", className)} />,
    POL: <Coins className={cn(iconSize, "text-purple-500", className)} />,
    AVAX: <Coins className={cn(iconSize, "text-red-500", className)} />,
    OP: <Coins className={cn(iconSize, "text-red-400", className)} />,
    ARB: <Coins className={cn(iconSize, "text-blue-400", className)} />,
    FTM: <Coins className={cn(iconSize, "text-blue-300", className)} />,
    CRO: <Coins className={cn(iconSize, "text-blue-700", className)} />,
    CELO: <Coins className={cn(iconSize, "text-yellow-400", className)} />,
    GLMR: <Coins className={cn(iconSize, "text-teal-400", className)} />,
    XDAI: <Coins className={cn(iconSize, "text-teal-600", className)} />,
    USDT: <DollarSign className={cn(iconSize, "text-green-500", className)} />,
    USDC: <DollarSign className={cn(iconSize, "text-blue-600", className)} />,
    FLD: <Droplets className={cn(iconSize, "text-primary", className)} />,
    FLUID: <Droplets className={cn(iconSize, "text-primary", className)} />,
  };

  return iconMap[symbol] || <Coins className={cn(iconSize, "text-muted-foreground", className)} />;
};

export default TokenIcon;
