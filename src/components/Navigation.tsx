import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fluidLogo from "@/assets/fluid-logo.png";
import ExploreDropdown from "./ExploreDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { ArrowRightLeft } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img 
            src={fluidLogo} 
            alt="Fluid Network Logo" 
            className="w-10 h-10 animate-float"
          />
          <div>
            <h1 className="text-xl font-bold gradient-text">Fluid Network</h1>
            <p className="text-xs text-muted-foreground">FLUID Token</p>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ExploreDropdown />
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={() => navigate('/dex')}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Trade
          </Button>
          <ConnectButton
            client={client}
            connectModal={{
              size: "compact",
            }}
            theme="dark"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;