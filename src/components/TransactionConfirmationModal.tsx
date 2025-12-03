import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ExternalLink, Copy, Loader2, Clock, CuboidIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTransactionStatus, REQUIRED_BLOCK_CONFIRMATIONS, TransactionStatus } from "@/hooks/useTransactionStatus";

export interface TransactionResult {
  success: boolean;
  hash?: string;
  type: 'purchase' | 'claim' | 'approve';
  amount?: string;
  tokenSymbol?: string;
  error?: string;
  status?: TransactionStatus;
  confirmations?: number;
  blockNumber?: number;
}

interface TransactionConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  transaction: TransactionResult | null;
  isPending?: boolean;
}

const TransactionConfirmationModal = ({ 
  open, 
  onClose, 
  transaction,
  isPending = false
}: TransactionConfirmationModalProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  
  // Use the transaction status hook for real-time polling
  const txStatus = useTransactionStatus(transaction?.hash || null);
  
  // Determine the current status to display
  const displayStatus = transaction?.status || txStatus.status;
  const displayConfirmations = transaction?.confirmations ?? txStatus.confirmations;
  const displayBlockNumber = transaction?.blockNumber ?? txStatus.blockNumber;
  
  // Timer for elapsed time
  useEffect(() => {
    if (!open || displayStatus === 'confirmed' || displayStatus === 'failed') {
      return;
    }
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [open, displayStatus, startTime]);

  // Reset elapsed time when modal opens
  useEffect(() => {
    if (open) {
      setElapsedTime(0);
    }
  }, [open]);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Transaction hash copied to clipboard",
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'Purchase';
      case 'claim': return 'Airdrop Claim';
      case 'approve': return 'Token Approval';
      default: return 'Transaction';
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const formatElapsedTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const renderStatusStep = (
    stepNumber: number,
    label: string,
    isComplete: boolean,
    isActive: boolean,
    activeText?: string
  ) => (
    <div className="flex items-center gap-3 py-2">
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
        ${isComplete ? 'bg-green-500 text-white' : isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        {isComplete ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : isActive ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          stepNumber
        )}
      </div>
      <div className="flex-1">
        <span className={isComplete ? 'text-green-500 font-medium' : isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {label}
        </span>
        {isActive && activeText && (
          <span className="ml-2 text-sm text-primary animate-pulse">{activeText}</span>
        )}
      </div>
    </div>
  );

  const isSubmitted = displayStatus === 'submitted' || displayStatus === 'confirming' || displayStatus === 'confirmed';
  const isConfirming = displayStatus === 'confirming';
  const isConfirmed = displayStatus === 'confirmed';
  const isFailed = displayStatus === 'failed' || (transaction && !transaction.success);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        {isPending ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
              <DialogTitle className="text-xl">Processing Transaction</DialogTitle>
              <DialogDescription>
                Please confirm the transaction in your wallet...
              </DialogDescription>
            </DialogHeader>
          </>
        ) : transaction ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4">
                {isFailed ? (
                  <XCircle className="w-16 h-16 text-destructive" />
                ) : isConfirmed ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                ) : (
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {displayConfirmations}/{REQUIRED_BLOCK_CONFIRMATIONS}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <DialogTitle className="text-xl">
                {isFailed ? 'Transaction Failed' : isConfirmed ? 'Transaction Confirmed!' : 'Transaction in Progress'}
              </DialogTitle>
              <DialogDescription>
                {isFailed 
                  ? transaction.error || 'The transaction could not be completed'
                  : isConfirmed 
                    ? `Your ${getTypeLabel(transaction.type).toLowerCase()} has been confirmed`
                    : 'Waiting for blockchain confirmation...'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Progress Steps */}
              {!isFailed && (
                <div className="rounded-lg bg-muted/50 p-4">
                  {renderStatusStep(1, 'Wallet Signed', isSubmitted, isPending)}
                  {renderStatusStep(
                    2, 
                    'Confirming', 
                    isConfirmed, 
                    isConfirming,
                    isConfirming ? `${displayConfirmations}/${REQUIRED_BLOCK_CONFIRMATIONS} blocks` : undefined
                  )}
                  {renderStatusStep(3, 'Confirmed', isConfirmed, false)}
                </div>
              )}

              {/* Transaction Details */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="font-medium">{getTypeLabel(transaction.type)}</span>
                </div>
                
                {transaction.amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-semibold text-primary">
                      {transaction.amount} {transaction.tokenSymbol || 'FLD'}
                    </span>
                  </div>
                )}

                {transaction.hash && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tx Hash</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{truncateHash(transaction.hash)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(transaction.hash!)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {displayBlockNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Block</span>
                    <div className="flex items-center gap-1">
                      <CuboidIcon className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-sm">#{displayBlockNumber.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Elapsed Time */}
                {!isConfirmed && !isFailed && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Elapsed</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm">{formatElapsedTime(elapsedTime)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Polygonscan Link */}
              {transaction.hash && (
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a
                    href={`https://polygonscan.com/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Polygonscan
                  </a>
                </Button>
              )}

              {/* Close Button */}
              <Button 
                className="w-full" 
                onClick={onClose}
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed || isFailed ? 'Close' : 'Close & Continue in Background'}
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionConfirmationModal;
