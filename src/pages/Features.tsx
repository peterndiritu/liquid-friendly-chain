import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Link2, 
  Shield, 
  Coins, 
  BarChart3, 
  Smartphone,
  Globe,
  Users,
  Lock,
  Layers
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: Zap,
      title: "Ultra-Fast Transactions",
      description: "Experience lightning-fast transactions with up to 1,000,000 TPS and instant finality.",
      benefits: ["Sub-second confirmation", "Zero congestion", "Scalable throughput"]
    },
    {
      icon: Link2,
      title: "Cross-Chain Connectivity",
      description: "Seamlessly bridge assets and data across multiple blockchain networks.",
      benefits: ["Universal compatibility", "Asset portability", "Unified liquidity"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade security with quantum-resistant cryptography and AI-powered threat detection.",
      benefits: ["Quantum resistant", "AI fraud detection", "Multi-layer security"]
    },
    {
      icon: Coins,
      title: "Advanced DeFi",
      description: "Revolutionary DeFi features with automated market makers and yield optimization.",
      benefits: ["Smart AMM", "Auto-yield farming", "Liquidity rewards"]
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Comprehensive analytics dashboard with predictive insights and performance metrics.",
      benefits: ["Live monitoring", "Predictive analytics", "Performance insights"]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for mobile with native apps and progressive web application support.",
      benefits: ["Native mobile apps", "Offline capabilities", "Push notifications"]
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Worldwide node distribution ensuring low latency and high availability globally.",
      benefits: ["Global nodes", "Low latency", "99.99% uptime"]
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Decentralized governance system allowing token holders to participate in decision making.",
      benefits: ["DAO governance", "Voting rights", "Proposal system"]
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Advanced privacy features with zero-knowledge proofs and confidential transactions.",
      benefits: ["Zero-knowledge proofs", "Private transactions", "Data protection"]
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
              <span className="gradient-text">Features</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Explore the revolutionary features that make Fluid Network the future of blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-glow animate-glow-pulse">
                Try Demo
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Feature Comparison
              </Button>
            </div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Core Features</h2>
              <p className="text-xl text-muted-foreground">
                Revolutionary capabilities designed for the next generation of blockchain applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="card-glow p-6 animate-fade-in hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                  </div>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/60 mr-3"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Fluid Network?</h2>
              <p className="text-xl text-muted-foreground">
                See how we compare to traditional blockchain solutions
              </p>
            </div>

            <Card className="card-glow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="text-left p-6 font-semibold">Feature</th>
                      <th className="text-center p-6 font-semibold text-primary">Fluid Network</th>
                      <th className="text-center p-6 font-semibold text-muted-foreground">Traditional Blockchains</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium">Transaction Speed</td>
                      <td className="text-center p-6 text-primary font-semibold">1M+ TPS</td>
                      <td className="text-center p-6 text-muted-foreground">15-3000 TPS</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium">Finality Time</td>
                      <td className="text-center p-6 text-primary font-semibold">&lt; 1 second</td>
                      <td className="text-center p-6 text-muted-foreground">1-60 minutes</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-6 font-medium">Cross-Chain Support</td>
                      <td className="text-center p-6 text-primary font-semibold">Native</td>
                      <td className="text-center p-6 text-muted-foreground">Limited/External</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-medium">Energy Efficiency</td>
                      <td className="text-center p-6 text-primary font-semibold">99% Less Energy</td>
                      <td className="text-center p-6 text-muted-foreground">High Consumption</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;