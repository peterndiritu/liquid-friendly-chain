import { createThirdwebClient } from "thirdweb";
import { bsc, ethereum, polygon, avalanche, arbitrum, optimism, base } from "thirdweb/chains";

// Create ThirdWeb client instance
export const client = createThirdwebClient({
  clientId: "f9526bb1508c21f89bdb0762fbee6278",
});

// Supported chains for multi-network trading
export const supportedChains = [
  bsc,           // Binance Smart Chain
  ethereum,      // Ethereum Mainnet
  polygon,       // Polygon (POL/MATIC)
  avalanche,     // Avalanche C-Chain
  arbitrum,      // Arbitrum One
  optimism,      // Optimism
  base,          // Base
];

// Default chain for initial connection
export const defaultChain = bsc;

// Export wallet options for the connect button
export const wallets = [
  "io.metamask",
  "com.coinbase.wallet",
  "walletConnect",
  "me.rainbow",
] as const;

// Token contracts for different chains (ERC20 stablecoins)
export const TOKEN_CONTRACTS = {
  // Ethereum Mainnet
  1: {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  // BSC
  56: {
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  },
  // Polygon
  137: {
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    USDC: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  // Avalanche
  43114: {
    USDT: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    USDC: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  // Arbitrum
  42161: {
    USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  // Optimism
  10: {
    USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    USDC: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  },
  // Base
  8453: {
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
} as const;
