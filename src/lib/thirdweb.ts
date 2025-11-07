import { createThirdwebClient } from "thirdweb";
import { 
  bsc, ethereum, polygon, avalanche, arbitrum, optimism, base,
  fantom, cronos, zkSync, linea, scroll, celo, moonbeam, gnosis, 
  blast, zora
} from "thirdweb/chains";

// Create ThirdWeb client instance
export const client = createThirdwebClient({
  clientId: "f9526bb1508c21f89bdb0762fbee6278",
});

// Supported chains for multi-network trading
export const supportedChains = [
  ethereum,      // Ethereum Mainnet
  bsc,           // Binance Smart Chain
  polygon,       // Polygon (POL/MATIC)
  avalanche,     // Avalanche C-Chain
  arbitrum,      // Arbitrum One
  optimism,      // Optimism
  base,          // Base
  fantom,        // Fantom Opera
  cronos,        // Cronos
  zkSync,        // zkSync Era
  linea,         // Linea
  scroll,        // Scroll
  celo,          // Celo
  moonbeam,      // Moonbeam
  gnosis,        // Gnosis Chain
  blast,         // Blast
  zora,          // Zora
];

// Default chain for initial connection
export const defaultChain = polygon;

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
  // Fantom
  250: {
    USDC: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    USDT: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
  },
  // Cronos
  25: {
    USDC: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
    USDT: "0x66e428c3f67a68878562e79A0234c1F83c208770",
  },
  // zkSync Era
  324: {
    USDC: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    USDT: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",
  },
  // Linea
  59144: {
    USDC: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
    USDT: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
  },
  // Scroll
  534352: {
    USDC: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
  },
  // Celo
  42220: {
    USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
    USDT: "0x617f3112bf5397D0467D315cC709EF968D9ba546",
  },
  // Moonbeam
  1284: {
    USDC: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
    USDT: "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73",
  },
  // Gnosis
  100: {
    USDC: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    USDT: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
  },
  // Mantle
  5000: {
    USDT: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
    USDC: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
  },
} as const;
