// components/AdvancedSwap.tsx
import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clock, Activity } from "lucide-react";
import { ethers } from "ethers";

/**
 * AdvancedSwap
 * - Uniswap v2 style swap using getAmountsOut + swapExactTokensForTokens
 * - Token list (USDT <-> FLUID) but easily extendable
 * - Auto decimals detection
 * - Balance display
 * - Allowance & approve flow with 'Approve Max' option
 * - Price quote, amountOut, slippage, minReceived
 * - Price impact estimation (simple heuristic)
 * - Deadline control
 * - Gas estimation shown before swap
 *
 * INSTRUCTIONS:
 * - Replace ROUTER_ADDRESS, TOKEN_LIST addresses with your real contract addresses
 * - Import and render: <AdvancedSwap onSwap={refreshHistory} />
 *
 * NOTE: This uses ethers v6 BrowserProvider API (ethers.BrowserProvider). Adjust if you use a different provider.
 */

/* ========== CONFIG - set these for your project ========== */
const ROUTER_ADDRESS = "YOUR_ROUTER_ADDRESS"; // e.g. UniswapV2Router02
const TOKEN_LIST = [
  {
    symbol: "USDT",
    address: "YOUR_USDT_ADDRESS",
  },
  {
    symbol: "FLUID",
    address: "YOUR_FLUID_ADDRESS",
  },
];
/* ======================================================== */

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

const ROUTER_ABI = [
  "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
];

interface AdvancedSwapProps {
  onSwap?: () => void;
}

