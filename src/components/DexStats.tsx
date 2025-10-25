import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, Gift, Activity } from "lucide-react";

interface DexStatsProps {
  balance: string;
  totalPurchased: string;
  totalClaimed: string;
  address: string;
}

const DexStats = ({ balance, totalPurchased, totalClaimed, address }: DexStatsProps) => {
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const stats = [
    {
      icon: Wallet,
      label: "FLD Balance",
      value: balance,
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Total Purchased",
      value: totalPurchased,
      color: "text-green-500",
    },
    {
      icon: Gift,
      label: "Total Claimed",
      value: totalClaimed,
      color: "text-blue-500",
    },
    {
      icon: Activity,
      label: "Wallet Address",
      value: truncateAddress(address),
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="card-glow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DexStats;
