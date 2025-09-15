import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Link2, 
  ArrowLeftRight, 
  Globe, 
  Zap, 
  Shield, 
  Coins,
  Network,
  Layers,
  Timer,
  CheckCircle
} from "lucide-react";

const CrossChain = () => {
  const supportedNetworks = [
    { name: "Ethereum", symbol: "ETH", status: "Live", color: "bg-blue-500" },
    { name: "BNB Chain", symbol: "BNB", status: "Live", color: "bg-yellow-500" },
    { name: "Solana", symbol: "SOL", status: "Live", color: "bg-purple-500" },
    { name: "Polygon", symbol: "MATIC", status: "Live", color: "bg-indigo-500" },
    { name: "Avalanche", symbol: "AVAX", status: "Live", color: "bg-red-500" },
    { name: "Cardano", symbol: "ADA", status: "Coming Soon", color: "bg-blue-600" },
    { name: "Polkadot", symbol: "DOT", status: "Coming Soon", color: "bg-pink-500" },
    { name: "Cosmos", symbol: "ATOM", status: "Coming Soon", color: "bg-gray-500" }
  ];

  const bridgeFeatures = [
    {
      icon: Zap,
      title: "Instant Bridging",
      description: "Lightning-fast cross-chain transactions with sub-second confirmation times.",
      metrics: ["< 1 second", "99.99% uptime", "No slippage"]
    },
    {
      icon: Shield,
      title: "Secure Transfers",
      description: "Military-grade security with multi-signature validation and fraud protection.",
      metrics: ["Multi-sig validation", "Fraud detection", "Insurance coverage"]
    },
    {
      icon: Coins,
      title: "Universal Assets",
      description: "Bridge any asset across supported networks with automatic wrapping and unwrapping.",
      metrics: ["Any asset type", "Auto wrapping", "Native tokens"]
    },
    {
      icon: Globe,
      title: "Global Liquidity",
      description: "Access unified liquidity pools across all connected blockchain networks.",
      metrics: ["Unified pools", "Best rates", "Deep liquidity"]
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
              <span className="gradient-text">Cross-Chain</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Seamlessly bridge assets and data across multiple blockchain networks with instant finality and zero slippage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-glow animate-glow-pulse">
                Start Bridging
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Bridge Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Supported Networks */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Supported Networks</h2>
              <p className="text-xl text-muted-foreground">
                Bridge assets across major blockchain ecosystems with native interoperability
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {supportedNetworks.map((network, index) => (
                <Card key={index} className="card-glow p-6 text-center animate-fade-in hover:scale-105 transition-transform">
                  <div className={`w-16 h-16 rounded-full ${network.color} mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{network.symbol}</span>
                  </div>
                  <h3 className="font-bold mb-2">{network.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    {network.status === "Live" ? 
                      <CheckCircle className="w-4 h-4 text-green-500" /> :
                      <Timer className="w-4 h-4 text-yellow-500" />
                    }
                    <span className={`text-sm ${network.status === "Live" ? "text-green-500" : "text-yellow-500"}`}>
                      {network.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bridge Features */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Bridge Features</h2>
              <p className="text-xl text-muted-foreground">
                Advanced cross-chain technology for seamless multi-network operations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bridgeFeatures.map((feature, index) => (
                <Card key={index} className="card-glow p-8 animate-fade-in">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {feature.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-medium text-primary">{metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bridge Process */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Simple, secure, and instant cross-chain asset transfers
              </p>
            </div>

            <Card className="card-glow p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-bold mb-2">Select Networks</h3>
                  <p className="text-sm text-muted-foreground">Choose source and destination blockchain networks</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-bold mb-2">Lock Assets</h3>
                  <p className="text-sm text-muted-foreground">Assets are securely locked in smart contracts</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-bold mb-2">Verify Transfer</h3>
                  <p className="text-sm text-muted-foreground">Multi-signature validation confirms the transaction</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="font-bold mb-2">Mint/Release</h3>
                  <p className="text-sm text-muted-foreground">Wrapped assets are minted on destination network</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Bridge Stats */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <Card className="card-glow p-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">$2.5B</div>
                  <p className="text-muted-foreground">Total Value Bridged</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">1M+</div>
                  <p className="text-muted-foreground">Successful Transfers</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">8</div>
                  <p className="text-muted-foreground">Supported Networks</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">&lt;1s</div>
                  <p className="text-muted-foreground">Average Bridge Time</p>
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

export default CrossChain;