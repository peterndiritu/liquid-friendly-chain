import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WalletConnection from "@/components/WalletConnection";
import DexStats from "@/components/DexStats";
import TransactionHistory from "@/components/TransactionHistory";
import PurchaseModal from "@/components/PurchaseModal";
import AirdropClaimDialog from "@/components/AirdropClaimDialog";
import NetworkSwitcher from "@/components/NetworkSwitcher";
import TokenBalances from "@/components/TokenBalances";
import PortfolioValue from "@/components/PortfolioValue";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { useTokenPurchase } from "@/hooks/useTokenPurchase";
import { useAirdropClaim } from "@/hooks/useAirdropClaim";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { ShoppingCart, Gift, ArrowRightLeft } from "lucide-react";
import { FLD_PRICE_USD } from "@/lib/contracts";

const DEX = () => {
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [airdropDialogOpen, setAirdropDialogOpen] = useState(false);
  
  const { isConnected, address } = useWalletStatus();
  const { buyTokens, isLoading: isPurchasing } = useTokenPurchase();
  const { 
    claimAirdrop, 
    isLoading: isClaiming, 
    isEligible, 
    isClaimed, 
    claimableAmount 
  } = useAirdropClaim();
  const { transactions, isLoading: isLoadingHistory, refreshHistory } = useTransactionHistory();
  const { balances, isLoading: isLoadingBalances } = useTokenBalances();
  
  const symbols = balances.map(b => b.symbol);
  const { lastUpdated, refresh: refreshPrices } = useTokenPrices(symbols);

  // helper to safely parse numbers
  const parseNumber = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // Calculate stats from transactions (safer parsing)
  const totalPurchased = (
    transactions
      .filter(tx => tx.type === 'purchase' && tx.status === 'success')
      .reduce((sum, tx) => sum + parseNumber(tx.amount), 0)
  ).toFixed(2);

  const totalClaimed = (
    transactions
      .filter(tx => tx.type === 'claim' && tx.status === 'success')
      .reduce((sum, tx) => sum + parseNumber(tx.amount), 0)
  ).toFixed(2);

  const balance = (parseNumber(totalPurchased) + parseNumber(totalClaimed)).toFixed(2);

  // cleaned purchase handler
  const handlePurchase = async (tokenAmount: number, tokenSymbol: string) => {
    if (!isConnected) {
      console.warn("Wallet not connected");
      return;
    }

    const amount = Number(tokenAmount);
    if (!tokenSymbol || !Number.isFinite(amount) || amount <= 0) {
      console.warn("Invalid purchase amount or token symbol");
      return;
    }

    // Prevent duplicate submissions
    if (isPurchasing) return;

    try {
      const result = await buyTokens(amount, tokenSymbol);
      if (result) {
        // On success: close modal and refresh history
        setPurchaseModalOpen(false);
        refreshHistory();
        // optionally: show success toast
      } else {
        // optionally: show failure toast
        console.warn("Purchase returned falsy result");
      }
    } catch (err) {
      console.error("Purchase failed", err);
      // optionally: show error toast or UI feedback
    }
  };

  // cleaned claim handler
  const handleClaim = async () => {
    if (!isConnected) {
      console.warn("Wallet not connected");
      return;
    }
    if (!isEligible || isClaimed) {
      console.warn("Not eligible or already claimed");
      return;
    }

    if (isClaiming) return;

    try {
      const result = await claimAirdrop();
      if (result) {
        // Close dialog and refresh history after a short delay to allow UI update
        setTimeout(() => {
          setAirdropDialogOpen(false);
          refreshHistory();
        }, 800);
        // optionally: show success toast
      } else {
        console.warn("Claim returned falsy result");
        // optionally: show failure toast
      }
    } catch (err) {
      console.error("Claim failed", err);
      // optionally: show error toast or UI feedback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-6 pt-32 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Decentralized Exchange</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Trade & Manage FLD
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy tokens, claim airdrops, and track your transactions all in one place
          </p>
        </section>

        {/* Wallet Connection Check */}
        {!isConnected ? (
          <WalletConnection />
        ) : (
          <>
            {/* Network Switcher & Wallet Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 rounded-lg bg-card border animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <p className="font-semibold text-sm text-muted-foreground">Connected Wallet</p>
                  <p className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                </div>
              </div>
              <NetworkSwitcher />
            </div>

            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column: Portfolio & Token Balances */}
              <div className="lg:col-span-1 space-y-6">
                <PortfolioValue 
                  balances={balances}
                  isLoading={isLoadingBalances}
                  lastUpdated={lastUpdated}
                  onRefresh={refreshPrices}
                />
                <TokenBalances />
              </div>

              {/* Right Column: FLD Stats & Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Dashboard */}
                <DexStats 
                  balance={balance}
                  totalPurchased={totalPurchased}
                  totalClaimed={totalClaimed}
                  address={address || ""}
                />

                {/* Action Cards */}
                <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
              {/* Buy Card */}
              <Card className="card-glow hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Buy FLD Tokens
                  </CardTitle>
                  <CardDescription>
                    Purchase FLD tokens with BNB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                      <p className="text-2xl font-bold text-primary">${FLD_PRICE_USD} USD</p>
                      <p className="text-xs text-muted-foreground mt-1">per FLD token</p>
                    </div>
                    <Button 
                      className="w-full button-glow" 
                      size="lg"
                      onClick={() => setPurchaseModalOpen(true)}
                      disabled={isPurchasing}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Card */}
              <Card className="card-glow hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-blue-500" />
                    Claim Airdrop
                  </CardTitle>
                  <CardDescription>
                    {isEligible ? `${claimableAmount} FLD available` : 'Check eligibility'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {isClaimed ? 'Claimed ✓' : isEligible ? 'Eligible' : 'Not Eligible'}
                      </p>
                      {isEligible && !isClaimed && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Claim {claimableAmount} FLD tokens
                        </p>
                      )}
                    </div>
                    <Button 
                      className="w-full"
                      size="lg"
                      onClick={() => setAirdropDialogOpen(true)}
                      disabled={isClaimed || !isEligible || isClaiming}
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

      {/* Modals */}
      <PurchaseModal 
        open={purchaseModalOpen}
        onOpenChange={setPurchaseModalOpen}
        onPurchase={handlePurchase}
        isLoading={isPurchasing}
      />
      
      <AirdropClaimDialog
        open={airdropDialogOpen}
        onOpenChange={setAirdropDialogOpen}
        onClaim={handleClaim}
        isLoading={isClaiming}
        isEligible={isEligible}
        isClaimed={isClaimed}
        claimableAmount={claimableAmount}
      />
    </div>
  );
};

export default DEX;