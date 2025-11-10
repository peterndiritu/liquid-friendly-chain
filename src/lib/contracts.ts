// src/lib/contracts.ts
// Smart Contract Configuration for FLD Token and Airdrop
// Polygon Mainnet Configuration

export const FLD_TOKEN_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5"; // Fluid Token (FLD)
export const AIRDROP_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5"; // Airdrop Contract
export const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5"; // Presale Contract
export const USDT_CONTRACT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // Polygon USDT

// Token Configuration
export const FLD_PRICE_USD = 1.0;
export const MIN_PURCHASE_MATIC = 1;
export const MAX_PURCHASE_MATIC = 110000000;
export const SALE_HARD_CAP = 100000;
export const SALE_SOFT_CAP = 10000;
export const TOTAL_AIRDROP_ALLOCATION = 3000000;
export const USDT_DECIMALS = 6;
export const FLD_DECIMALS = 18;
export const FLD_SYMBOL = "FLD";

// Polygon Chain Configuration
export const POLYGON_MAINNET = {
  chainId: 137,
  rpc: ["https://polygon-rpc.com"],
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  shortName: "matic",
  slug: "polygon",
  testnet: false,
  name: "Polygon Mainnet",
};

// ERC20 ABI
export const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
] as const;

// Presale ABI
export const PRESALE_ABI = [
  "function totalUSDTRaised() view returns (uint256)",
  "function totalFLDSold() view returns (uint256)",
  "function hardCap() view returns (uint256)",
  "function softCap() view returns (uint256)",
  "function saleActive() view returns (bool)",
  "function getUserPurchaseAmount(address account) view returns (uint256)",
  "function buyWithUSDT(uint256 amount) external",
  "event TokensPurchased(address indexed buyer, uint256 usdtAmount, uint256 fldAmount)",
] as const;

// Airdrop ABI
export const AIRDROP_ABI = [
  "function claim() external",
  "function hasClaimed(address account) view returns (bool)",
  "function isEligible(address account) view returns (bool)",
  "function claimableAmount(address account) view returns (uint256)",
  "function totalAllocation() view returns (uint256)",
  "function totalClaimed() view returns (uint256)",
  "function getRemainingAllocation() view returns (uint256)",
  "function getClaimProgress() view returns (uint256)",
  "event TokensClaimed(address indexed claimer, uint256 amount)",
] as const;

// Combined Exports (optional)
export const CONTRACTS = {
  token: { address: FLD_TOKEN_ADDRESS, abi: ERC20_ABI },
  presale: { address: PRESALE_CONTRACT_ADDRESS, abi: PRESALE_ABI },
  airdrop: { address: AIRDROP_CONTRACT_ADDRESS, abi: AIRDROP_ABI },
  usdt: { address: USDT_CONTRACT_ADDRESS, abi: ERC20_ABI },
};