import { createThirdwebClient } from "thirdweb";
import { bsc } from "thirdweb/chains";

// Create ThirdWeb client instance
export const client = createThirdwebClient({
  clientId: "f9526bb1508c21f89bdb0762fbee6278",
});

// Configure BSC (Binance Smart Chain) as the default chain
export const chain = bsc;

// Export wallet options for the connect button
export const wallets = [
  "io.metamask",
  "com.coinbase.wallet",
  "walletConnect",
  "me.rainbow",
] as const;
