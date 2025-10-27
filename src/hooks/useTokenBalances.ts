import { useState, useEffect } from "react";
import { useActiveAccount, useWalletBalance, useReadContract } from "thirdweb/react";
import { useWalletStatus } from "./useWalletStatus";
import { client, TOKEN_CONTRACTS } from "@/lib/thirdweb";
import { getContract } from "thirdweb";
import { balanceOf, decimals } from "thirdweb/extensions/erc20";

export interface TokenBalance {
  symbol: string;
  balance: string;
  address?: string;
  type: 'native' | 'ERC20';
}

export const useTokenBalances = () => {
  const account = useActiveAccount();
  const { chain } = useWalletStatus();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get native token balance (ETH, BNB, MATIC, etc.)
  const { data: nativeBalance, isLoading: isLoadingNative } = useWalletBalance({
    client,
    chain: chain!,
    address: account?.address,
  });

  useEffect(() => {
    const fetchBalances = async () => {
      if (!account || !chain) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const chainId = chain.id as keyof typeof TOKEN_CONTRACTS;
        const tokens = TOKEN_CONTRACTS[chainId] || {};
        
        const tokenBalances: TokenBalance[] = [];

        // Add native token balance
        if (nativeBalance) {
          tokenBalances.push({
            symbol: nativeBalance.symbol,
            balance: nativeBalance.displayValue,
            type: 'native',
          });
        }

        // Fetch ERC20 token balances
        for (const [symbol, address] of Object.entries(tokens)) {
          try {
            const contract = getContract({
              client,
              chain,
              address: address as string,
            });

            const [balance, tokenDecimals] = await Promise.all([
              balanceOf({ contract, address: account.address }),
              decimals({ contract }),
            ]);

            const formattedBalance = (Number(balance) / Math.pow(10, tokenDecimals)).toFixed(6);

            tokenBalances.push({
              symbol,
              balance: formattedBalance,
              address: address as string,
              type: 'ERC20',
            });
          } catch (error) {
            console.error(`Failed to fetch balance for ${symbol}:`, error);
          }
        }

        setBalances(tokenBalances);
      } catch (error) {
        console.error("Failed to fetch token balances:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [account, chain, nativeBalance]);

  const refresh = () => {
    if (account && chain) {
      setIsLoading(true);
    }
  };

  return { balances, isLoading: isLoading || isLoadingNative, refresh };
};
