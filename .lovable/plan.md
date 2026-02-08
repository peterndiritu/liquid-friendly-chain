
# Plan: Create Admin Dashboard with Full ABI Integration

## Overview

Build a comprehensive Admin Dashboard that provides contract owner functionality using the provided FLUID Token smart contract ABI. The dashboard will be restricted to the deployer address (`0xaf3F7E01631dea1198EF66e069D2A7db9085946b`) and include all admin functions from the ABI.

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────────────┐
│                        Admin Dashboard                              │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  Access Control │  │  Contract Stats │  │   Wallet Status     │ │
│  │  (Owner Check)  │  │   (Read-only)   │  │  (Polygon Chain)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│                        Admin Functions                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐    │
│  │  Price Control │  │  Emergency     │  │  Payment Tokens    │    │
│  │  - setPrice    │  │  - setEmergency│  │  - setPaymentToken │    │
│  └────────────────┘  └────────────────┘  └────────────────────┘    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐    │
│  │  Chainlink     │  │  Liquidity     │  │  Incentives        │    │
│  │  - setFeed     │  │  - unlock      │  │  - sendIncentive   │    │
│  │                │  │  - claim       │  │                    │    │
│  └────────────────┘  └────────────────┘  └────────────────────┘    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐    │
│  │  Vesting Claims│  │  Ownership     │  │  Airdrop/Pools     │    │
│  │  - claimTeam   │  │  - transfer    │  │  - View stats      │    │
│  │  - claimFound  │  │  - renounce    │  │                    │    │
│  └────────────────┘  └────────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/lib/fluidContract.ts` | **CREATE** | Contract configuration with full ABI and constants |
| `src/hooks/useFluidContract.ts` | **CREATE** | Hook for reading contract state |
| `src/hooks/useAdminActions.ts` | **CREATE** | Hook for admin write functions |
| `src/pages/AdminDashboard.tsx` | **CREATE** | Main admin dashboard page |
| `src/components/admin/AdminAccessGuard.tsx` | **CREATE** | Owner verification component |
| `src/components/admin/ContractStatsCard.tsx` | **CREATE** | Display pool allocations and progress |
| `src/components/admin/PriceControlCard.tsx` | **CREATE** | Set token price (USD6 format) |
| `src/components/admin/EmergencyCard.tsx` | **CREATE** | Emergency stop toggle |
| `src/components/admin/PaymentTokensCard.tsx` | **CREATE** | Manage allowed payment tokens |
| `src/components/admin/LiquidityCard.tsx` | **CREATE** | Unlock and claim liquidity |
| `src/components/admin/IncentivesCard.tsx` | **CREATE** | Send airdrop incentives |
| `src/components/admin/VestingClaimsCard.tsx` | **CREATE** | Team and foundation claims |
| `src/components/admin/OwnershipCard.tsx` | **CREATE** | Transfer/renounce ownership |
| `src/components/admin/ChainlinkCard.tsx` | **CREATE** | Set native/USD price feed |
| `src/components/AnimatedRoutes.tsx` | **MODIFY** | Add /admin route |
| `src/components/Navigation.tsx` | **MODIFY** | Add admin link (visible only to owner) |

---

## Detailed Implementation

### 1. Contract Configuration (`src/lib/fluidContract.ts`)

```typescript
// Contract address on Polygon Mainnet
export const FLUID_CONTRACT_ADDRESS = "0xaf3F7E01631dea1198EF66e069D2A7db9085946b";
export const DEPLOYER_ADDRESS = "0xaf3F7E01631dea1198EF66e069D2A7db9085946b";
export const POLYGON_CHAIN_ID = 137;

// Full ABI from user input
export const FLUID_ABI = [...]; // Complete ABI array

// Helper to format USD6 prices (tokenPriceUsd6 uses 6 decimals)
export const formatUsd6 = (value: bigint): string => {
  return (Number(value) / 1_000_000).toFixed(6);
};