export default function AdvancedSwap({ onSwap }: AdvancedSwapProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [providerPresent, setProviderPresent] = useState<boolean>(false);
  const [tokenInIndex, setTokenInIndex] = useState(0);
  const [tokenOutIndex, setTokenOutIndex] = useState(1);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [decimalsMap, setDecimalsMap] = useState<Record<string, number>>({});
  const [balanceMap, setBalanceMap] = useState<Record<string, string>>({});
  const [slippage, setSlippage] = useState<number>(1); // percent
  const [deadlineMinutes, setDeadlineMinutes] = useState<number>(20);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [approvalNeeded, setApprovalNeeded] = useState<boolean>(false);
  const [approveMax, setApproveMax] = useState<boolean>(true);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceImpactPct, setPriceImpactPct] = useState<number | null>(null);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // computed helpers
  const tokenIn = TOKEN_LIST[tokenInIndex];
  const tokenOut = TOKEN_LIST[tokenOutIndex];

  const hasWallet = typeof window !== "undefined" && !!(window as any).ethereum;

  // Connect wallet (reads address only) — non-invasive; does not change existing DEX code.
  useEffect(() => {
    if (!hasWallet) {
      setProviderPresent(false);
      return;
    }
    setProviderPresent(true);

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    // try to get the accounts (non-blocking)
    provider.send("eth_requestAccounts", []).then((accounts: string[]) => {
      if (accounts && accounts.length) setAccount(accounts[0]);
    }).catch(() => {
      // user might not have connected; that's fine
    });
  }, []);

  // Load token decimals and balances for tokens in TOKEN_LIST
  useEffect(() => {
    if (!providerPresent || !account) return;

    const load = async () => {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = provider.getSigner();
        const decimalsObj: Record<string, number> = {};
        const balancesObj: Record<string, string> = {};

        for (const t of TOKEN_LIST) {
          try {
            const token = new ethers.Contract(t.address, ERC20_ABI, signer);
            const d = Number(await token.decimals());
            decimalsObj[t.address] = d;
            const bal = await token.balanceOf(account);
            // format for display
            balancesObj[t.address] = ethers.formatUnits(bal, d);
          } catch (err) {
            decimalsObj[t.address] = t.symbol === "USDT" ? 6 : 18; // fallback guess
            balancesObj[t.address] = "0";
          }
        }

        setDecimalsMap(decimalsObj);
        setBalanceMap(balancesObj);
      } catch (err) {
        console.error("load decimals/balances", err);
      }
    };

    load();
  }, [providerPresent, account]);

  // getAmountOut (quote) using router.getAmountsOut
  const fetchQuote = async () => {
    setError(null);
    setPriceImpactPct(null);
    setEstimatedGas(null);

    if (!hasWallet || !amountIn) {
      setAmountOut("");
      return;
    }

    try {
      setPriceLoading(true);
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = provider.getSigner();
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

      const inDecimals = decimalsMap[tokenIn.address] ?? (tokenIn.symbol === "USDT" ? 6 : 18);
      const outDecimals = decimalsMap[tokenOut.address] ?? (tokenOut.symbol === "USDT" ? 6 : 18);

      const amountInWei = ethers.parseUnits(amountIn || "0", inDecimals);
      if (amountInWei === 0n) {
        setAmountOut("");
        setPriceLoading(false);
        return;
      }

      const path = [tokenIn.address, tokenOut.address];
      const amounts = await router.getAmountsOut(amountInWei, path);
      const outWei = amounts[1];
      const outHuman = ethers.formatUnits(outWei, outDecimals);
      setAmountOut(outHuman);

      // Simple price impact estimation:
      // - getAmountsOut for a small base (1 tokenIn) to estimate spot rate
      try {
        const baseUnit = ethers.parseUnits("1", inDecimals);
        const baseAmounts = await router.getAmountsOut(baseUnit, path);
        const baseOut = baseAmounts[1];
        // price for 1 tokenIn in tokenOut units:
        const spot = Number(ethers.formatUnits(baseOut, outDecimals));
        const quoted = Number(outHuman) / Number(amountIn || "1");
        // price impact pct roughly = (spot - quoted)/spot * 100
        if (spot > 0) {
          const impact = ((spot - quoted) / spot) * 100;
          setPriceImpactPct(Number(impact.toFixed(3)));
        } else {
          setPriceImpactPct(null);
        }
      } catch (err) {
        setPriceImpactPct(null);
      }

      // Check if approval is needed for tokenIn
      const tokenContract = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);
      const allowance = await tokenContract.allowance(account, ROUTER_ADDRESS);
      setApprovalNeeded(allowance < amountInWei);

      // Estimate gas for swap (simulate)
      try {
        const deadline = Math.floor(Date.now() / 1000) + deadlineMinutes * 60;
        // compute minOut with slippage
        const minOut = BigInt(outWei) * BigInt(100 - Math.floor(slippage)) / BigInt(100);
        const callData = router.estimateGas.swapExactTokensForTokens(
          amountInWei,
          minOut,
          path,
          account,
          deadline
        );
        const gasEst = await callData;
        // convert to human-friendly
        setEstimatedGas(gasEst.toString());
      } catch (err) {
        // silent: some routers may not support estimateGas or reverts on estimate route
        setEstimatedGas(null);
      }
    } catch (err: any) {
      console.error("fetchQuote:", err);
      setAmountOut("");
      setError(err?.message ?? "Failed to fetch quote");
    } finally {
      setPriceLoading(false);
    }
  };

  // refetch quote when inputs change
  useEffect(() => {
    // debounce small
    const t = setTimeout(() => {
      fetchQuote();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountIn, tokenInIndex, tokenOutIndex, slippage, deadlineMinutes, account, decimalsMap]);

  // Approve tokenIn (approve max or exact)
  const approveToken = async () => {
    setError(null);
    if (!hasWallet || !account) return;
    setIsApproving(true);

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = provider.getSigner();
      const token = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);

      // approve a large number if approveMax (infinite approve pattern)
      const approveAmount = approveMax
        ? ethers.parseUnits("1000000000", decimalsMap[tokenIn.address] ?? 18) // big number
        : ethers.parseUnits(amountIn || "0", decimalsMap[tokenIn.address] ?? 18);

      const tx = await token.approve(ROUTER_ADDRESS, approveAmount);
      await tx.wait();

      // after approve, update flag
      const allowance = await token.allowance(account, ROUTER_ADDRESS);
      setApprovalNeeded(allowance < ethers.parseUnits(amountIn || "0", decimalsMap[tokenIn.address] ?? 18));
    } catch (err: any) {
      console.error("approveToken:", err);
      setError(err?.message ?? "Approval failed");
    } finally {
      setIsApproving(false);
    }
  };

  // Execute swap
  const executeSwap = async () => {
    setError(null);
    if (!hasWallet || !account) {
      setError("Wallet not detected. Please connect your wallet.");
      return;
    }
    if (!amountIn) {
      setError("Enter amount to swap.");
      return;
    }

    setIsSwapping(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = provider.getSigner();
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

      const inDecimals = decimalsMap[tokenIn.address] ?? (tokenIn.symbol === "USDT" ? 6 : 18);
      const outDecimals = decimalsMap[tokenOut.address] ?? (tokenOut.symbol === "USDT" ? 6 : 18);

      const amountInWei = ethers.parseUnits(amountIn, inDecimals);

      // Ensure approval if required
      const tokenContract = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);
      const allowance = await tokenContract.allowance(account, ROUTER_ADDRESS);
      if (allowance < amountInWei) {
        setError("Approval required. Approve token first.");
        setIsSwapping(false);
        return;
      }

      // compute minOut with slippage
      const path = [tokenIn.address, tokenOut.address];
      const amounts = await router.getAmountsOut(amountInWei, path);
      const outWei = amounts[1];
      const minOut = BigInt(outWei) * BigInt(100 - Math.floor(slippage)) / BigInt(100);

      const deadline = Math.floor(Date.now() / 1000) + deadlineMinutes * 60;

      // perform swap (gas estimation + sending)
      const estimate = await router.estimateGas.swapExactTokensForTokens(
        amountInWei,
        minOut,
        path,
        account,
        deadline
      ).catch(() => null);

      if (estimate) {
        // Optional: you could show gas estimate to the user, but we just store it
        setEstimatedGas(estimate.toString());
      }

      const tx = await router.swapExactTokensForTokens(
        amountInWei,
        minOut,
        path,
        account,
        deadline
      );

      await tx.wait();

      // update balances locally
      // try to re-fetch balances for tokens
      try {
        const tokenInC = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);
        const tokenOutC = new ethers.Contract(tokenOut.address, ERC20_ABI, signer);
        const balIn = await tokenInC.balanceOf(account);
        const balOut = await tokenOutC.balanceOf(account);
        setBalanceMap(prev => ({
          ...prev,
          [tokenIn.address]: ethers.formatUnits(balIn, inDecimals),
          [tokenOut.address]: ethers.formatUnits(balOut, outDecimals),
        }));
      } catch (err) {
        // ignore
      }

      onSwap && onSwap();
      // reset inputs
      setAmountIn("");
      setAmountOut("");
    } catch (err: any) {
      console.error("executeSwap:", err);
      setError(err?.message ?? "Swap failed");
    } finally {
      setIsSwapping(false);
    }
  };

  // Swap token selection
  const switchTokens = () => {
    const newIn = tokenOutIndex;
    const newOut = tokenInIndex;
    setTokenInIndex(newIn);
    setTokenOutIndex(newOut);
    setAmountOut("");
    setPriceImpactPct(null);
  };

  // display simple helper strings
  const inBalance = balanceMap[tokenIn.address] ?? "0";
  const outBalance = balanceMap[tokenOut.address] ?? "0";

  // UI
  return (
    <Card className="card-glow hover:scale-[1.01] transition-transform">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowUpDown className="w-5 h-5 text-primary" />
          Advanced Swap (Uniswap-style)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Wallet / Account */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Connected account</p>
            <p className="font-mono text-sm">{account ? `${account.slice(0,6)}...${account.slice(-4)}` : "Not connected"}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Slippage</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={0}
                value={slippage}
                onChange={(e) => setSlippage(Number(e.target.value))}
                className="w-20 p-2 rounded-md border bg-background text-sm"
              />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        {/* From */}
        <div>
          <label className="text-sm font-medium">From</label>
          <div className="flex gap-2 items-center mt-2">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              placeholder="0.0"
              className="flex-1 p-3 rounded-md border bg-background"
            />
            <div className="w-36 flex flex-col">
              <select
                value={tokenInIndex}
                onChange={(e) => setTokenInIndex(Number(e.target.value))}
                className="p-2 rounded-md border bg-background"
              >
                {TOKEN_LIST.map((t, i) => (
                  <option key={t.address} value={i}>{t.symbol}</option>
                ))}
              </select>
              <small className="text-xs text-muted-foreground mt-1">Balance: {Number(inBalance).toLocaleString()}</small>
            </div>
          </div>
        </div>

        {/* Switch */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={switchTokens}>
            <ArrowUpDown className="w-4 h-4" /> Switch
          </Button>
        </div>

        {/* To */}
        <div>
          <label className="text-sm font-medium">To</label>
          <div className="flex gap-2 items-center mt-2">
            <input
              type="text"
              value={priceLoading ? "…" : amountOut}
              disabled
              className="flex-1 p-3 rounded-md border bg-muted"
            />
            <div className="w-36 flex flex-col">
              <select
                value={tokenOutIndex}
                onChange={(e) => setTokenOutIndex(Number(e.target.value))}
                className="p-2 rounded-md border bg-background"
              >
                {TOKEN_LIST.map((t, i) => (
                  <option key={t.address} value={i}>{t.symbol}</option>
                ))}
              </select>
              <small className="text-xs text-muted-foreground mt-1">Balance: {Number(outBalance).toLocaleString()}</small>
            </div>
          </div>
        </div>

        {/* Price impact + deadline + estimated gas */}
        <div className="flex gap-4">
          <div className="flex-1 p-3 rounded-md border bg-background">
            <p className="text-xs text-muted-foreground">Price impact</p>
            <p className="font-semibold">{priceImpactPct === null ? "—" : `${priceImpactPct}%`}</p>
          </div>
          <div className="flex-1 p-3 rounded-md border bg-background">
            <p className="text-xs text-muted-foreground">Minimum received</p>
            <p className="font-semibold">
              {amountOut ? ( (Number(amountOut) * (1 - slippage/100)).toFixed(6) ) : "—"}
            </p>
          </div>
          <div className="w-40 p-3 rounded-md border bg-background">
            <p className="text-xs text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3" /> Deadline</p>
            <input
              type="number"
              min={1}
              value={deadlineMinutes}
              onChange={(e) => setDeadlineMinutes(Number(e.target.value))}
              className="w-full p-1 rounded-md text-sm bg-background"
            />
            <p className="text-xs text-muted-foreground">mins</p>
          </div>
        </div>

        {/* Approval / Swap actions */}
        <div className="space-y-2">
          {approvalNeeded ? (
            <div className="flex gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={approveMax} onChange={() => setApproveMax(!approveMax)} />
                Approve Max
              </label>
              <Button onClick={approveToken} disabled={isApproving} className="ml-auto">
                {isApproving ? "Approving..." : "Approve"}
              </Button>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">Token allowance sufficient for this swap.</div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={executeSwap}
              disabled={isSwapping || !amountIn || (approvalNeeded && !isApproving)}
              className="flex-1"
            >
              {isSwapping ? "Swapping..." : `Swap ${tokenIn.symbol} → ${tokenOut.symbol}`}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                // quick set max to input (balance)
                setAmountIn(inBalance || "0");
              }}
            >
              Max
            </Button>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-3">
            <Activity className="w-3 h-3" />
            <span>Estimated gas: {estimatedGas ? `${estimatedGas} (units)` : "—"}</span>
            {error && <span className="text-red-500">Error: {error}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}