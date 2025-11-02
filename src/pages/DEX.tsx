// File: src/pages/DEX.tsx
// -------------------------------------------
// FLUIDCHAIN DEX — with live token prices (CoinGecko API)
// -------------------------------------------

"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Gift, ArrowRightLeft, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===================== PLACEHOLDER COMPONENTS =====================

const Navigation = () => (
  <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 p-4 flex justify-between items-center">
    <h1 className="font-bold text-xl">FluidChain DEX</h1>
    <span className="text-sm text-muted-foreground">v1.1</span>
  </nav>
);

const Footer = () => (
  <footer className="py-8 border-t text-center text-muted-foreground text-sm">
    © {new Date().getFullYear()} FluidChain — All rights reserved.
  </footer>
);

const WalletConnection = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
    <Button className="button-glow">Connect Wallet</Button>
  </div>
);

const NetworkSwitcher = () => (
  <Button variant="outline" className="text-sm">Switch Network</Button>
);

const TokenBalances = ({ balances }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Token Balances</CardTitle>
      <CardDescription>Your current holdings</CardDescription>
    </CardHeader>
    <CardContent>
      {balances.map((b: any, i: number) => (
        <div key={i} className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>{b.symbol}</span>
          <span>{b.amount}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const DexStats = ({ balance, totalPurchased, totalClaimed }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>DEX Stats</CardTitle>
      <CardDescription>Your transaction summary</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-muted-foreground text-sm">Total Purchased</p>
        <p className="font-bold">{totalPurchased} FLD</p>
      </div>
      <div>
        <p className="text-muted-foreground text-sm">Airdrop Claimed</p>
        <p className="font-bold">{totalClaimed} FLD</p>
      </div>
      <div>
        <p className="text-muted-foreground text-sm">Balance</p>
        <p className="font-bold">{balance} FLD</p>
      </div>
    </CardContent>
  </Card>
);

const TransactionHistory = ({ transactions, isLoading }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Transaction History</CardTitle>
      <CardDescription>Recent activity</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-muted-foreground">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx: any, i: number) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{tx.type}</span>
              <span>{tx.amount} FLD</span>
              <span>{tx.status}</span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

// ===================== LIVE TOKEN PRICE HOOK =====================

const useTokenPrices = (symbols: string[]) => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrices = async () => {
    try {
      setIsLoading(true);
      const ids = symbols.map((s) => {
        // CoinGecko token ID map (expand as needed)
        const map: Record<string, string> = {
          FLD: "fluid-token", // <-- add your actual CoinGecko ID
          BNB: "binancecoin",
          ETH: "ethereum",
          USDT: "tether",
          BTC: "bitcoin",
        };
        return map[s] || s.toLowerCase();
      });
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`;
      const res = await fetch(url);
      const data = await res.json();

      const newPrices: Record<string, number> = {};
      symbols.forEach((sym, i) => {
        const id = ids[i];
        newPrices[sym] = data[id]?.usd ?? 0;
      });

      setPrices(newPrices);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Price fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (symbols.length > 0) fetchPrices();
  }, [symbols.join(",")]);

  return { prices, lastUpdated, refresh: fetchPrices, isLoading };
};

// ===================== WALLET + DUMMY DATA HOOKS =====================

const useWalletStatus = () => ({
  isConnected: true,
  address: "0x1234...abcd",
});

const useTokenPurchase = () => ({
  buyTokens: async (amount: number, token: string) => {
    console.log(`Purchasing ${amount} ${token}`);
    return true;
  },
  isLoading: false,
});

const useAirdropClaim = () => ({
  claimAirdrop: async () => true,
  isLoading: false,
  isEligible: true,
  isClaimed: false,
  claimableAmount: 100,
});

const useTransactionHistory = () => ({
  transactions: [
    { type: "purchase", amount: "500", status: "success" },
    { type: "claim", amount: "100", status: "success" },
  ],
  isLoading: false,
  refreshHistory: () => {},
});

const useTokenBalances = () => ({
  balances: [
    { symbol: "FLD", amount: 600 },
    { symbol: "BNB", amount: 0.5 },
    { symbol: "USDT", amount: 150 },
  ],
  isLoading: false,
});

export const FLD_PRICE_USD = 0.25;

// ===================== PORTFOLIO VALUE CARD =====================

const PortfolioValue = ({
  balances,
  prices,
  lastUpdated,
  onRefresh,
  isLoading,
}: any) => {
  const totalUSD = balances.reduce((sum: number, b: any) => {
    const price = prices[b.symbol] ?? 0;
    return sum + b.amount * price;
  }, 0);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Portfolio Value</CardTitle>
          <CardDescription>Updated {lastUpdated ? lastUpdated.toLocaleTimeString() : "—"}</CardDescription>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="hover:rotate-180 transition-transform"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Updating...</p>
        ) : (
          <p className="text-3xl font-bold">${totalUSD.toFixed(2)} USD</p>
        )}
      </CardContent>
    </Card>
  );
};

// ===================== MAIN DEX PAGE =====================

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
    claimableAmount,
  } = useAirdropClaim();
  const { transactions, isLoading: isLoadingHistory, refreshHistory } = useTransactionHistory();
  const { balances, isLoading: isLoadingBalances } = useTokenBalances();

  const symbols = balances.map((b) => b.symbol);
  const { prices, lastUpdated, refresh: refreshPrices, isLoading: isPriceLoading } =
    useTokenPrices(symbols);

  const totalPurchased = transactions
    .filter((tx) => tx.type === "purchase" && tx.status === "success")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  const totalClaimed = transactions
    .filter((tx) => tx.type === "claim" && tx.status === "success")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  const balance = (parseFloat(totalPurchased) + parseFloat(totalClaimed)).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="flex-1 container mx-auto px-6 pt-32 pb-16">
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

        {!isConnected ? (
          <WalletConnection />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 rounded-lg bg-card border animate-fade-in">
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Connected Wallet</p>
                <p className="font-mono text-sm">{address}</p>
              </div>
              <NetworkSwitcher />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 space-y-6">
                <PortfolioValue
                  balances={balances}
                  prices={prices}
                  lastUpdated={lastUpdated}
                  onRefresh={refreshPrices}
                  isLoading={isPriceLoading}
                />
                <TokenBalances balances={balances} />
              </div>

              <div className="lg:col-span-2 space-y-6">
                <DexStats
                  balance={balance}
                  totalPurchased={totalPurchased}
                  totalClaimed={totalClaimed}
                />

                <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
                  {/* Buy */}
                  <Card className="card-glow hover:scale-105 transition-transform">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        Buy FLD Tokens
                      </CardTitle>
                      <CardDescription>Purchase FLD tokens with BNB</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                          <p className="text-2xl font-bold text-primary">${FLD_PRICE_USD} USD</p>
                        </div>
                        <Button className="w-full button-glow" onClick={() => setPurchaseModalOpen(true)}>
                          <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Claim */}
                  <Card className="card-glow hover:scale-105 transition-transform">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-blue-500" />
                        Claim Airdrop
                      </CardTitle>
                      <CardDescription>
                        {isEligible ? `${claimableAmount} FLD available` : "Check eligibility"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <p className="text-2xl font-bold text-blue-500">
                            {isClaimed ? "Claimed ✓" : isEligible ? "Eligible" : "Not Eligible"}
                          </p>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setAirdropDialogOpen(true)}
                          disabled={isClaimed || !isEligible}
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          {isClaimed ? "Already Claimed" : "Claim Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <TransactionHistory
              transactions={transactions}
              isLoading={isLoadingHistory}
              onRefresh={refreshHistory}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DEX;
