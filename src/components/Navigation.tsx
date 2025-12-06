import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fluidLogo from "@/assets/fluid-logo.png";
import ExploreDropdown from "./ExploreDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { ArrowRightLeft, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const MobileNav = () => (
    <div className="flex flex-col space-y-4 p-4">
      <ExploreDropdown />
      <Button
        variant="outline"
        onClick={() => {
          navigate('/dex');
          setOpen(false);
        }}
        className="w-full justify-start"
      >
        <ArrowRightLeft className="w-4 h-4 mr-2" />
        Trade
      </Button>
      <div className="pt-4 border-t border-border">
        <ConnectButton
          client={client}
          connectModal={{
            size: "compact",
          }}
          theme="dark"
        />
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img 
            src={fluidLogo} 
            alt="Fluid Network Logo" 
            className="w-8 h-8 md:w-10 md:h-10 animate-float"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold gradient-text">Fluid Network</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground">FLUID Token</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
