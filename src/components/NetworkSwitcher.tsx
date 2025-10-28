import { useSwitchActiveWalletChain } from "thirdweb/react";
import { supportedChains } from "@/lib/thirdweb";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const NetworkSwitcher = () => {
  const { chain } = useWalletStatus();
  const switchChain = useSwitchActiveWalletChain();
  const { toast } = useToast();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleChainSwitch = async (chainId: string) => {
    const targetChain = supportedChains.find(c => c.id.toString() === chainId);
    if (!targetChain || chain?.id.toString() === chainId) return;

    try {
      setIsSwitching(true);
      await switchChain(targetChain);
      toast({
        title: "Network Switched",
        description: `Successfully switched to ${targetChain.name}`,
      });
    } catch (error: any) {
      console.error("Network switch failed:", error);
      if (error.code === 4001) {
        toast({
          title: "Switch Cancelled",
          description: "You rejected the network switch request",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Switch Failed",
          description: "Failed to switch network. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <Select 
      value={chain?.id.toString()} 
      onValueChange={handleChainSwitch}
      disabled={isSwitching}
    >
      <SelectTrigger className="w-[200px]">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          Layer 1 Networks
        </div>
        <SelectItem value="1">Ethereum Mainnet</SelectItem>
        <SelectItem value="56">BNB Smart Chain</SelectItem>
        <SelectItem value="43114">Avalanche C-Chain</SelectItem>
        <SelectItem value="250">Fantom Opera</SelectItem>
        <SelectItem value="25">Cronos</SelectItem>
        <SelectItem value="42220">Celo</SelectItem>
        <SelectItem value="1284">Moonbeam</SelectItem>
        <SelectItem value="100">Gnosis Chain</SelectItem>
        
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
          Layer 2 Networks
        </div>
        <SelectItem value="137">Polygon</SelectItem>
        <SelectItem value="42161">Arbitrum One</SelectItem>
        <SelectItem value="10">Optimism</SelectItem>
        <SelectItem value="8453">Base</SelectItem>
        <SelectItem value="324">zkSync Era</SelectItem>
        <SelectItem value="59144">Linea</SelectItem>
        <SelectItem value="534352">Scroll</SelectItem>
        <SelectItem value="81457">Blast</SelectItem>
        <SelectItem value="7777777">Zora</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
