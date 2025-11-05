// Smart Contract Configuration for FLD Token and Airdrop
// Update these addresses when contracts are deployed to BSC mainnet

export const FLD_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const AIRDROP_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const PRESALE_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT

// FLD Token Price (in USD)
export const FLD_PRICE_USD = 1.00;

// Minimum and Maximum purchase amounts (in BNB)
export const MIN_PURCHASE_BNB = 0.1;
export const MAX_PURCHASE_BNB = 10;

// Sale Configuration
export const SALE_HARD_CAP = 1000000; // $1M USDT
export const SALE_SOFT_CAP = 100000; // $100K USDT
export const TOTAL_AIRDROP_ALLOCATION = 5000000; // 5M FLD tokens

// Simplified ERC20 ABI for token operations
export const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
] as const;

// Presale Contract ABI
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

// Airdrop Contract ABI
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
