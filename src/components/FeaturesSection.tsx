import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Link2, 
  DollarSign, 
  Shield, 
  Wifi, 
  Brain,
  Leaf,
  Globe,
  Lock,
  TrendingUp,
  Users,
  Target
} from "lucide-react";

const FeaturesSection = () => {
  const coreFeatures = [
    {
      icon: Zap,
      title: "Ultra-Fast Transactions",
      subtitle: "1M TPS",
      description: "Up to 1,000,000 TPS, ensuring instant settlement and zero congestion."
    },
    {
      icon: Link2,
      title: "Cross-Chain Connectivity", 
      subtitle: "Multi-Chain",
      description: "Natively bridges to Ethereum, BNB Chain, Solana, and other major blockchains."
    },
    {
      icon: DollarSign,
      title: "Liquidity Enhancement",
      subtitle: "DeFi Ready", 
      description: "Built-in mechanisms to boost trading depth, minimize slippage, and maximize DeFi potential."
    },
    {
      icon: Shield,
      title: "Next-Level Security",
      subtitle: "Quantum Safe",
      description: "AI-driven fraud detection, quantum-resistant cryptography, and advanced consensus protocols."
    },
    {
      icon: Wifi,
      title: "Offline-Ready Technology", 
      subtitle: "Offline Ready",
      description: "Supports mesh networks and light node transactions, enabling transfers even in low-connectivity regions."
    },
    {
      icon: Brain,
      title: "Smart AI Integration",
      subtitle: "AI Powered", 
      description: "Automated market makers, AI-powered yield optimizers, and predictive analytics for trading strategies."
    }
  ];

  const additionalFeatures = [
    { icon: Leaf, title: "Green & Sustainable", subtitle: "Eco-Friendly" },
    { icon: Globe, title: "Global Accessibility", subtitle: "Worldwide" },
    { icon: Lock, title: "Enterprise Security", subtitle: "Bank-Grade" },
    { icon: TrendingUp, title: "Yield Optimization", subtitle: "High APY" },
    { icon: Users, title: "Community Driven", subtitle: "Decentralized" },
    { icon: Target, title: "Precision Trading", subtitle: "Low Slippage" }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Core <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fluid Network combines cutting-edge blockchain technology with innovative features to create the most advanced decentralized ecosystem.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="card-glow p-8 text-center group hover:scale-105 transition-transform duration-300 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-lg font-bold gradient-text mb-2">{feature.subtitle}</div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="card-glow p-6 text-center group hover:scale-105 transition-transform duration-300 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-bold gradient-text mb-1">{feature.subtitle}</div>
              <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;