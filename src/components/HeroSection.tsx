import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Link, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Next-Generation Blockchain Technology</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold">
            <span className="gradient-text">Liquid Chain</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground">
            (LQD)
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            The Future of Blockchain is <span className="gradient-text">Fluid</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience ultra-fast transactions, seamless cross-chain connectivity, and revolutionary DeFi features with our next-generation blockchain ecosystem.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-scale-in">
          <Button size="lg" className="button-glow animate-glow-pulse px-8 py-4 text-lg">
            Buy LQD Tokens
          </Button>
          <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg">
            Claim Airdrop
          </Button>
          <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-primary px-8 py-4 text-lg">
            Learn More
          </Button>
        </div>

        {/* Wallet Connection Card */}
        <Card className="card-glow max-w-md mx-auto p-6 mt-12 animate-scale-in">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Connect your wallet to get started</p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Link className="w-5 h-5" />
                <span className="font-medium">Connect Wallet</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Connect to BSC network to interact with Liquid Chain
              </p>
              <Button className="w-full button-glow">
                Connect Wallet
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-16 animate-fade-in">
          <Card className="card-glow p-6 text-center">
            <div className="text-3xl font-bold gradient-text">1M+</div>
            <p className="text-sm text-muted-foreground mt-2">Transactions per Second</p>
          </Card>
          <Card className="card-glow p-6 text-center">
            <div className="text-3xl font-bold gradient-text">10M</div>
            <p className="text-sm text-muted-foreground mt-2">Total LQD Supply</p>
          </Card>
          <Card className="card-glow p-6 text-center">
            <div className="text-3xl font-bold gradient-text">Multi-Chain</div>
            <p className="text-sm text-muted-foreground mt-2">Interoperability</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;