import { Button } from "@/components/ui/button";
import liquidChainLogo from "@/assets/liquid-chain-logo.png";
import ExploreDropdown from "./ExploreDropdown";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={liquidChainLogo} 
            alt="Fluid Network Logo" 
            className="w-10 h-10 animate-float"
          />
          <div>
            <h1 className="text-xl font-bold gradient-text">Fluid Network</h1>
            <p className="text-xs text-muted-foreground">FLD Token</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ExploreDropdown />
          <Button className="button-glow animate-glow-pulse">
            Buy FLD
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;