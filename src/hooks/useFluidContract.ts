import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";
import { FLUID_CONTRACT_ADDRESS } from "@/lib/fluidContract";

// Get the contract instance without typed ABI for flexibility
const getFluidContract = () => {
  return getContract({
    client,
    chain: polygon,
    address: FLUID_CONTRACT_ADDRESS,
  });
};

export const useFluidContract = () => {
  const contract = getFluidContract();

  // Owner and basic info
  const { data: owner, isLoading: ownerLoading, refetch: refetchOwner } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: tokenPriceUsd6, isLoading: priceLoading, refetch: refetchPrice } = useReadContract({
    contract,
    method: "function tokenPriceUsd6() view returns (uint256)",
    params: [],
  });

  const { data: emergencyStop, isLoading: emergencyLoading, refetch: refetchEmergency } = useReadContract({
    contract,
    method: "function emergencyStop() view returns (bool)",
    params: [],
  });

  // Pool allocations
  const { data: presalePool } = useReadContract({
    contract,
    method: "function PRESALE_POOL() view returns (uint256)",
    params: [],
  });

  const { data: airdropPool } = useReadContract({
    contract,
    method: "function AIRDROP_POOL() view returns (uint256)",
    params: [],
  });

  const { data: teamPool } = useReadContract({
    contract,
    method: "function TEAM_POOL() view returns (uint256)",
    params: [],
  });

  const { data: foundPool } = useReadContract({
    contract,
    method: "function FOUND_POOL() view returns (uint256)",
    params: [],
  });

  const { data: liqPool } = useReadContract({
    contract,
    method: "function LIQ_POOL() view returns (uint256)",
    params: [],
  });

  const { data: incPool } = useReadContract({
    contract,
    method: "function INC_POOL() view returns (uint256)",
    params: [],
  });

  const { data: ecoPool } = useReadContract({
    contract,
    method: "function ECO_POOL() view returns (uint256)",
    params: [],
  });

  // Usage stats
  const { data: presaleSold, refetch: refetchPresaleSold } = useReadContract({
    contract,
    method: "function presaleSold() view returns (uint256)",
    params: [],
  });

  const { data: airdropUsed, refetch: refetchAirdropUsed } = useReadContract({
    contract,
    method: "function airdropUsed() view returns (uint256)",
    params: [],
  });

  const { data: incentivesUsed, refetch: refetchIncentivesUsed } = useReadContract({
    contract,
    method: "function incentivesUsed() view returns (uint256)",
    params: [],
  });

  const { data: liquidityClaimed, refetch: refetchLiquidityClaimed } = useReadContract({
    contract,
    method: "function liquidityClaimed() view returns (uint256)",
    params: [],
  });

  const { data: liquidityUnlocked, refetch: refetchLiquidityUnlocked } = useReadContract({
    contract,
    method: "function liquidityUnlocked() view returns (bool)",
    params: [],
  });

  const { data: teamClaimed, refetch: refetchTeamClaimed } = useReadContract({
    contract,
    method: "function teamClaimed() view returns (uint256)",
    params: [],
  });

  const { data: foundationClaimed, refetch: refetchFoundationClaimed } = useReadContract({
    contract,
    method: "function foundationClaimed() view returns (uint256)",
    params: [],
  });

  // Vesting info
  const { data: vestingStart } = useReadContract({
    contract,
    method: "function vestingStart() view returns (uint256)",
    params: [],
  });

  const { data: cliff } = useReadContract({
    contract,
    method: "function CLIFF() view returns (uint256)",
    params: [],
  });

  const { data: vestingDuration } = useReadContract({
    contract,
    method: "function VESTING_DURATION() view returns (uint256)",
    params: [],
  });

  // Chainlink feed
  const { data: nativeUsdFeed, refetch: refetchFeed } = useReadContract({
    contract,
    method: "function nativeUsdFeed() view returns (address)",
    params: [],
  });

  // Wallets
  const { data: ecosystemWallet } = useReadContract({
    contract,
    method: "function ecosystemWallet() view returns (address)",
    params: [],
  });

  const { data: teamWallet } = useReadContract({
    contract,
    method: "function teamWallet() view returns (address)",
    params: [],
  });

  const { data: foundationWallet } = useReadContract({
    contract,
    method: "function foundationWallet() view returns (address)",
    params: [],
  });

  const { data: relayerWallet } = useReadContract({
    contract,
    method: "function relayerWallet() view returns (address)",
    params: [],
  });

  const refetchAll = () => {
    refetchOwner();
    refetchPrice();
    refetchEmergency();
    refetchPresaleSold();
    refetchAirdropUsed();
    refetchIncentivesUsed();
    refetchLiquidityClaimed();
    refetchLiquidityUnlocked();
    refetchTeamClaimed();
    refetchFoundationClaimed();
    refetchFeed();
  };

  return {
    contract,
    // Basic info
    owner: owner as string | undefined,
    tokenPriceUsd6: tokenPriceUsd6 as bigint | undefined,
    emergencyStop: emergencyStop as boolean | undefined,
    // Pool allocations
    presalePool: presalePool as bigint | undefined,
    airdropPool: airdropPool as bigint | undefined,
    teamPool: teamPool as bigint | undefined,
    foundPool: foundPool as bigint | undefined,
    liqPool: liqPool as bigint | undefined,
    incPool: incPool as bigint | undefined,
    ecoPool: ecoPool as bigint | undefined,
    // Usage stats
    presaleSold: presaleSold as bigint | undefined,
    airdropUsed: airdropUsed as bigint | undefined,
    incentivesUsed: incentivesUsed as bigint | undefined,
    liquidityClaimed: liquidityClaimed as bigint | undefined,
    liquidityUnlocked: liquidityUnlocked as boolean | undefined,
    teamClaimed: teamClaimed as bigint | undefined,
    foundationClaimed: foundationClaimed as bigint | undefined,
    // Vesting
    vestingStart: vestingStart as bigint | undefined,
    cliff: cliff as bigint | undefined,
    vestingDuration: vestingDuration as bigint | undefined,
    // Chainlink
    nativeUsdFeed: nativeUsdFeed as string | undefined,
    // Wallets
    ecosystemWallet: ecosystemWallet as string | undefined,
    teamWallet: teamWallet as string | undefined,
    foundationWallet: foundationWallet as string | undefined,
    relayerWallet: relayerWallet as string | undefined,
    // Loading states
    isLoading: ownerLoading || priceLoading || emergencyLoading,
    // Refetch
    refetchAll,
  };
};

// Hook to check if a payment token is allowed
export const useIsPaymentTokenAllowed = (tokenAddress: string) => {
  const contract = getFluidContract();
  
  const { data, isLoading, refetch } = useReadContract({
    contract,
    method: "function allowedPaymentTokens(address) view returns (bool)",
    params: [tokenAddress],
  });

  return {
    isAllowed: data as boolean | undefined,
    isLoading,
    refetch,
  };
};

// Hook to get vested amount
export const useVestedAmount = (total: bigint | undefined, claimed: bigint | undefined) => {
  const contract = getFluidContract();
  
  const { data, isLoading } = useReadContract({
    contract,
    method: "function vested(uint256 total, uint256 claimed) view returns (uint256)",
    params: total && claimed ? [total, claimed] : undefined,
  });

  return {
    vestedAmount: data as bigint | undefined,
    isLoading,
  };
};
