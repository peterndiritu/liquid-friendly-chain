import { Card } from "@/components/ui/card";
import { ConnectButton } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";

const WalletConnection = () => {
  return (
    <Card className="card-glow max-w-md mx-auto p-6 mt-12 animate-scale-in">
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">Connect your wallet to get started</p>
        <p className="text-xs text-muted-foreground">
          Support for MetaMask, Coinbase Wallet, WalletConnect, and more
        </p>
        <div className="flex justify-center">
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{
              size: "wide",
              title: "Connect to Fluid Network",
              welcomeScreen: {
                title: "Welcome to Fluid Network",
                subtitle: "Connect your wallet to interact with BSC",
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