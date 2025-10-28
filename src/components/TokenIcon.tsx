import { Coins, DollarSign, Droplets } from "lucide-react";

interface TokenIconProps {
  symbol: string;
}

const TokenIcon = ({ symbol }: TokenIconProps) => {
  const iconMap: Record<string, JSX.Element> = {
    ETH: <Coins className="w-5 h-5 text-blue-500" />,
    BNB: <Coins className="w-5 h-5 text-yellow-500" />,
    MATIC: <Coins className="w-5 h-5 text-purple-500" />,
    POL: <Coins className="w-5 h-5 text-purple-500" />,
    AVAX: <Coins className="w-5 h-5 text-red-500" />,
    OP: <Coins className="w-5 h-5 text-red-400" />,
    ARB: <Coins className="w-5 h-5 text-blue-400" />,
    FTM: <Coins className="w-5 h-5 text-blue-300" />,
    CRO: <Coins className="w-5 h-5 text-blue-700" />,
    CELO: <Coins className="w-5 h-5 text-yellow-400" />,
    GLMR: <Coins className="w-5 h-5 text-teal-400" />,
    XDAI: <Coins className="w-5 h-5 text-teal-600" />,
    USDT: <DollarSign className="w-5 h-5 text-green-500" />,
    USDC: <DollarSign className="w-5 h-5 text-blue-600" />,
    FLD: <Droplets className="w-5 h-5 text-primary" />,
  };

  return iconMap[symbol] || <Coins className="w-5 h-5 text-muted-foreground" />;
};

export default TokenIcon;
