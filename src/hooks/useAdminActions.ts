import { useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";
import { FLUID_CONTRACT_ADDRESS, parseUsd6, parseTokenAmount } from "@/lib/fluidContract";
import { useToast } from "@/hooks/use-toast";

const getFluidContract = () => {
  return getContract({
    client,
    chain: polygon,
    address: FLUID_CONTRACT_ADDRESS,
  });
};

export const useAdminActions = () => {
  const { toast } = useToast();
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const contract = getFluidContract();

  const executeAction = async (actionName: string, txPromise: Promise<any>) => {
    setActionLoading(actionName);
    try {
      const result = await txPromise;
      toast({
        title: "Transaction Submitted",
        description: `${actionName} transaction sent successfully.`,
      });
      return result;
    } catch (error: any) {
      console.error(`${actionName} error:`, error);
      toast({
        title: "Transaction Failed",
        description: error.message || `Failed to execute ${actionName}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  // Set token price (USD6 format)
  const setPrice = async (priceUsd: string) => {
    const priceUsd6 = parseUsd6(priceUsd);
    const tx = prepareContractCall({
      contract,
      method: "function setPrice(uint256 p)",
      params: [priceUsd6],
    });
    return executeAction("Set Price", sendTransaction(tx));
  };

  // Toggle emergency stop
  const setEmergency = async (stop: boolean) => {
    const tx = prepareContractCall({
      contract,
      method: "function setEmergency(bool s)",
      params: [stop],
    });
    return executeAction(stop ? "Activate Emergency" : "Deactivate Emergency", sendTransaction(tx));
  };

  // Set payment token allowed status
  const setPaymentToken = async (tokenAddress: string, allowed: boolean) => {
    const tx = prepareContractCall({
      contract,
      method: "function setPaymentToken(address t, bool ok)",
      params: [tokenAddress, allowed],
    });
    return executeAction("Set Payment Token", sendTransaction(tx));
  };

  // Set Chainlink price feed
  const setFeed = async (feedAddress: string) => {
    const tx = prepareContractCall({
      contract,
      method: "function setFeed(address f)",
      params: [feedAddress],
    });
    return executeAction("Set Price Feed", sendTransaction(tx));
  };

  // Unlock liquidity pool
  const unlockLiquidity = async () => {
    const tx = prepareContractCall({
      contract,
      method: "function unlockLiquidity()",
      params: [],
    });
    return executeAction("Unlock Liquidity", sendTransaction(tx));
  };

  // Claim liquidity tokens
  const claimLiquidity = async (toAddress: string, amount: string) => {
    const amountWei = parseTokenAmount(amount);
    const tx = prepareContractCall({
      contract,
      method: "function claimLiquidity(address to, uint256 amt)",
      params: [toAddress, amountWei],
    });
    return executeAction("Claim Liquidity", sendTransaction(tx));
  };

  // Send incentive tokens
  const sendIncentive = async (toAddress: string, amount: string) => {
    const amountWei = parseTokenAmount(amount);
    const tx = prepareContractCall({
      contract,
      method: "function sendIncentive(address to, uint256 amt)",
      params: [toAddress, amountWei],
    });
    return executeAction("Send Incentive", sendTransaction(tx));
  };

  // Claim team vested tokens
  const claimTeam = async () => {
    const tx = prepareContractCall({
      contract,
      method: "function claimTeam()",
      params: [],
    });
    return executeAction("Claim Team Tokens", sendTransaction(tx));
  };

  // Claim foundation vested tokens
  const claimFoundation = async () => {
    const tx = prepareContractCall({
      contract,
      method: "function claimFoundation()",
      params: [],
    });
    return executeAction("Claim Foundation Tokens", sendTransaction(tx));
  };

  // Transfer ownership
  const transferOwnership = async (newOwner: string) => {
    const tx = prepareContractCall({
      contract,
      method: "function transferOwnership(address newOwner)",
      params: [newOwner],
    });
    return executeAction("Transfer Ownership", sendTransaction(tx));
  };

  // Renounce ownership (irreversible!)
  const renounceOwnership = async () => {
    const tx = prepareContractCall({
      contract,
      method: "function renounceOwnership()",
      params: [],
    });
    return executeAction("Renounce Ownership", sendTransaction(tx));
  };

  return {
    // Actions
    setPrice,
    setEmergency,
    setPaymentToken,
    setFeed,
    unlockLiquidity,
    claimLiquidity,
    sendIncentive,
    claimTeam,
    claimFoundation,
    transferOwnership,
    renounceOwnership,
    // Loading state
    isPending,
    actionLoading,
  };
};
