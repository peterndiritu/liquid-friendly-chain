import { useState, useEffect, useCallback } from "react";
import { waitForReceipt } from "thirdweb";
import { defineChain } from "thirdweb";
import { client } from "@/lib/thirdweb";

export type TransactionStatus = 'pending' | 'submitted' | 'confirming' | 'confirmed' | 'failed';

interface TransactionStatusResult {
  status: TransactionStatus;
  confirmations: number;
  blockNumber: number | null;
  error: string | null;
}

const REQUIRED_CONFIRMATIONS = 3;
const POLYGON_CHAIN = defineChain(137);

export const useTransactionStatus = (txHash: string | null) => {
  const [result, setResult] = useState<TransactionStatusResult>({
    status: 'pending',
    confirmations: 0,
    blockNumber: null,
    error: null,
  });

  const checkStatus = useCallback(async () => {
    if (!txHash) return;

    try {
      setResult(prev => ({ ...prev, status: 'submitted' }));

      // Wait for the transaction receipt
      const receipt = await waitForReceipt({
        client,
        chain: POLYGON_CHAIN,
        transactionHash: txHash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        setResult({
          status: 'confirming',
          confirmations: 1,
          blockNumber: Number(receipt.blockNumber),
          error: null,
        });

        // Poll for additional confirmations
        let currentConfirmations = 1;
        const pollInterval = setInterval(async () => {
          try {
            // Get current block number to calculate confirmations
            const response = await fetch('https://polygon-rpc.com/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1,
              }),
            });
            const data = await response.json();
            const currentBlock = parseInt(data.result, 16);
            currentConfirmations = currentBlock - Number(receipt.blockNumber) + 1;

            if (currentConfirmations >= REQUIRED_CONFIRMATIONS) {
              clearInterval(pollInterval);
              setResult({
                status: 'confirmed',
                confirmations: currentConfirmations,
                blockNumber: Number(receipt.blockNumber),
                error: null,
              });
            } else {
              setResult(prev => ({
                ...prev,
                status: 'confirming',
                confirmations: Math.min(currentConfirmations, REQUIRED_CONFIRMATIONS),
              }));
            }
          } catch (err) {
            console.error('Error polling confirmations:', err);
          }
        }, 2000); // Poll every 2 seconds

        // Cleanup after max 30 seconds
        setTimeout(() => {
          clearInterval(pollInterval);
          setResult(prev => ({
            ...prev,
            status: prev.status === 'confirming' ? 'confirmed' : prev.status,
            confirmations: REQUIRED_CONFIRMATIONS,
          }));
        }, 30000);

      } else {
        setResult({
          status: 'failed',
          confirmations: 0,
          blockNumber: Number(receipt.blockNumber),
          error: 'Transaction reverted',
        });
      }
    } catch (error) {
      console.error('Error checking transaction status:', error);
      setResult({
        status: 'failed',
        confirmations: 0,
        blockNumber: null,
        error: error instanceof Error ? error.message : 'Failed to get transaction status',
      });
    }
  }, [txHash]);

  useEffect(() => {
    if (txHash) {
      checkStatus();
    } else {
      setResult({
        status: 'pending',
        confirmations: 0,
        blockNumber: null,
        error: null,
      });
    }
  }, [txHash, checkStatus]);

  return result;
};

export const REQUIRED_BLOCK_CONFIRMATIONS = REQUIRED_CONFIRMATIONS;
