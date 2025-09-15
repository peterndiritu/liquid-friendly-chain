import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Cpu, Database, Network, Shield, Gauge } from "lucide-react";

const Technology = () => {
  const techFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Consensus",
      description: "Our proprietary consensus mechanism processes over 1,000,000 transactions per second with sub-second finality.",
      details: ["Proof of Liquid Stake (PoLS)", "Byzantine Fault Tolerant", "Energy Efficient"]
    },
    {
      icon: Cpu,
      title: "Advanced VM Architecture",
      description: "Next-generation virtual machine with parallel execution and smart contract optimization.",
      details: ["EVM Compatible", "Parallel Processing", "Gas Optimization"]
    },
    {
      icon: Database,
      title: "Scalable Storage Layer",
      description: "Distributed storage system with automatic sharding and data compression.",
      details: ["Auto Sharding", "Data Compression", "IPFS Integration"]
    },
    {
      icon: Network,
      title: "Cross-Chain Protocol",
      description: "Native interoperability with major blockchains through our bridge technology.",
      details: ["Universal Bridge", "Asset Wrapping", "State Synchronization"]
    },
    {
      icon: Shield,
      title: "Quantum Security",
      description: "Post-quantum cryptography ensuring long-term security against quantum computing threats.",
      details: ["Quantum Resistant", "Zero-Knowledge Proofs", "Advanced Encryption"]
    },
    {
      icon: Gauge,
      title: "Dynamic Scaling",
      description: "Automatic network scaling based on demand with predictive load balancing.",
      details: ["Auto Scaling", "Load Balancing", "Performance Monitoring"]
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
              <span className="gradient-text">Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Discover the cutting-edge blockchain technology powering Liquid Chain's revolutionary ecosystem
            </p>
            <Button size="lg" className="button-glow animate-glow-pulse">
              Technical Whitepaper
            </Button>
          </div>
        </section>

        {/* Technology Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techFeatures.map((feature, index) => (
                <Card key={index} className="card-glow p-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Network Architecture</h2>
            <Card className="card-glow p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center">
                    <Database className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Storage Layer</h3>
                  <p className="text-sm text-muted-foreground">Distributed data storage with IPFS integration</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Execution Layer</h3>
                  <p className="text-sm text-muted-foreground">Advanced VM with parallel processing</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Consensus Layer</h3>
                  <p className="text-sm text-muted-foreground">Proof of Liquid Stake consensus mechanism</p>
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

export default Technology;