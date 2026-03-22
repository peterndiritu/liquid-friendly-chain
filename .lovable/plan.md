

# Plan: Enrich Resources Page with Real Content

## Overview

Rewrite `src/pages/Resources.tsx` to replace placeholder content with real, function-first documentation sections covering SDK usage, API reference, smart contract integration, whitepaper outline, and network details -- all consistent with the product-interface design language.

## Single File Change

**File:** `src/pages/Resources.tsx` — **REWRITE**

## New Page Structure

```text
┌──────────────────────────────────────────────────┐
│  HEADER: Developer Resources                      │
│  Subtitle + Search bar                            │
├──────────────────────────────────────────────────┤
│  GETTING STARTED                                  │
│  3-step quickstart (Install → Connect → Transact) │
│  Code blocks with real SDK snippets               │
├──────────────────────────────────────────────────┤
│  SDK REFERENCE                                    │
│  @fluid/sdk install + usage code block            │
│  Key methods table: connect, getBalance,          │
│  buyWithNative, buyWithERC20, transfer            │
│  CLI section: fluid init, fluid deploy, etc.      │
├──────────────────────────────────────────────────┤
│  API REFERENCE                                    │
│  JSON-RPC endpoints table with methods,           │
│  params, and descriptions                         │
│  Contract read/write methods from actual ABI      │
├──────────────────────────────────────────────────┤
│  SMART CONTRACTS                                  │
│  Contract address (from fluidContract.ts)          │
│  Deployed on Polygon (137)                        │
│  Key functions grouped: Presale, Vesting,         │
│  Admin, ERC20 standard                            │
│  Solidity interface snippet                       │
├──────────────────────────────────────────────────┤
│  NETWORK INFO                                     │
│  Chain ID, RPC, Explorer, Symbol cards            │
├──────────────────────────────────────────────────┤
│  WHITEPAPER                                       │
│  Expanded outline with 6 chapters:                │
│  Architecture, Hosting Protocol, Endowment,       │
│  Token Economics, Security Model, Roadmap         │
│  Each with brief description                      │
│  Download CTA                                     │
├──────────────────────────────────────────────────┤
│  DEVELOPER TOOLS                                  │
│  Explorer, Faucet, Verifier, Status cards         │
└──────────────────────────────────────────────────┘
```

## Content Details

**SDK code snippets** — Real usage of `@fluid/sdk`:
```ts
import { FluidClient } from "@fluid/sdk";
const client = new FluidClient({ chainId: 137, rpc: "https://polygon-rpc.com" });
const balance = await client.getBalance(address);
```

**API methods table** — Actual JSON-RPC methods: `eth_getBalance`, `eth_call`, `eth_sendRawTransaction`, `eth_getTransactionReceipt`, plus Fluid-specific: `fluid_getTokenPrice`, `fluid_getPresaleStatus`.

**Smart contract section** — Uses real contract address `0xAE28Aff9E9D6362C4d83817CF0cb37b907bB495A` from `fluidContract.ts`. Groups ABI functions into categories (Presale, Vesting, Admin, ERC20).

**Whitepaper outline** — 6 chapters with descriptions covering architecture, hosting protocol, endowment economy, tokenomics, security, and roadmap.

## Design

- Follows existing section pattern: `py-16 px-4 border-b border-border`, `max-w-4xl mx-auto`
- Code blocks use `bg-muted/50 font-mono text-sm` styling
- Tables use existing `Table` components
- No marketing language, function-first tone

