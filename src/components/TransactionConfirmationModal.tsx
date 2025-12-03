import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ExternalLink, Copy, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface TransactionResult {
  success: boolean;
  hash?: string;
  type: 'purchase' | 'claim' | 'approve';
  amount?: string;
  tokenSymbol?: string;
  error?: string;
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
                {transaction.success ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-destructive" />
                )}
              </div>
              <DialogTitle className="text-xl">
                {transaction.success ? 'Transaction Successful!' : 'Transaction Failed'}
              </DialogTitle>
              <DialogDescription>
                {transaction.success 
                  ? `Your ${getTypeLabel(transaction.type).toLowerCase()} has been completed`
                  : transaction.error || 'The transaction could not be completed'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
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
              </div>

              {/* Polygonscan Link */}
              {transaction.hash && transaction.success && (
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
              <Button className="w-full" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionConfirmationModal;
