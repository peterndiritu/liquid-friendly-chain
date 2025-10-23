import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export const useWalletStatus = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  return {
    isConnected: !!account,
    address: account?.address,
    wallet,
  };
};
