import { useReadContract } from "thirdweb/react";
import { AIRDROP_CONTRACT_ADDRESS, TOTAL_AIRDROP_ALLOCATION } from "@/lib/contracts";
import { client } from "@/lib/thirdweb";
import { defineChain, getContract } from "thirdweb";
import { useEffect, useState } from "react";

export interface AirdropProgress {
  totalAllocation: number;
  totalClaimed: number;
  remainingAllocation: number;
  progressPercentage: number;
  uniqueClaimers: number;
  isLoading: boolean;
  error: string | null;
}

export const useAirdropProgress = () => {
  const [airdropData, setAirdropData] = useState<AirdropProgress>({
    totalAllocation: TOTAL_AIRDROP_ALLOCATION,
    totalClaimed: 0,
    remainingAllocation: TOTAL_AIRDROP_ALLOCATION,
    progressPercentage: 0,
    uniqueClaimers: 0,
    isLoading: true,
    error: null,
  });

  const contract = getContract({
    client,
    chain: defineChain(137), // Polygon Mainnet
    address: AIRDROP_CONTRACT_ADDRESS,
  });

  const { data: totalAllocation, isLoading: isLoadingAllocation, error: allocationError } = useReadContract({
    contract,
    method: "function totalAllocation() view returns (uint256)",
    params: [],
  });

  const { data: totalClaimed, isLoading: isLoadingClaimed, error: claimedError } = useReadContract({
    contract,
    method: "function totalClaimed() view returns (uint256)",
    params: [],
  });

  const { data: remaining, error: remainingError } = useReadContract({
    contract,
    method: "function getRemainingAllocation() view returns (uint256)",
    params: [],
  });

  const { data: claimProgress, error: progressError } = useReadContract({
    contract,
    method: "function getClaimProgress() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    const isLoading = isLoadingAllocation || isLoadingClaimed;
    const hasError = allocationError || claimedError || remainingError || progressError;

    if (hasError) {
      setAirdropData(prev => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch airdrop data from contract",
      }));
      return;
    }

    // FLD uses 18 decimals
    const allocation = totalAllocation ? Number(totalAllocation) / 1e18 : TOTAL_AIRDROP_ALLOCATION;
    const claimed = totalClaimed ? Number(totalClaimed) / 1e18 : 0;
    const remainingAmount = remaining ? Number(remaining) / 1e18 : allocation - claimed;
    // claimProgress returns unique claimers count or percentage
    const claimers = claimProgress ? Number(claimProgress) : 0;
    
    setAirdropData({
      totalAllocation: allocation,
      totalClaimed: claimed,
      remainingAllocation: remainingAmount,
      progressPercentage: allocation > 0 ? (claimed / allocation) * 100 : 0,
      uniqueClaimers: claimers,
      isLoading,
      error: null,
    });
  }, [totalAllocation, totalClaimed, remaining, claimProgress, isLoadingAllocation, isLoadingClaimed, allocationError, claimedError, remainingError, progressError]);

  return airdropData;
};
