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
      <SelectContent>
        {supportedChains.map(chainOption => (
          <SelectItem key={chainOption.id} value={chainOption.id.toString()}>
            {chainOption.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
