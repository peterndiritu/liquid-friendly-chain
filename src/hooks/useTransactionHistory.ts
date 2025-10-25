import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getTransactions, Transaction } from "@/lib/transactionStorage";

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const account = useActiveAccount();

  const loadTransactions = () => {
    if (!account?.address) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const txHistory = getTransactions(account.address);
      setTransactions(txHistory);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadTransactions, 30000);
    return () => clearInterval(interval);
  }, [account?.address]);

  const refreshHistory = () => {
    loadTransactions();
  };

  return {
    transactions,
    isLoading,
    refreshHistory,
  };
};
