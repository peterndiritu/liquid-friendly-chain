import { useReadContract } from "thirdweb/react";
import { PRESALE_CONTRACT_ADDRESS, SALE_HARD_CAP, SALE_SOFT_CAP } from "@/lib/contracts";
import { client } from "@/lib/thirdweb";
import { defineChain, getContract } from "thirdweb";
import { useEffect, useState } from "react";

export interface SalesProgress {
  totalUSDTRaised: number;
  totalFLDSold: number;
  hardCap: number;
  softCap: number;
  progressPercentage: number;
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useSalesProgress = () => {
  const [salesData, setSalesData] = useState<SalesProgress>({
    totalUSDTRaised: 0,
    totalFLDSold: 0,
    hardCap: SALE_HARD_CAP,
    softCap: SALE_SOFT_CAP,
    progressPercentage: 0,
    isActive: true,
    isLoading: true,
    error: null,
  });

  const contract = getContract({
    client,
    chain: defineChain(137), // Polygon Mainnet
    address: PRESALE_CONTRACT_ADDRESS,
  });

  const { data: totalRaised, isLoading: isLoadingRaised, error: raisedError } = useReadContract({
    contract,
    method: "function totalUSDTRaised() view returns (uint256)",
    params: [],
  });

  const { data: totalSold, isLoading: isLoadingSold, error: soldError } = useReadContract({
    contract,
    method: "function totalFLDSold() view returns (uint256)",
    params: [],
  });

  const { data: isActive, isLoading: isLoadingActive, error: activeError } = useReadContract({
    contract,
    method: "function saleActive() view returns (bool)",
    params: [],
  });

  const { data: hardCapData, error: hardCapError } = useReadContract({
    contract,
    method: "function hardCap() view returns (uint256)",
    params: [],
  });

  const { data: softCapData, error: softCapError } = useReadContract({
    contract,
    method: "function softCap() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    const isLoading = isLoadingRaised || isLoadingSold || isLoadingActive;
    const hasError = raisedError || soldError || activeError || hardCapError || softCapError;

    if (hasError) {
      setSalesData(prev => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch presale data from contract",
      }));
      return;
    }

    // USDT on Polygon uses 6 decimals
    const raised = totalRaised ? Number(totalRaised) / 1e6 : 0;
    const sold = totalSold ? Number(totalSold) / 1e18 : 0; // FLD uses 18 decimals
    const cap = hardCapData ? Number(hardCapData) / 1e6 : SALE_HARD_CAP;
    const soft = softCapData ? Number(softCapData) / 1e6 : SALE_SOFT_CAP;
    
    setSalesData({
      totalUSDTRaised: raised,
      totalFLDSold: sold,
      hardCap: cap,
      softCap: soft,
      progressPercentage: cap > 0 ? (raised / cap) * 100 : 0,
      isActive: isActive ?? true,
      isLoading,
      error: null,
    });
  }, [totalRaised, totalSold, hardCapData, softCapData, isActive, isLoadingRaised, isLoadingSold, isLoadingActive, raisedError, soldError, activeError, hardCapError, softCapError]);

  return salesData;
};
