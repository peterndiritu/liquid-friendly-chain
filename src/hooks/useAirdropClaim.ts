import { useState } from "react";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { toast } from "@/hooks/use-toast";
import { saveTransaction } from "@/lib/transactionStorage";
import { client } from "@/lib/thirdweb";
import { AIRDROP_CONTRACT_ADDRESS } from "@/lib/contracts";
import { TransactionResult } from "@/components/TransactionConfirmationModal";

export const useAirdropClaim = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<TransactionResult | null>(null);
  const account = useActiveAccount();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  const contract = getContract({
    client,
    chain: defineChain(137), // Polygon Mainnet
    address: AIRDROP_CONTRACT_ADDRESS,
  });

  // Check if wallet is eligible for airdrop
  const { data: isEligibleData, refetch: refetchEligibility } = useReadContract({
    contract,
    method: "function isEligible(address account) view returns (bool)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"],
  });

  // Check if wallet has already claimed
  const { data: hasClaimedData, refetch: refetchClaimed } = useReadContract({
    contract,
    method: "function hasClaimed(address account) view returns (bool)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"],
  });

  // Get claimable amount for wallet
  const { data: claimableData, refetch: refetchClaimable } = useReadContract({
    contract,
    method: "function claimableAmount(address account) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"],
  });

  const isEligible = account ? (isEligibleData ?? false) : false;
  const isClaimed = account ? (hasClaimedData ?? false) : false;
  // Convert from wei (18 decimals) to readable format
  const claimableAmount = claimableData ? (Number(claimableData) / 1e18).toFixed(2) : "0";

  const clearLastTransaction = () => setLastTransaction(null);

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
    setLastTransaction(null);

    try {
      // Prepare the claim transaction
      const transaction = prepareContractCall({
        contract,
        method: "function claim() external",
        params: [],
      });

      // Send the transaction
      const result = await sendTransaction(transaction);
      
      // Save transaction to history
      saveTransaction({
        hash: result.transactionHash,
        type: 'claim',
        amount: claimableAmount,
        timestamp: Date.now(),
        status: 'success',
        from: AIRDROP_CONTRACT_ADDRESS,
        to: account.address,
      }, account.address);

      // Refetch data to update UI
      await Promise.all([
        refetchEligibility(),
        refetchClaimed(),
        refetchClaimable(),
      ]);

      // Set successful transaction result
      setLastTransaction({
        success: true,
        hash: result.transactionHash,
        type: 'claim',
        amount: claimableAmount,
        tokenSymbol: 'FLD',
      });

      toast({
        title: "Airdrop Claimed!",
        description: `Successfully claimed ${claimableAmount} FLD tokens`,
      });
      
      return true;
    } catch (error) {
      console.error("Claim error:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Transaction failed";
      
      // Save failed transaction
      saveTransaction({
        hash: '0x' + Math.random().toString(16).slice(2, 66),
        type: 'claim',
        amount: claimableAmount,
        timestamp: Date.now(),
        status: 'failed',
        from: AIRDROP_CONTRACT_ADDRESS,
        to: account.address,
      }, account.address);

      // Set failed transaction result
      setLastTransaction({
        success: false,
        type: 'claim',
        error: errorMessage,
      });

      toast({
        title: "Claim Failed",
        description: errorMessage,
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
    lastTransaction,
    clearLastTransaction,
  };
};
