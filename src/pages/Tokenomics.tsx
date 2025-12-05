import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Lock,
  Gift,
  Award,
  PieChart,
  BarChart3
} from "lucide-react";

const Tokenomics = () => {
  const handleBuyClick = () => {
    window.location.href = '/dex';
  };

  const tokenDistribution = [
    { category: "Public Sale", percentage: 40, amount: "4M FLUID", color: "bg-blue-500" },
    { category: "Community Rewards", percentage: 30, amount: "3M FLUID", color: "bg-indigo-500" },
    { category: "FLUID Reserved & Development", percentage: 10, amount: "1M FLUID", color: "bg-purple-500" },
    { category: "Marketing and Liquidity", percentage: 10, amount: "1M FLUID", color: "bg-yellow-500" },
    { category: "Team & Advisors", percentage: 10, amount: "1M FLUID", color: "bg-green-500" }
  ];

  const stakingRewards = [
    { duration: "30 Days", apy: "12%", multiplier: "1x", risk: "Low" },
    { duration: "90 Days", apy: "18%", multiplier: "1.5x", risk: "Medium" },
    { duration: "180 Days", apy: "25%", multiplier: "2x", risk: "Medium" },
    { duration: "365 Days", apy: "35%", multiplier: "3x", risk: "High" }
  ];

  const utilities = [
    {
      icon: Zap,
      title: "Transaction Fees",
      description: "FLUID tokens are used to pay for all network transaction fees with discounted rates for holders."
    },
    {
      icon: Shield,
      title: "Network Security",
      description: "Participate in network security through staking and earn rewards while securing the blockchain."
    },
    {
      icon: Users,
      title: "Governance Rights",
      description: "Vote on protocol upgrades, parameter changes, and treasury allocations through DAO governance."
    },
    {
      icon: Award,
      title: "Premium Features",
      description: "Access advanced features, priority support, and exclusive tools with token holdings."
    },
    {
      icon: Gift,
      title: "Reward Programs",
      description: "Earn additional rewards through liquidity mining, referrals, and ecosystem participation."
    },
    {
      icon: Lock,
      title: "Collateral",
      description: "Use FLUID as collateral for lending, borrowing, and other DeFi applications within the ecosystem."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Tokenomics</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Discover the economic model behind FLUID token with sustainable rewards, governance rights, and ecosystem utility
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="button-glow animate-glow-pulse"
                  onClick={handleBuyClick}
                >
                  Buy FLUID Tokens
                </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Economic Whitepaper
              </Button>
            </div>
          </div>
        </section>

        {/* Token Overview */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="card-glow p-12 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">10M</div>
                  <p className="text-muted-foreground">Total Supply</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">$2.50</div>
                  <p className="text-muted-foreground">Current Price</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">$25M</div>
                  <p className="text-muted-foreground">Market Cap</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">62%</div>
                  <p className="text-muted-foreground">Circulating Supply</p>
                </div>
              </div>
            </Card>

            {/* Token Distribution */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Token Distribution</h2>
              <p className="text-xl text-muted-foreground">
                Balanced allocation ensuring sustainable growth and community participation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Distribution Chart */}
              <Card className="card-glow p-8">
                <div className="space-y-4">
                  {tokenDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                        <div>
                          <div className="font-semibold">{item.category}</div>
                          <div className="text-sm text-muted-foreground">{item.amount}</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Vesting Schedule */}
              <Card className="card-glow p-8">
                <h3 className="text-xl font-bold mb-6">Vesting Schedule</h3>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-primary/10 rounded-lg">
                    <span>Public Sale</span>
                    <span className="text-primary font-semibold">Immediate</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span>Community Rewards</span>
                    <span>12 month linear</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span>FLUID Reserved & Development</span>
                    <span>36 month linear</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span>Marketing and Liquidity</span>
                    <span>18 month linear</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span>Team & Advisors</span>
                    <span>24 month linear</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Token Utility */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Token Utility</h2>
              <p className="text-xl text-muted-foreground">
                Multiple use cases driving sustainable demand and ecosystem growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utilities.map((utility, index) => (
                <Card key={index} className="card-glow p-6 animate-fade-in">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4">
                      <utility.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{utility.title}</h3>
                    <p className="text-muted-foreground">{utility.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Staking Rewards */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Staking Rewards</h2>
              <p className="text-xl text-muted-foreground">
                Earn passive income by staking FLUID tokens with flexible lock-up periods
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stakingRewards.map((tier, index) => (
                <Card key={index} className="card-glow p-6 text-center animate-fade-in hover:scale-105 transition-transform">
                  <div className="mb-4">
                    <div className="text-2xl font-bold gradient-text mb-2">{tier.apy}</div>
                    <div className="text-lg font-semibold">{tier.duration}</div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Multiplier:</span>
                      <span className="font-semibold text-primary">{tier.multiplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className={`font-semibold ${
                        tier.risk === 'Low' ? 'text-green-500' :
                        tier.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                      }`}>{tier.risk}</span>
                    </div>
                  </div>
                  <Button className="w-full button-glow">
                    Stake Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Economic Model */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <Card className="card-glow p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Sustainable Economics</h2>
                <p className="text-xl text-muted-foreground">
                  Deflationary mechanisms and revenue sharing for long-term value creation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mx-auto flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Token Burn</h3>
                  <p className="text-muted-foreground">2% of transaction fees are permanently burned, reducing total supply over time</p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 mx-auto flex items-center justify-center">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Revenue Share</h3>
                  <p className="text-muted-foreground">50% of protocol revenue is distributed to stakers as additional rewards</p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Growth Fund</h3>
                  <p className="text-muted-foreground">25% of revenue funds ecosystem development and strategic partnerships</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tokenomics;