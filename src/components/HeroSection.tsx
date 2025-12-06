import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import WalletConnection from "./WalletConnection";

const HeroSection = () => {
  const handleBuyClick = () => {
    window.location.href = '/dex';
  };

  const handleClaimClick = () => {
    window.location.href = '/dex';
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-16 md:pt-20">
      <div className="max-w-6xl mx-auto text-center space-y-4 md:space-y-6 lg:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
          <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          <span className="text-xs md:text-sm font-medium text-primary">Next-Generation Blockchain Technology</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-2 md:space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">
            <span className="gradient-text">Fluid Network</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground">
            (FLD)
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-3 md:space-y-4 animate-fade-in">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
            The Future of Blockchain is <span className="gradient-text">Fluid</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            Experience ultra-fast transactions, seamless cross-chain connectivity, and revolutionary DeFi features with our next-generation blockchain ecosystem.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 md:pt-6 lg:pt-8 animate-scale-in">
          <Button 
            size="lg" 
            className="button-glow animate-glow-pulse px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
            onClick={handleBuyClick}
          >
            Buy FLUID Tokens
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
            onClick={handleClaimClick}
          >
            Claim Airdrop
          </Button>
          <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
            Learn More
          </Button>
        </div>

        {/* Wallet Connection Card */}
        <WalletConnection />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-4xl mx-auto pt-8 md:pt-12 lg:pt-16 animate-fade-in">
          <Card className="card-glow p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">1M+</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Transactions per Second</p>
          </Card>
          <Card className="card-glow p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">10M</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Total FLUID Supply</p>
          </Card>
          <Card className="card-glow p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">Multi-Chain</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">Interoperability</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
