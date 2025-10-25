import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import liquidChainLogo from "@/assets/liquid-chain-logo.png";
import ExploreDropdown from "./ExploreDropdown";
import { ConnectButton, useConnectModal } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
import PurchaseModal from "./PurchaseModal";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenPurchase } from "@/hooks/useTokenPurchase";
import { toast } from "@/hooks/use-toast";
import { ArrowRightLeft } from "lucide-react";

const Navigation = () => {
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const { isConnected } = useWalletStatus();
  const { buyTokens, isLoading: isPurchasing } = useTokenPurchase();
  const { connect } = useConnectModal();
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to purchase tokens",
      });
      connect({ client });
      return;
    }
    setPurchaseModalOpen(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img 
            src={liquidChainLogo} 
            alt="Fluid Network Logo" 
            className="w-10 h-10 animate-float"
          />
          <div>
            <h1 className="text-xl font-bold gradient-text">Fluid Network</h1>
            <p className="text-xs text-muted-foreground">FLD Token</p>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ExploreDropdown />
          <Button
            variant="outline"
            onClick={() => navigate('/dex')}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Trade
          </Button>
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{
              size: "compact",
            }}
            theme="dark"
          />
          <Button className="button-glow animate-glow-pulse" onClick={handleBuyClick}>
            Buy FLD
          </Button>
        </div>
      </div>

      <PurchaseModal
        open={purchaseModalOpen}
        onOpenChange={setPurchaseModalOpen}
        onPurchase={buyTokens}
        isLoading={isPurchasing}
      />
    </nav>
  );
};

export default Navigation;