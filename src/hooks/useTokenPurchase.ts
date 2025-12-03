import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { toast } from "@/hooks/use-toast";
import { saveTransaction } from "@/lib/transactionStorage";
import { FLD_PRICE_USD, PRESALE_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "@/lib/contracts";
import { client } from "@/lib/thirdweb";
import { TransactionResult } from "@/components/TransactionConfirmationModal";

// Token prices (approximate USD values) for conversion calculations
const TOKEN_PRICES: Record<string, number> = {
  ETH: 3500,
  BNB: 600,
  MATIC: 0.90,
  POL: 0.90,
  AVAX: 38,
  USDT: 1,
  USDC: 1,
};

// Token decimals mapping
const TOKEN_DECIMALS: Record<string, number> = {
  USDT: 6, // USDT on Polygon uses 6 decimals
  USDC: 6,
  ETH: 18,
  BNB: 18,
  MATIC: 18,
  POL: 18,
  AVAX: 18,
};

export const useTokenPurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<TransactionResult | null>(null);
  const account = useActiveAccount();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  const clearLastTransaction = () => setLastTransaction(null);

  const buyTokens = async (tokenAmount: number, tokenSymbol: string = "USDT") => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    setLastTransaction(null);
    
    try {
      // Calculate FLD amount based on token price and FLD price
      const tokenPriceUSD = TOKEN_PRICES[tokenSymbol] || 1;
      const usdAmount = tokenAmount * tokenPriceUSD;
      const fldAmount = (usdAmount / FLD_PRICE_USD).toFixed(2);
      
      // Get decimals for the token
      const decimals = TOKEN_DECIMALS[tokenSymbol] || 18;
      const amountInWei = BigInt(Math.floor(tokenAmount * Math.pow(10, decimals)));

      // For USDT purchases on Polygon
      if (tokenSymbol === "USDT" || tokenSymbol === "USDC") {
        const usdtContract = getContract({
          client,
          chain: defineChain(137), // Polygon Mainnet
          address: USDT_CONTRACT_ADDRESS,
        });

        const presaleContract = getContract({
          client,
          chain: defineChain(137),
          address: PRESALE_CONTRACT_ADDRESS,
        });

        // Step 1: Approve USDT spending
        toast({
          title: "Approval Required",
          description: "Please approve USDT spending in your wallet",
        });

        const approveTransaction = prepareContractCall({
          contract: usdtContract,
          method: "function approve(address spender, uint256 amount) returns (bool)",
          params: [PRESALE_CONTRACT_ADDRESS, amountInWei],
        });

        const approvalResult = await sendTransaction(approveTransaction);
        
        // Save approval transaction
        saveTransaction({
          hash: approvalResult.transactionHash,
          type: 'approve',
          amount: tokenAmount.toString(),
          timestamp: Date.now(),
          status: 'success',
          from: account.address,
          to: USDT_CONTRACT_ADDRESS,
        }, account.address);

        toast({
          title: "Approval Successful",
          description: "Now purchasing FLD tokens...",
        });

        // Step 2: Buy tokens from presale contract
        const buyTransaction = prepareContractCall({
          contract: presaleContract,
          method: "function buyWithUSDT(uint256 amount) external",
          params: [amountInWei],
        });

        const purchaseResult = await sendTransaction(buyTransaction);
        
        // Save purchase transaction
        saveTransaction({
          hash: purchaseResult.transactionHash,
          type: 'purchase',
          amount: fldAmount,
          timestamp: Date.now(),
          status: 'success',
          from: account.address,
          to: PRESALE_CONTRACT_ADDRESS,
        }, account.address);

        // Set successful transaction result
        setLastTransaction({
          success: true,
          hash: purchaseResult.transactionHash,
          type: 'purchase',
          amount: fldAmount,
          tokenSymbol: 'FLD',
        });

        toast({
          title: "Purchase Successful!",
          description: `Successfully purchased ${fldAmount} FLD tokens with ${tokenAmount} ${tokenSymbol}`,
        });
        
        return true;
      } else {
        // For native token purchases (ETH, MATIC, BNB, etc.)
        toast({
          title: "Payment Method Not Supported",
          description: "Currently only USDT and USDC purchases are supported. Please select USDT or USDC.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Purchase error:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Transaction failed";
      
      // Save failed transaction
      if (account) {
        saveTransaction({
          hash: '0x' + Math.random().toString(16).slice(2, 66),
          type: 'purchase',
          amount: '0',
          timestamp: Date.now(),
          status: 'failed',
          from: account.address,
          to: PRESALE_CONTRACT_ADDRESS,
        }, account.address);
      }

      // Set failed transaction result
      setLastTransaction({
        success: false,
        type: 'purchase',
        error: errorMessage,
      });

      toast({
        title: "Purchase Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buyTokens,
    isLoading,
    lastTransaction,
    clearLastTransaction,
  };
};
