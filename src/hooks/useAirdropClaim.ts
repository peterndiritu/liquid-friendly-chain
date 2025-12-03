import { useState } from "react";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { defineChain, getContract, prepareContractCall, waitForReceipt } from "thirdweb";
import { toast } from "@/hooks/use-toast";
import { saveTransaction, updateTransactionStatus } from "@/lib/transactionStorage";
import { client } from "@/lib/thirdweb";
import { AIRDROP_CONTRACT_ADDRESS } from "@/lib/contracts";
import { TransactionResult } from "@/components/TransactionConfirmationModal";

const POLYGON_CHAIN = defineChain(137);

export const useAirdropClaim = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<TransactionResult | null>(null);
  const account = useActiveAccount();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  const contract = getContract({
    client,
    chain: POLYGON_CHAIN,
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
      
      // Save transaction to history with pending status
      saveTransaction({
        hash: result.transactionHash,
        type: 'claim',
        amount: claimableAmount,
        timestamp: Date.now(),
        status: 'pending',
        from: AIRDROP_CONTRACT_ADDRESS,
        to: account.address,
      }, account.address);

      // Set transaction as submitted immediately for UI feedback
      setLastTransaction({
        success: true,
        hash: result.transactionHash,
        type: 'claim',
        amount: claimableAmount,
        tokenSymbol: 'FLD',
        status: 'submitted',
      });

      // Wait for transaction confirmation
      const receipt = await waitForReceipt({
        client,
        chain: POLYGON_CHAIN,
        transactionHash: result.transactionHash,
      });

      const isSuccess = receipt.status === 'success';

      // Update transaction status in storage
      updateTransactionStatus(account.address, result.transactionHash, {
        status: isSuccess ? 'success' : 'failed',
        blockNumber: Number(receipt.blockNumber),
        gasUsed: receipt.gasUsed?.toString(),
      });

      // Refetch data to update UI
      await Promise.all([
        refetchEligibility(),
        refetchClaimed(),
        refetchClaimable(),
      ]);

      // Update transaction result with confirmation
      setLastTransaction({
        success: isSuccess,
        hash: result.transactionHash,
        type: 'claim',
        amount: claimableAmount,
        tokenSymbol: 'FLD',
        status: isSuccess ? 'confirmed' : 'failed',
        blockNumber: Number(receipt.blockNumber),
        confirmations: 1,
      });

      if (isSuccess) {
        toast({
          title: "Airdrop Claimed!",
          description: `Successfully claimed ${claimableAmount} FLD tokens`,
        });
      } else {
        throw new Error('Claim transaction reverted');
      }
      
      return isSuccess;
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
        status: 'failed',
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
