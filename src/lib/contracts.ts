// Smart Contract Configuration for FLD Token and Airdrop
// Update these addresses when contracts are deployed to BSC mainnet

export const FLD_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const AIRDROP_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

// FLD Token Price (in USD)
export const FLD_PRICE_USD = 2.50;

// Minimum and Maximum purchase amounts (in BNB)
export const MIN_PURCHASE_BNB = 0.1;
export const MAX_PURCHASE_BNB = 10;

// Simplified ERC20 ABI for token operations
export const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
] as const;

// Airdrop Contract ABI
export const AIRDROP_ABI = [
  "function claim() external",
  "function hasClaimed(address account) view returns (bool)",
  "function isEligible(address account) view returns (bool)",
  "function claimableAmount(address account) view returns (uint256)",
] as const;
