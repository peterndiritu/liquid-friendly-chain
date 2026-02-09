import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fluidLogo from "@/assets/fluid-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { ArrowRightLeft, Menu, X, Shield, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { DEPLOYER_ADDRESS } from "@/lib/fluidContract";

const Navigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const account = useActiveAccount();
  
  const isAdmin = account?.address?.toLowerCase() === DEPLOYER_ADDRESS.toLowerCase();

  const MobileNav = () => (
    <div className="flex flex-col space-y-4 p-4">
      <Button
        variant="ghost"
        onClick={() => {
          navigate('/resources');
          setOpen(false);
        }}
        className="w-full justify-start"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Docs
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          navigate('/dex');
          setOpen(false);
        }}
        className="w-full justify-start"
      >
        <ArrowRightLeft className="w-4 h-4 mr-2" />
        Trade
      </Button>
      {isAdmin && (
        <Button
          variant="ghost"
          onClick={() => {
            navigate('/admin');
            setOpen(false);
          }}
          className="w-full justify-start"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      )}
      <div className="pt-4 border-t border-border">
        <ConnectButton
          client={client}
          connectModal={{ size: "compact" }}
          theme="dark"
        />
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src={fluidLogo} 
            alt="Fluid" 
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold text-foreground">Fluid</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/resources')}>
            Docs
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dex')}>
            Trade
          </Button>
          {isAdmin && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              Admin
            </Button>
          )}
          <ThemeToggle />
          <ConnectButton
            client={client}
            connectModal={{ size: "compact" }}
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
