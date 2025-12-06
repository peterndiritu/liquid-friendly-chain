import { Card } from "@/components/ui/card";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

const WalletConnection = () => {
  return (
    <Card className="card-glow max-w-md mx-auto p-4 md:p-6 mt-6 md:mt-10 animate-scale-in">
      <div className="text-center space-y-3 md:space-y-4">
        <p className="text-xs md:text-sm text-muted-foreground">Connect your wallet to get started</p>
        <p className="text-[10px] md:text-xs text-muted-foreground">
          Support for MetaMask, Coinbase Wallet, WalletConnect, and more
        </p>
        <div className="flex justify-center">
          <ConnectButton
            client={client}
            connectModal={{
              size: "wide",
              title: "Connect to Fluid Network",
              welcomeScreen: {
                title: "Welcome to Fluid Network",
                subtitle: "Connect your wallet across multiple networks: Ethereum, BSC, Polygon, and more",
              },
            }}
            theme="dark"
          />
        </div>
      </div>
    </Card>
  );
};

export default WalletConnection;
