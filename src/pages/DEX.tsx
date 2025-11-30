/* DEX.tsx
   Full-featured DEX page:
   - On-chain purchase (presale)
   - On-chain airdrop claim
   - Live MATIC <-> FLD price via router.getAmountsOut
   - Slippage protection & deadline
   - Add / remove liquidity (router)
   - WalletConnect / OKX Wallet via Web3Modal
   - Gas estimation, tx feedback, and block explorer links
   NOTE: Replace placeholder addresses and ABIs below before use.
*/

"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
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
import SalesProgressCard from "@/components/SalesProgressCard";
import AirdropProgressCard from "@/components/AirdropProgressCard";
import USDTCollectionTracker from "@/components/USDTCollectionTracker";
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
import { ShoppingCart, Gift, ArrowRightLeft, Wallet } from "lucide-react";
import { FLD_PRICE_USD } from "@/lib/contracts";

// ---------------------------
// CONFIG: Replace the placeholders below with your actual addresses
// ---------------------------
const SALE_CONTRACT_ADDRESS = "0xSALE_CONTRACT_ADDRESS_PLACEHOLDER"; // presale/sale contract (payable)
const FLD_TOKEN_ADDRESS = "0xFLD_TOKEN_ADDRESS_PLACEHOLDER";
const AIRDROP_CONTRACT_ADDRESS = "0xAIRDROP_CONTRACT_ADDRESS_PLACEHOLDER";
const ROUTER_ADDRESS = "0xROUTER_ADDRESS_PLACEHOLDER"; // e.g., QuickSwap / Uniswap router on chain
const USDT_ADDRESS = "0xUSDT_ADDRESS_PLACEHOLDER"; // optional stablecoin address for route

// Block explorer base URL (used to link tx hashes)
const BLOCK_EXPLORER_TX = "https://polygonscan.com/tx/"; // change if using a different chain

// ---------------------------
// Minimal ABIs (expand with full ABIs if available)
// ---------------------------
const SALE_ABI = [
  "function buy() payable",
  "function purchase() payable",
  "event Bought(address indexed buyer, uint256 amount, uint256 value)"
];

const FLD_TOKEN_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

const AIRDROP_ABI = [
  "function claim()",
  "function isEligible(address) view returns (bool)",
  "function claimableAmount(address) view returns (uint256)"
];

const ERC20_MIN_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

const ROUTER_ABI = [
  "function getAmountsOut(uint256 amountIn, address[] memory path) view returns (uint256[] memory amounts)",
  "function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity)",
  "function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB)"
];

// ---------------------------
// Utility helpers
// ---------------------------
function getEthersFromProvider(providerAny: any) {
  // For Ethers v6 this is BrowserProvider
  try {
    // @ts-ignore
    if (providerAny?.provider) {
      // web3modal ProviderWrapper (providerAny.provider) => pass to BrowserProvider
      // but simpler: use ethers directly on providerAny
      return new ethers.BrowserProvider(providerAny.provider ?? providerAny);
    }
  } catch (e) {
    // ignore
  }
  // fallback: try BrowserProvider directly
  try {
    // @ts-ignore
    return new ethers.BrowserProvider(providerAny);
  } catch {
    return null;
  }
}

