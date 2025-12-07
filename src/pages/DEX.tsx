import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WalletConnection from "@/components/WalletConnection";
import DexStats from "@/components/DexStats";
import TransactionHistory from "@/components/TransactionHistory";
import AirdropClaimDialog from "@/components/AirdropClaimDialog";
import NetworkSwitcher from "@/components/NetworkSwitcher";
import TokenBalances from "@/components/TokenBalances";
import PortfolioValue from "@/components/PortfolioValue";
import SalesProgressCard from "@/components/SalesProgressCard";
import AirdropProgressCard from "@/components/AirdropProgressCard";
import USDTCollectionTracker from "@/components/USDTCollectionTracker";
import IntegratedPurchaseWidget from "@/components/IntegratedPurchaseWidget";
import TransactionConfirmationModal from "@/components/TransactionConfirmationModal";
import TokenContractInfo from "@/components/TokenContractInfo";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useSalesProgress } from "@/hooks/useSalesProgress";
import { useAirdropProgress } from "@/hooks/useAirdropProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenPurchase } from "@/hooks/useTokenPurchase";
import { useAirdropClaim } from "@/hooks/useAirdropClaim";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { Gift, ArrowRightLeft } from "lucide-react";
import { AdvancedSwap } from "@/components/AdvancedSwap"

const DEX = () => {
  const [airdropDialogOpen, setAirdropDialogOpen] = useState(false);

  const { isConnected, address } = useWalletStatus();
  const { buyTokens, isLoading: isPurchasing, lastTransaction: purchaseTransaction, clearLastTransaction: clearPurchaseTransaction } = useTokenPurchase();
  const {
    claimAirdrop,
    isLoading: isClaiming,
    isEligible,
    isClaimed,
    claimableAmount,
    lastTransaction: claimTransaction,
    clearLastTransaction: clearClaimTransaction
  } = useAirdropClaim();
  const { transactions, isLoading: isLoadingHistory, refreshHistory } = useTransactionHistory();
  const { balances, isLoading: isLoadingBalances } = useTokenBalances();
  const salesProgress = useSalesProgress();
  const airdropProgress = useAirdropProgress();

  const symbols = balances.map(b => b.symbol);
  const { lastUpdated, refresh: refreshPrices } = useTokenPrices(symbols);

  // Calculate stats from transactions
  const totalPurchased = transactions
    .filter(tx => tx.type === 'purchase' && tx.status === 'success')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  const totalClaimed = transactions
    .filter(tx => tx.type === 'claim' && tx.status === 'success')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  const balance = (parseFloat(totalPurchased) + parseFloat(totalClaimed)).toFixed(2);

  // Active transaction for modal
  const activeTransaction = purchaseTransaction || claimTransaction;
  const isTransactionPending = isPurchasing || isClaiming;

  const handleCloseTransactionModal = () => {
    clearPurchaseTransaction();
    clearClaimTransaction();
    refreshHistory();
  };

  const handlePurchase = async (tokenAmount: number, tokenSymbol: string) => {
    const result = await buyTokens(tokenAmount, tokenSymbol);
    if (result) {
      refreshHistory();
    }
  };

  const handleClaim = async () => {
    const result = await claimAirdrop();
    if (result) {
      setTimeout(() => {
        setAirdropDialogOpen(false);
        refreshHistory();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 md:px-6 pt-20 md:pt-28 lg:pt-32 pb-8 md:pb-12">
        {/* Hero Section */}
        <section className="text-center mb-6 md:mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Decentralized Exchange</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text">
            Trade & Manage FLUID and Other Cryptos
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy tokens, claim airdrops, swap and track your transactions all in one place
          </p>
        </section>

        {/* Wallet Connection Check */}
        {!isConnected ? (
          <WalletConnection />
        ) : (
          <>
            {/* Network Switcher & Wallet Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6 p-3 md:p-4 rounded-lg bg-card border animate-fade-in">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex flex-col">
                  <p className="font-semibold text-xs md:text-sm text-muted-foreground">Connected Wallet</p>
                  <p className="font-mono text-xs md:text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                </div>
              </div>
              <NetworkSwitcher />
            </div>

            {/* Token Contract Info */}
            <div className="mb-4 md:mb-6 animate-fade-in">
              <TokenContractInfo />
            </div>

            {/* USDT Collection Tracker */}
            <div className="mb-4 md:mb-6 animate-fade-in">
              <USDTCollectionTracker data={salesProgress} />
            </div>

            {/* Progress Cards */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 animate-fade-in">
              <SalesProgressCard data={salesProgress} />
              <AirdropProgressCard data={airdropProgress} />
            </div>

            {/* Integrated Purchase Widget - Full Width Feature */}
            <div className="mb-6 md:mb-8">
              <IntegratedPurchaseWidget 
                onPurchase={handlePurchase}
                isLoading={isPurchasing}
              />
            </div>

            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Left Column: Portfolio & Token Balances */}
              <div className="lg:col-span-1 space-y-4 md:space-y-6">
                <PortfolioValue 
                  balances={balances}
                  isLoading={isLoadingBalances}
                  lastUpdated={lastUpdated}
                  onRefresh={refreshPrices}
                />
                <TokenBalances />
              </div>

              {/* Right Column: FLD Stats & Claim */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Stats Dashboard */}
                <DexStats 
                  balance={balance}
                  totalPurchased={totalPurchased}
                  totalClaimed={totalClaimed}
                  address={address || ""}
                />

                {/* Claim Airdrop Card */}
                <Card className="card-glow hover:scale-[1.02] transition-transform animate-scale-in">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Gift className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                      Claim Airdrop
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      {isEligible ? `${claimableAmount} FLUID available` : 'Check eligibility'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                    <div className="space-y-3 md:space-y-4">
                      <div className="p-3 md:p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">Status</p>
                        <p className="text-xl md:text-2xl font-bold text-blue-500">
                          {isClaimed ? 'Claimed ✓' : isEligible ? 'Eligible' : 'Not Eligible'}
                        </p>
                        {isEligible && !isClaimed && (
                          <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                            Claim {claimableAmount} FLUID tokens
                          </p>
                        )}
                      </div>
                      <Button 
                        className="w-full"
                        size="lg"
                        onClick={() => setAirdropDialogOpen(true)}
                        disabled={isClaimed || !isEligible}
                        variant={isClaimed ? "secondary" : "default"}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        {isClaimed ? 'Already Claimed' : 'Claim Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Transaction History */}
            <div className="animate-fade-in">
              <TransactionHistory 
                transactions={transactions}
                isLoading={isLoadingHistory}
                onRefresh={refreshHistory}
              />
            </div>
          </>
        )}
      </main>

      <Footer />
      
      {/* Airdrop Claim Dialog */}
      <AirdropClaimDialog
        open={airdropDialogOpen}
        onOpenChange={setAirdropDialogOpen}
        onClaim={handleClaim}
        isLoading={isClaiming}
        isEligible={isEligible}
        isClaimed={isClaimed}
        claimableAmount={claimableAmount}
      />

      {/* Transaction Confirmation Modal */}
      <TransactionConfirmationModal
        open={!!activeTransaction || isTransactionPending}
        onClose={handleCloseTransactionModal}
        transaction={activeTransaction}
        isPending={isTransactionPending && !activeTransaction}
      />
    </div>
  );
};

export default DEX;
