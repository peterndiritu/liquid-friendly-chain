import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Code2,
  Database,
  Network,
  Cpu,
  Layers,
  GitBranch
} from "lucide-react";

const TechnologySection = () => {
  const techFeatures = [
    {
      icon: Code2,
      title: "Advanced Smart Contracts",
      description: "EVM-compatible with enhanced capabilities for complex DeFi protocols and dApps."
    },
    {
      icon: Database,
      title: "Distributed Ledger",
      description: "Sharded architecture enabling massive scalability while maintaining decentralization."
    },
    {
      icon: Network,
      title: "Cross-Chain Bridges",
      description: "Native interoperability protocols for seamless asset transfers across networks."
    },
    {
      icon: Cpu,
      title: "Quantum-Resistant",
      description: "Post-quantum cryptographic algorithms ensuring long-term security resilience."
    },
    {
      icon: Layers,
      title: "Layer 2 Solutions",
      description: "Integrated scaling solutions for instant microtransactions and gaming applications."
    },
    {
      icon: GitBranch,
      title: "Governance Protocol",
      description: "Decentralized autonomous organization for community-driven protocol evolution."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Built on cutting-edge blockchain infrastructure with innovative consensus mechanisms, 
            advanced cryptographic protocols, and scalable architecture designed for the future of finance.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="card-glow p-8 group hover:scale-105 transition-all duration-300 animate-fade-in border-l-4 border-l-primary/50"
            >
              <div className="flex items-start space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance Stats */}
        <Card className="card-glow p-8 mb-12 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">1,000,000</div>
              <p className="text-sm text-muted-foreground">Transactions/Second</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">&lt;100ms</div>
              <p className="text-sm text-muted-foreground">Block Finality</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">$0.001</div>
              <p className="text-sm text-muted-foreground">Average Gas Fee</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">99.99%</div>
              <p className="text-sm text-muted-foreground">Network Uptime</p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Ready to Experience the Future?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers and users building the next generation of decentralized applications on Fluid Network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="button-glow animate-glow-pulse">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;