export interface PaymentToken {
  symbol: string;
  name: string;
  network: string;
  price: number;
  color: string;
  chainId?: number;
}

export const PAYMENT_TOKENS = {
  primary: [
    { symbol: "ETH", name: "Ethereum", network: "ERC-20", price: 3500, color: "blue" },
    { symbol: "BNB", name: "BNB Chain", network: "BEP-20", price: 600, color: "yellow" },
    { symbol: "USDT", name: "Tether", network: "ERC-20", price: 1, color: "green" },
    { symbol: "POL", name: "Polygon", network: "POLYGON", price: 0.90, color: "purple" },
  ],
  secondary: [
    { symbol: "AVAX", name: "Avalanche", network: "C-CHAIN", price: 38, color: "red" },
    { symbol: "USDC", name: "USD Coin", network: "ERC-20", price: 1, color: "blue" },
    { symbol: "ARB", name: "Arbitrum", network: "ARBITRUM", price: 1.2, color: "blue" },
    { symbol: "OP", name: "Optimism", network: "OPTIMISM", price: 2.5, color: "red" },
    { symbol: "FTM", name: "Fantom", network: "FANTOM", price: 0.45, color: "blue" },
    { symbol: "CRO", name: "Cronos", network: "CRONOS", price: 0.08, color: "blue" },
    { symbol: "CELO", name: "Celo", network: "CELO", price: 0.75, color: "yellow" },
    { symbol: "GLMR", name: "Moonbeam", network: "MOONBEAM", price: 0.30, color: "teal" },
  ]
};

export const MIN_PURCHASE_USD = 10;
export const MAX_PURCHASE_USD = 100000;
