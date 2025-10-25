import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "@/hooks/use-toast";
import { saveTransaction } from "@/lib/transactionStorage";

export const useAirdropClaim = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState("1000");
  const account = useActiveAccount();

  useEffect(() => {
    const checkEligibility = async () => {
      if (!account) {
        setIsEligible(false);
        return;
      }

      // For MVP: Simulate eligibility check (replace with actual contract call)
      // In production, query the airdrop contract
      setIsEligible(true);
      setIsClaimed(false);
      setClaimableAmount("1000");
    };

    checkEligibility();
  }, [account]);

  const claimAirdrop = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return false;
    }

    if (!isEligible) {
      toast({
        title: "Not Eligible",
        description: "Your wallet is not eligible for the airdrop",
        variant: "destructive",
      });
      return false;
    }

    if (isClaimed) {
      toast({
        title: "Already Claimed",
        description: "You have already claimed your airdrop",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      // For MVP: Simulate claim transaction (replace with actual contract call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsClaimed(true);
      
      // Save transaction to history
      const txHash = '0x' + Math.random().toString(16).slice(2, 66); // Generate mock hash
      saveTransaction({
        hash: txHash,
        type: 'claim',
        amount: claimableAmount,
        timestamp: Date.now(),
        status: 'success',
        from: '0x0000000000000000000000000000000000000000', // Airdrop contract
        to: account.address,
      }, account.address);
      
      toast({
        title: "Airdrop Claimed!",
        description: `Successfully claimed ${claimableAmount} FLD tokens`,
      });
      
      return true;
    } catch (error) {
      console.error("Claim error:", error);
      toast({
        title: "Claim Failed",
        description: error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    claimAirdrop,
    isLoading,
    isEligible,
    isClaimed,
    claimableAmount,
  };
};