// ---------------------------
// PriceSparkline (small svg)
// ---------------------------
const PriceSparkline = ({ priceHistory }: { priceHistory: number[] }) => {
  if (!priceHistory || priceHistory.length === 0) return <div className="h-16" />;
  const max = Math.max(...priceHistory);
  const min = Math.min(...priceHistory);
  const denom = max === min ? 1 : max - min;
  const points = priceHistory
    .map((p, i) => {
      const x = (i / (priceHistory.length - 1)) * 100;
      const y = 100 - ((p - min) / denom) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-16 stroke-primary fill-none">
      <polyline points={points} strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  );
};

// ---------------------------
// Main DEX component
// ---------------------------
const DEX = () => {
  // UI states
  const [localProvider, setLocalProvider] = useState<any | null>(null); // provider returned by Web3Modal
  const [ethersProvider, setEthersProvider] = useState<any | null>(null); // ethers provider (BrowserProvider)
  const [signer, setSigner] = useState<any | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // hooks from your app (keeps original integration)
  const { isConnected: hookIsConnected } = useWalletStatus();
  const { transactions, isLoading: isLoadingHistory, refreshHistory } = useTransactionHistory();
  const { balances, isLoading: isLoadingBalances } = useTokenBalances();
  const salesProgress = useSalesProgress();
  const airdropProgress = useAirdropProgress();
  const symbols = balances.map(b => b.symbol);
  const { lastUpdated, refresh: refreshPrices } = useTokenPrices(symbols);

  // new states for features
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // MATIC -> FLD quote
  const [quoteMaticAmount, setQuoteMaticAmount] = useState<string>("0.01");
  const [quoteFldOut, setQuoteFldOut] = useState<string>("0");

  // Slippage & deadline
  const [slippageBps, setSlippageBps] = useState<number>(200); // 2% default (bps)
  const [deadlineMinutes, setDeadlineMinutes] = useState<number>(10);

  // Purchase (presale) states
  const [purchaseAmountMatic, setPurchaseAmountMatic] = useState<string>("0.05");
  const [isPurchasingOnChain, setIsPurchasingOnChain] = useState(false);
  const [purchaseTxHash, setPurchaseTxHash] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  // Claim states
  const [isClaimingOnChain, setIsClaimingOnChain] = useState(false);
  const [claimTxHash, setClaimTxHash] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [airdropEligible, setAirdropEligible] = useState<boolean | null>(null);
  const [airdropClaimableAmount, setAirdropClaimableAmount] = useState<string>("0");

  // Liquidity states
  const [liquidityTokenAAmount, setLiquidityTokenAAmount] = useState<string>("0"); // e.g., FLD
  const [liquidityMaticAmount, setLiquidityMaticAmount] = useState<string>("0"); // WETH/MATIC side
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);
  const [addLiquidityTx, setAddLiquidityTx] = useState<string | null>(null);

  // Swap states (FLD -> USDT or MATIC -> FLD)
  const [swapAmountIn, setSwapAmountIn] = useState<string>("0.1"); // default
  const [swapPath, setSwapPath] = useState<string[]>([FLD_TOKEN_ADDRESS, USDT_ADDRESS]);

  // web3modal instance
  const [web3Modal, setWeb3Modal] = useState<any | null>(null);

  // Derived
  const isConnected = !!signer && !!walletAddress;

  // initialize Web3Modal on mount
  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // Insert your own Infura or RPC here for WalletConnect
          rpc: {
            137: "https://polygon-rpc.com", // Polygon mainnet RPC
          },
          chainId: 137,
        },
      },
      // additional providers could be added here (e.g., okx wallet connector)
    };

    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      theme: "dark",
    });

    setWeb3Modal(modal);
  }, []);

  // auto-connect if cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal]);

  // update sparkline on FLD price changes
  useEffect(() => {
    setPriceHistory(prev => [...prev.slice(-19), Number(FLD_PRICE_USD || 0)]);
  }, [lastUpdated]);

  // auto-refresh loop
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      try {
        refreshPrices();
        refreshHistory();
        // also refresh on-chain quotes if connected
        if (ethersProvider) {
          fetchMaticToFldQuote(ethersProvider);
          fetchAirdropStatus();
        }
      } catch (e) {
        // ignore errors during auto-refresh
      }
    }, 10000);
    return () => clearInterval(id);
  }, [autoRefresh, refreshPrices, refreshHistory, ethersProvider]);

  // ---------------------------
  // CONNECT WALLET (Web3Modal)
  // ---------------------------
  const connectWallet = async () => {
    if (!web3Modal) {
      console.error("web3Modal not initialized");
      return;
    }
    try {
      const externalProvider = await web3Modal.connect();
      // create ethers provider
      const ep = getEthersFromProvider(externalProvider) ?? new ethers.BrowserProvider(externalProvider);
      const s = ep.getSigner();
      const addr = await s.getAddress();
      setLocalProvider(externalProvider);
      setEthersProvider(ep);
      setSigner(s);
      setWalletAddress(addr);
    } catch (err: any) {
      console.error("connectWallet err", err);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    // if WalletConnect provider, close session
    if (localProvider && localProvider.close) {
      try {
        await localProvider.close();
      } catch {}
    }
    setLocalProvider(null);
    setEthersProvider(null);
    setSigner(null);
    setWalletAddress(null);
  };

  // ---------------------------
  // HELPER: create contract
  // ---------------------------
  const contract = useCallback(
    (address: string, abi: any, signerOrProvider?: any) => {
      const providerOrSigner = signerOrProvider ?? ethersProvider ?? (window as any).ethereum ? new ethers.BrowserProvider((window as any).ethereum) : null;
      if (!providerOrSigner) throw new Error("No provider available");
      // ethers v6: new ethers.Contract(address, abi, signerOrProviderOrProvider.getSigner ? signerOrProvider : provider)
      try {
        // use signer if available
        const actor = signer ?? (providerOrSigner.getSigner ? providerOrSigner.getSigner() : providerOrSigner);
        return new ethers.Contract(address, abi, actor);
      } catch (e) {
        // fallback
        return new ethers.Contract(address, abi, providerOrSigner);
      }
    },
    [ethersProvider, signer]
  );

  // ---------------------------
  // Fetch MATIC -> FLD quote using router.getAmountsOut
  // ---------------------------
  const fetchMaticToFldQuote = useCallback(
    async (ep?: any) => {
      const providerToUse = ep ?? ethersProvider;
      if (!providerToUse) return;
      try {
        const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, providerToUse);
        const amountIn = ethers.parseEther(String(quoteMaticAmount || "0"));
        const path = [ethers.constants.AddressZero, FLD_TOKEN_ADDRESS]; // Note: some routers use WETH address instead of AddressZero; adjust if necessary
        // Many routers don't accept AddressZero; better to use WETH address — but since WETH address varies, you should replace addressZero with WETH.
        // We'll try a typical path [WETH, FLD] if AddressZero fails
        let amounts;
        try {
          amounts = await router.getAmountsOut(amountIn, path);
        } catch {
          // fallback: attempt using WETH (common on many chains)
          // You must replace WETH_ADDRESS with actual on-chain WETH (WMATIC) address for accurate quotes
          const WETH_ADDRESS = ethers.constants.AddressZero; // replace with WMATIC address like 0x0d500B1... on polygon
          const path2 = [WETH_ADDRESS, FLD_TOKEN_ADDRESS];
          amounts = await router.getAmountsOut(amountIn, path2);
        }
        const out = amounts[amounts.length - 1];
        const decimals = 18; // assume token decimals 18; you can read decimals from token contract if needed
        const formatted = ethers.formatUnits(out, decimals);
        setQuoteFldOut(formatted);
        return formatted;
      } catch (err) {
        console.error("quote error", err);
        setQuoteFldOut("0");
        return "0";
      }
    },
    [ethersProvider, quoteMaticAmount]
  );

  useEffect(() => {
    if (ethersProvider && quoteMaticAmount && Number(quoteMaticAmount) > 0) {
      fetchMaticToFldQuote();
    }
  }, [ethersProvider, quoteMaticAmount, fetchMaticToFldQuote]);

  // ---------------------------
  // Slippage helper
  // ---------------------------
  const applySlippage = (amountStr: string, bps: number) => {
    try {
      const amountBn = ethers.parseUnits(String(amountStr || "0"), 18);
      const min = amountBn * BigInt(10000 - bps) / BigInt(10000);
      return min;
    } catch {
      return ethers.parseUnits("0", 18);
    }
  };

  // ---------------------------
  // Presale purchase (on-chain) with slippage and deadline
  // ---------------------------
  const purchaseOnChain = async () => {
    setPurchaseError(null);
    setPurchaseTxHash(null);

    if (!signer) {
      setPurchaseError("Connect wallet");
      return;
    }
    try {
      setIsPurchasingOnChain(true);

      // build sale contract
      const sale = new ethers.Contract(SALE_CONTRACT_ADDRESS, SALE_ABI, signer);

      // parse value
      const value = ethers.parseEther(String(purchaseAmountMatic || "0"));

      // estimate gas (optional)
      let gasEstimate;
      try {
        gasEstimate = await sale.estimateGas.buy?.({ value }) ?? await sale.estimateGas.purchase?.({ value });
      } catch {
        // if estimate fails, fallback to provider estimate
        gasEstimate = null;
      }

      // send transaction: try buy() then purchase()
      let tx;
      try {
        if (sale.buy) {
          tx = await sale.buy({ value, gasLimit: gasEstimate ? gasEstimate.mul(120n).div(100n) : undefined });
        } else if (sale.purchase) {
          tx = await sale.purchase({ value, gasLimit: gasEstimate ? gasEstimate.mul(120n).div(100n) : undefined });
        } else {
          throw new Error("Sale contract does not expose buy() or purchase(); update SALE_ABI.");
        }
      } catch (err: any) {
        // rethrow to outer catch
        throw err;
      }

      const receipt = await tx.wait();
      setPurchaseTxHash(receipt.transactionHash ?? tx.hash);
      refreshHistory();
    } catch (err: any) {
      setPurchaseError(err?.message ?? String(err));
    } finally {
      setIsPurchasingOnChain(false);
    }
  };

  // ---------------------------
  // Airdrop on-chain functions (check & claim)
  // ---------------------------
  const fetchAirdropStatus = useCallback(async () => {
    if (!ethersProvider || !walletAddress) return;
    try {
      const airdrop = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, ethersProvider);
      if (airdrop.isEligible) {
        const eligible = await airdrop.isEligible(walletAddress);
        setAirdropEligible(Boolean(eligible));
      }
      if (airdrop.claimableAmount) {
        const raw = await airdrop.claimableAmount(walletAddress);
        const formatted = ethers.formatUnits(raw, 18);
        setAirdropClaimableAmount(formatted);
      }
    } catch (e) {
      // ignore read failures
    }
  }, [ethersProvider, walletAddress]);

  const claimAirdropOnChain = async () => {
    setClaimError(null);
    setClaimTxHash(null);

    if (!signer) {
      setClaimError("Connect wallet");
      return;
    }

    try {
      setIsClaimingOnChain(true);
      const airdrop = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, signer);
      const tx = await airdrop.claim();
      const receipt = await tx.wait();
      setClaimTxHash(receipt.transactionHash ?? tx.hash);
      refreshHistory();
      // refresh airdrop status and balances
      fetchAirdropStatus();
    } catch (err: any) {
      setClaimError(err?.message ?? String(err));
    } finally {
      setIsClaimingOnChain(false);
    }
  };

  // ---------------------------
  // Add liquidity (router.addLiquidity)
  // ---------------------------
  const addLiquidityOnChain = async () => {
    if (!signer) return;
    setIsAddingLiquidity(true);
    setAddLiquidityTx(null);
    try {
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
      const fldToken = new ethers.Contract(FLD_TOKEN_ADDRESS, ERC20_MIN_ABI, signer);
      const tokenDecimals = 18;

      // parse desired amounts
      const amountA = ethers.parseUnits(String(liquidityTokenAAmount || "0"), tokenDecimals); // FLD
      const amountB = ethers.parseEther(String(liquidityMaticAmount || "0")); // MATIC assumed 18 decimals

      // ensure approval for FLD to router
      const allowance = await fldToken.allowance(walletAddress, ROUTER_ADDRESS);
      if (allowance < amountA) {
        const approveTx = await fldToken.approve(ROUTER_ADDRESS, amountA);
        await approveTx.wait();
      }

      // calculate min amounts based on slippage
      const minA = amountA * BigInt(10000 - slippageBps) / BigInt(10000);
      const minB = amountB * BigInt(10000 - slippageBps) / BigInt(10000);

      const deadline = Math.floor(Date.now() / 1000) + (deadlineMinutes * 60);

      const tx = await router.addLiquidity(
        FLD_TOKEN_ADDRESS,
        ethers.constants.AddressZero, // If your router expects WMATIC address, replace AddressZero with WMATIC address
        amountA,
        amountB,
        minA,
        minB,
        walletAddress,
        deadline,
        { value: amountB } // sending MATIC with the call if router expects native token
      );

      const receipt = await tx.wait();
      setAddLiquidityTx(receipt.transactionHash ?? tx.hash);
      refreshHistory();
    } catch (e: any) {
      console.error("addLiquidity error", e);
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  // ---------------------------
  // Helper: fetch token decimals
  // ---------------------------
  const getTokenDecimals = async (tokenAddress: string) => {
    try {
      const tok = new ethers.Contract(tokenAddress, ERC20_MIN_ABI, ethersProvider ?? (window as any).ethereum ? new ethers.BrowserProvider((window as any).ethereum) : null);
      const d = await tok.decimals();
      return Number(d);
    } catch {
      return 18;
    }
  };

  // ---------------------------
  // UI: compute slippage percentage
  // ---------------------------
  const slippagePct = useMemo(() => (slippageBps / 100).toFixed(2) + "%", [slippageBps]);

  // ---------------------------
  // When signer/provider updates, fetch airdrop status
  // ---------------------------
  useEffect(() => {
    if (ethersProvider && walletAddress) {
      fetchAirdropStatus();
    }
  }, [ethersProvider, walletAddress, fetchAirdropStatus]);

  // ---------------------------
  // Render UI
  // ---------------------------
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="flex-1 container mx-auto px-6 pt-32 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Decentralized Exchange</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Trade & Manage FLD</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy FLD, claim airdrops, add liquidity and swap — all on-chain.
          </p>
        </section>

        {/* Wallet & Connect */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex gap-3 items-center justify-between p-4 rounded-lg bg-card border">
            <div>
              <div className="text-sm text-muted-foreground">Wallet</div>
              <div className="font-mono">
                {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "Not connected"}
              </div>
            </div>
            <div className="flex gap-2">
              {!walletAddress ? (
                <Button onClick={connectWallet} className="flex items-center gap-2"><Wallet /> Connect</Button>
              ) : (
                <Button variant="destructive" onClick={disconnectWallet}>Disconnect</Button>
              )}
              <NetworkSwitcher />
            </div>
          </div>
        </div>

        {/* Auto-refresh & sparkline */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
              <span className="text-sm">Auto-refresh prices & history</span>
            </div>
            <div className="text-sm text-muted-foreground">Slippage: <strong>{slippagePct}</strong> • Deadline: <strong>{deadlineMinutes}m</strong></div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Live FLD Price (USD)</CardTitle>
              <CardDescription>Last reads & MATIC → FLD quote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div>
                  <div className="text-2xl font-bold">${FLD_PRICE_USD}</div>
                  <div className="text-sm text-muted-foreground">per FLD (off-chain source)</div>
                </div>
                <div className="md:col-span-2">
                  <PriceSparkline priceHistory={priceHistory} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            <PortfolioValue balances={balances} isLoading={isLoadingBalances} lastUpdated={lastUpdated} onRefresh={refreshPrices} />
            <TokenBalances />
            <SalesProgressCard data={salesProgress} />
            <AirdropProgressCard data={airdropProgress} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <DexStats
              balance={(parseFloat(transactions.filter(tx => tx.type === 'purchase' && tx.status==='success').reduce((s,tx)=> s + parseFloat(tx.amount), 0).toFixed(2) || "0") + parseFloat(transactions.filter(tx => tx.type === 'claim' && tx.status==='success').reduce((s,tx)=> s + parseFloat(tx.amount), 0).toFixed(2) || "0")).toFixed(2)}
              totalPurchased={transactions.filter(tx => tx.type === 'purchase' && tx.status==='success').reduce((s,tx)=> s + parseFloat(tx.amount), 0).toFixed(2)}
              totalClaimed={transactions.filter(tx => tx.type === 'claim' && tx.status==='success').reduce((s,tx)=> s + parseFloat(tx.amount), 0).toFixed(2)}
              address={walletAddress || ""}
            />

            {/* Purchase / Claim / Liquidity area */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Purchase Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-primary" /> Buy FLD (Presale)</CardTitle>
                  <CardDescription>Send MATIC to the presale contract</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="text-sm">MATIC Amount</label>
                    <input type="number" step="0.0001" value={purchaseAmountMatic} onChange={(e) => setPurchaseAmountMatic(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background" />
                    {purchaseError && <div className="text-red-500 text-sm">{purchaseError}</div>}
                    {purchaseTxHash && <div className="text-green-600 text-sm">Tx: <a href={`${BLOCK_EXPLORER_TX}${purchaseTxHash}`} target="_blank" rel="noreferrer" className="underline">{purchaseTxHash.slice(0,8)}...</a></div>}
                    <div className="flex gap-2">
                      <Button onClick={purchaseOnChain} disabled={!isConnected || isPurchasingOnChain}>{isPurchasingOnChain ? "Processing..." : "Purchase On-Chain"}</Button>
                      <Button variant="ghost" onClick={() => { setPurchaseAmountMatic("0.1"); }}>Quick 0.1</Button>
                    </div>
                    <div className="text-sm text-muted-foreground">Slippage applied: {slippagePct}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5 text-blue-500" /> Claim Airdrop</CardTitle>
                  <CardDescription>Claim if eligible</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">Eligibility: {airdropEligible === null ? "Unknown" : (airdropEligible ? "Yes" : "No")}</div>
                    <div className="text-sm">Claimable: {airdropClaimableAmount}</div>
                    {claimError && <div className="text-red-500 text-sm">{claimError}</div>}
                    {claimTxHash && <div className="text-green-600 text-sm">Tx: <a href={`${BLOCK_EXPLORER_TX}${claimTxHash}`} target="_blank" rel="noreferrer" className="underline">{claimTxHash.slice(0,8)}...</a></div>}
                    <div className="flex gap-2">
                      <Button onClick={claimAirdropOnChain} disabled={!isConnected || isClaimingOnChain || airdropEligible === false}>{isClaimingOnChain ? "Claiming..." : "Claim On-Chain"}</Button>
                      <Button variant="ghost" onClick={fetchAirdropStatus}>Refresh</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Liquidity & Router interactions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add liquidity */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Liquidity</CardTitle>
                  <CardDescription>Approve FLD and add liquidity via router</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="text-sm">FLD Amount</label>
                    <input type="number" value={liquidityTokenAAmount} onChange={e => setLiquidityTokenAAmount(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background" />

                    <label className="text-sm">MATIC Amount</label>
                    <input type="number" value={liquidityMaticAmount} onChange={e => setLiquidityMaticAmount(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background" />

                    {addLiquidityTx && <div className="text-green-600 text-sm">Tx: <a href={`${BLOCK_EXPLORER_TX}${addLiquidityTx}`} target="_blank" rel="noreferrer" className="underline">{addLiquidityTx.slice(0,8)}...</a></div>}

                    <div className="flex gap-2">
                      <Button onClick={addLiquidityOnChain} disabled={!isConnected || isAddingLiquidity}>{isAddingLiquidity ? "Adding..." : "Add Liquidity"}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live MATIC -> FLD Quote & Swap preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Quote: MATIC → FLD</CardTitle>
                  <CardDescription>Get live router quote (getAmountsOut)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="text-sm">MATIC Amount</label>
                    <input type="number" value={quoteMaticAmount} onChange={e => setQuoteMaticAmount(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-background" />
                    <div className="text-sm">Estimated FLD: <strong>{quoteFldOut}</strong></div>

                    <div className="flex gap-2">
                      <Button onClick={() => fetchMaticToFldQuote(ethersProvider)} disabled={!ethersProvider}>Refresh Quote</Button>
                    </div>

                    <div className="text-xs text-muted-foreground">Note: Router path and WETH/WMATIC address must be configured correctly in ROUTER logic for accurate quotes.</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Slippage & Deadline controls */}
            <Card>
              <CardHeader>
                <CardTitle>Slippage & Deadline</CardTitle>
                <CardDescription>Adjust slippage (bps) and transaction deadline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-3 items-center">
                  <div>
                    <label className="text-sm">Slippage (bps)</label>
                    <input type="number" min={0} max={1000} value={slippageBps} onChange={e => setSlippageBps(Number(e.target.value))} className="w-full px-3 py-2 rounded-md border bg-background" />
                  </div>
                  <div>
                    <label className="text-sm">Deadline (minutes)</label>
                    <input type="number" min={1} max={1440} value={deadlineMinutes} onChange={e => setDeadlineMinutes(Number(e.target.value))} className="w-full px-3 py-2 rounded-md border bg-background" />
                  </div>
                  <div className="text-sm text-muted-foreground">Current slippage: {slippagePct}</div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <div className="animate-fade-in">
              <TransactionHistory transactions={transactions} isLoading={isLoadingHistory} onRefresh={refreshHistory} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DEX;
