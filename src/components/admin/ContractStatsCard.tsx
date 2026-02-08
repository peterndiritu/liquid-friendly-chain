import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFluidContract } from "@/hooks/useFluidContract";
import { formatTokenAmount } from "@/lib/fluidContract";
import { BarChart3, Coins, Droplets, Gift, Users, Building, Sparkles, Layers } from "lucide-react";

interface PoolStatProps {
  label: string;
  used: bigint | undefined;
  total: bigint | undefined;
  icon: React.ReactNode;
  colorClass: string;
}

const PoolStat = ({ label, used, total, icon, colorClass }: PoolStatProps) => {
  const usedNum = used ? Number(used) / 1e18 : 0;
  const totalNum = total ? Number(total) / 1e18 : 0;
  const percentage = totalNum > 0 ? (usedNum / totalNum) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded ${colorClass}`}>{icon}</div>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {percentage.toFixed(1)}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTokenAmount(used ?? BigInt(0))} used</span>
        <span>{formatTokenAmount(total ?? BigInt(0))} total</span>
      </div>
    </div>
  );
};

export const ContractStatsCard = () => {
  const {
    presalePool,
    airdropPool,
    teamPool,
    foundPool,
    liqPool,
    incPool,
    ecoPool,
    presaleSold,
    airdropUsed,
    incentivesUsed,
    liquidityClaimed,
    teamClaimed,
    foundationClaimed,
  } = useFluidContract();

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-primary" />
          Pool Allocations
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PoolStat
          label="Presale"
          used={presaleSold}
          total={presalePool}
          icon={<Coins className="w-3.5 h-3.5 text-amber-500" />}
          colorClass="bg-amber-500/10"
        />
        <PoolStat
          label="Airdrop"
          used={airdropUsed}
          total={airdropPool}
          icon={<Gift className="w-3.5 h-3.5 text-purple-500" />}
          colorClass="bg-purple-500/10"
        />
        <PoolStat
          label="Incentives"
          used={incentivesUsed}
          total={incPool}
          icon={<Sparkles className="w-3.5 h-3.5 text-cyan-500" />}
          colorClass="bg-cyan-500/10"
        />
        <PoolStat
          label="Liquidity"
          used={liquidityClaimed}
          total={liqPool}
          icon={<Droplets className="w-3.5 h-3.5 text-blue-500" />}
          colorClass="bg-blue-500/10"
        />
        <PoolStat
          label="Team"
          used={teamClaimed}
          total={teamPool}
          icon={<Users className="w-3.5 h-3.5 text-green-500" />}
          colorClass="bg-green-500/10"
        />
        <PoolStat
          label="Foundation"
          used={foundationClaimed}
          total={foundPool}
          icon={<Building className="w-3.5 h-3.5 text-orange-500" />}
          colorClass="bg-orange-500/10"
        />
        <PoolStat
          label="Ecosystem"
          used={BigInt(0)}
          total={ecoPool}
          icon={<Layers className="w-3.5 h-3.5 text-pink-500" />}
          colorClass="bg-pink-500/10"
        />
      </CardContent>
    </Card>
  );
};