export const parseUsd6 = (usd: string): bigint => {
  return BigInt(Math.floor(parseFloat(usd) * 1_000_000));
};
```

### 2. Contract Read Hook (`src/hooks/useFluidContract.ts`)

Read all contract state values:

| Function | Returns | Description |
|----------|---------|-------------|
| `owner()` | address | Current contract owner |
| `tokenPriceUsd6()` | uint256 | Token price in USD (6 decimals) |
| `emergencyStop()` | bool | Is emergency mode active |
| `presaleSold()` | uint256 | Total FLD sold in presale |
| `airdropUsed()` | uint256 | Airdrop tokens distributed |
| `incentivesUsed()` | uint256 | Incentive tokens sent |
| `liquidityClaimed()` | uint256 | Liquidity pool claimed |
| `liquidityUnlocked()` | bool | Is liquidity unlocked |
| `teamClaimed()` | uint256 | Team vested tokens claimed |
| `foundationClaimed()` | uint256 | Foundation vested claimed |
| `vestingStart()` | uint256 | Vesting start timestamp |
| `PRESALE_POOL()` | uint256 | Total presale allocation |
| `AIRDROP_POOL()` | uint256 | Total airdrop allocation |
| `TEAM_POOL()` | uint256 | Team allocation |
| `FOUND_POOL()` | uint256 | Foundation allocation |
| `LIQ_POOL()` | uint256 | Liquidity allocation |
| `INC_POOL()` | uint256 | Incentives allocation |
| `ECO_POOL()` | uint256 | Ecosystem allocation |
| `CLIFF()` | uint256 | Vesting cliff period |
| `VESTING_DURATION()` | uint256 | Total vesting duration |

### 3. Admin Actions Hook (`src/hooks/useAdminActions.ts`)

All write functions for admin:

| Function | Parameters | Description |
|----------|------------|-------------|
| `setPrice(p)` | uint256 (USD6) | Set token price |
| `setEmergency(s)` | bool | Toggle emergency stop |
| `setPaymentToken(t, ok)` | address, bool | Allow/disallow payment token |
| `setFeed(f)` | address | Set Chainlink price feed |
| `unlockLiquidity()` | none | Unlock liquidity pool |
| `claimLiquidity(to, amt)` | address, uint256 | Claim liquidity tokens |
| `sendIncentive(to, amt)` | address, uint256 | Send incentive tokens |
| `claimTeam()` | none | Claim vested team tokens |
| `claimFoundation()` | none | Claim vested foundation tokens |
| `transferOwnership(newOwner)` | address | Transfer contract ownership |
| `renounceOwnership()` | none | Renounce ownership (irreversible) |

### 4. Admin Dashboard Page Layout

```text
┌────────────────────────────────────────────────────────────────┐
│  🔒 FLUID Admin Dashboard               [Connected: 0xaf3...]  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  📊 Contract Overview                                    │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│  │  │ Presale  │ │ Airdrop  │ │ Liquidity│ │ Incentive│   │  │
│  │  │ 2.5M/4M  │ │ 1.2M/3M  │ │ Locked   │ │ 500K/1M  │   │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────┐ ┌─────────────────────────────────┐  │
│  │  💰 Price Control   │ │  🚨 Emergency Stop              │  │
│  │  Current: $1.00     │ │  Status: INACTIVE               │  │
│  │  [____] [Update]    │ │  [Activate] [Deactivate]        │  │
│  └─────────────────────┘ └─────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────┐ ┌─────────────────────────────────┐  │
│  │  🪙 Payment Tokens  │ │  🔗 Chainlink Feed              │  │
│  │  USDT: ✅ Allowed    │ │  Feed: 0x...                    │  │
│  │  USDC: ✅ Allowed    │ │  [____] [Set Feed]              │  │
│  │  [Add Token...]     │ │                                 │  │
│  └─────────────────────┘ └─────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  💧 Liquidity Management                                 │  │
│  │  Pool: 1,000,000 FLD | Claimed: 0 | Status: LOCKED      │  │
│  │  [Unlock Liquidity]  [Claim: ___ to 0x___]              │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────┐ ┌─────────────────────────────────┐  │
│  │  🎁 Incentives      │ │  📅 Vesting Claims              │  │
│  │  Pool: 1M FLD       │ │  Team: 500K vested (claim)      │  │
│  │  Used: 500K FLD     │ │  Foundation: 300K vested        │  │
│  │  [Send: ___ to ___] │ │  [Claim Team] [Claim Foundation]│  │
│  └─────────────────────┘ └─────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  🔐 Ownership (Danger Zone)                              │  │
│  │  Current Owner: 0xaf3F7E01631dea1198EF66e069D2A7db...   │  │
│  │  [Transfer to: ____]  [⚠️ Renounce Ownership]            │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 5. Access Control Flow

