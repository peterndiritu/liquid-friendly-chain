export interface Token {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  isNative?: boolean;
}

export interface Chain {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  tokens: Token[];
}

export const CHAINS: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    shortName: "ETH",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "DAI", name: "Dai", logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg", price: 1 },
      { symbol: "WBTC", name: "Wrapped BTC", logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg", price: 95000 },
    ]
  },
  {
    id: 56,
    name: "BNB Smart Chain",
    shortName: "BSC",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
    tokens: [
      { symbol: "BNB", name: "BNB", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg", price: 600, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "BUSD", name: "Binance USD", logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg", price: 1 },
      { symbol: "CAKE", name: "PancakeSwap", logo: "https://cryptologos.cc/logos/pancakeswap-cake-logo.svg", price: 2.5 },
    ]
  },
  {
    id: 137,
    name: "Polygon",
    shortName: "POL",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
    tokens: [
      { symbol: "POL", name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg", price: 0.90, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "DAI", name: "Dai", logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg", price: 1 },
      { symbol: "WETH", name: "Wrapped ETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500 },
    ]
  },
  {
    id: 43114,
    name: "Avalanche",
    shortName: "AVAX",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
    tokens: [
      { symbol: "AVAX", name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg", price: 38, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "WAVAX", name: "Wrapped AVAX", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg", price: 38 },
    ]
  },
  {
    id: 42161,
    name: "Arbitrum One",
    shortName: "ARB",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "ARB", name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg", price: 1.2 },
    ]
  },
  {
    id: 10,
    name: "Optimism",
    shortName: "OP",
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "OP", name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg", price: 2.5 },
    ]
  },
  {
    id: 8453,
    name: "Base",
    shortName: "BASE",
    logo: "https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "DAI", name: "Dai", logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg", price: 1 },
    ]
  },
  {
    id: 250,
    name: "Fantom",
    shortName: "FTM",
    logo: "https://cryptologos.cc/logos/fantom-ftm-logo.svg",
    tokens: [
      { symbol: "FTM", name: "Fantom", logo: "https://cryptologos.cc/logos/fantom-ftm-logo.svg", price: 0.45, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
    ]
  },
  {
    id: 25,
    name: "Cronos",
    shortName: "CRO",
    logo: "https://cryptologos.cc/logos/cronos-cro-logo.svg",
    tokens: [
      { symbol: "CRO", name: "Cronos", logo: "https://cryptologos.cc/logos/cronos-cro-logo.svg", price: 0.08, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
    ]
  },
  {
    id: 42220,
    name: "Celo",
    shortName: "CELO",
    logo: "https://cryptologos.cc/logos/celo-celo-logo.svg",
    tokens: [
      { symbol: "CELO", name: "Celo", logo: "https://cryptologos.cc/logos/celo-celo-logo.svg", price: 0.75, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
      { symbol: "cUSD", name: "Celo Dollar", logo: "https://cryptologos.cc/logos/celo-celo-logo.svg", price: 1 },
    ]
  },
  {
    id: 1284,
    name: "Moonbeam",
    shortName: "GLMR",
    logo: "https://cryptologos.cc/logos/moonbeam-glmr-logo.svg",
    tokens: [
      { symbol: "GLMR", name: "Moonbeam", logo: "https://cryptologos.cc/logos/moonbeam-glmr-logo.svg", price: 0.30, isNative: true },
      { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.svg", price: 1 },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
    ]
  },
  {
    id: 324,
    name: "zkSync Era",
    shortName: "zkSync",
    logo: "https://cryptologos.cc/logos/zksync-zks-logo.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
    ]
  },
  {
    id: 59144,
    name: "Linea",
    shortName: "LINEA",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    tokens: [
      { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", price: 3500, isNative: true },
      { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg", price: 1 },
    ]
  },
];

// For backward compatibility
export const PAYMENT_TOKENS = {
  primary: CHAINS[0].tokens.slice(0, 4).map(t => ({ ...t, network: "ERC-20", color: "blue" })),
  secondary: CHAINS.slice(1).flatMap(c => c.tokens.slice(0, 1).map(t => ({ ...t, network: c.name, color: "gray" }))),
};

export const MIN_PURCHASE_USD = 10;
export const MAX_PURCHASE_USD = 100000;
