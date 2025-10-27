import { useActiveAccount, useActiveWallet, useActiveWalletChain } from "thirdweb/react";

export const useWalletStatus = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const chain = useActiveWalletChain();

  return {
    isConnected: !!account,
    address: account?.address,
    wallet,
    chain,
    chainId: chain?.id,
    chainName: chain?.name,
  };
};