```text
User visits /admin
       │
       ▼
┌──────────────────┐
│ Check if wallet  │
│   connected?     │
└────────┬─────────┘
         │
    No ──┴── Yes
    │         │
    ▼         ▼
┌────────┐  ┌──────────────────┐
│ Show   │  │ Fetch owner()    │
│ Connect│  │ from contract    │
│ Prompt │  └────────┬─────────┘
└────────┘           │
                     ▼
         ┌─────────────────────┐
         │ wallet === owner?   │
         └────────┬────────────┘
                  │
           No ────┴──── Yes
           │             │
           ▼             ▼
    ┌────────────┐  ┌────────────────┐
    │ Access     │  │ Show Admin     │
    │ Denied     │  │ Dashboard      │
    │ Message    │  │ with all       │
    └────────────┘  │ functions      │
                    └────────────────┘
```

### 6. Presale Enhancement

Update the existing presale purchase flow to use the new ABI functions:

- **buyWithNative(amount)**: Purchase using native MATIC
- **buyWithERC20(payToken, amount)**: Purchase using allowed ERC20 tokens
- Check `allowedPaymentTokens[token]` before allowing purchase
- Display `tokenPriceUsd6()` for accurate pricing
- Show `emergencyStop` status to disable purchases when active

---

## Technical Details

### Contract Interaction Pattern

Using thirdweb SDK for all contract calls:

```typescript
import { getContract, prepareContractCall, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const polygonChain = defineChain(137);

const contract = getContract({
  client,
  chain: polygonChain,
  address: FLUID_CONTRACT_ADDRESS,
});

// Read function
const owner = await readContract({
  contract,
  method: "function owner() view returns (address)",
  params: [],
});

// Write function
const tx = prepareContractCall({
  contract,
  method: "function setPrice(uint256 p)",
  params: [parseUsd6("1.50")],
});
await sendTransaction(tx);
```

### USD6 Format Handling

The contract uses 6 decimal places for USD prices:
- `$1.00` = `1000000` (1 * 10^6)
- `$0.50` = `500000`
- `$1.25` = `1250000`

### Vesting Calculation

Use the `vested(total, claimed)` view function to calculate available vested amounts for team and foundation claims.

---

## Security Considerations

1. **Double Authorization**: Check both on-chain `owner()` and hardcoded `DEPLOYER_ADDRESS`
2. **Confirmation Dialogs**: Require confirmation for dangerous actions (renounce, large transfers)
3. **Amount Validation**: Validate all inputs before sending transactions
4. **Emergency Mode**: Clearly indicate when emergency stop is active
5. **Transaction Feedback**: Show pending/success/failed states for all operations

---

## Implementation Order

1. Create contract configuration with full ABI
2. Build read hook for contract state
3. Build write hook for admin actions
4. Create access guard component
5. Create individual admin function cards
6. Assemble main admin dashboard page
7. Add route and navigation link
8. Update presale widget to use new contract
