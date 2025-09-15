import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, Wallet, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const WalletConnection = () => {
  const { 
    isConnected, 
    address, 
    balance, 
    chainId, 
    isLoading,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled 
  } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <Card className="card-glow max-w-md mx-auto p-6 mt-12 animate-scale-in">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Wallet Connected</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-mono text-sm">{formatAddress(address)}</p>
          </div>
          
          {balance && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-medium">{balance} {chainId === '56' ? 'BNB' : 'ETH'}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="text-sm font-medium">
              {chainId === '56' ? 'BSC Mainnet' : 
               chainId === '1' ? 'Ethereum Mainnet' : 
               `Chain ID: ${chainId}`}
            </p>
          </div>
          
          <Button 
            onClick={disconnectWallet}
            variant="outline" 
            className="w-full border-primary/50 text-primary hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
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
          <Button 
            className="w-full button-glow"
            onClick={connectWallet}
            disabled={isLoading || !isMetaMaskInstalled()}
          >
            {isLoading ? (
              "Connecting..."
            ) : !isMetaMaskInstalled() ? (
              "Install MetaMask"
            ) : (
              "Connect Wallet"
            )}
          </Button>
          {!isMetaMaskInstalled() && (
            <p className="text-xs text-muted-foreground">
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Download MetaMask
              </a> to connect your wallet
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WalletConnection;