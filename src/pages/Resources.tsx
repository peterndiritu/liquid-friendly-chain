import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Code, Copy, Download, ExternalLink, Search, Terminal, Shield, Cpu, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FLUID_CONTRACT_ADDRESS, POLYGON_CHAIN_ID } from "@/lib/fluidContract";
import { useState } from "react";
import { toast } from "sonner";

const CodeBlock = ({ children, label }: { children: string; label?: string }) => {
  const copy = () => {
    navigator.clipboard.writeText(children);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="relative group">
      {label && <span className="text-xs text-muted-foreground mb-1 block">{label}</span>}
      <pre className="bg-muted/50 border border-border rounded-md p-4 overflow-x-auto text-sm font-mono text-foreground">
        <code>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-background border border-border"
        aria-label="Copy code"
      >
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  );
};

const SectionWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="py-16 px-4 md:px-6 border-b border-border">
    <div className="max-w-4xl mx-auto">{children}</div>
  </section>
);

const Resources = () => {
  const [search, setSearch] = useState("");

  const sdkMethods = [
    { method: "getBalance(address)", returns: "bigint", description: "Returns FLD token balance for an address" },
    { method: "getTokenPrice()", returns: "bigint", description: "Current token price in USD (6 decimals)" },
    { method: "buyWithNative(amount)", returns: "TransactionReceipt", description: "Purchase FLD with native MATIC" },
    { method: "buyWithERC20(token, amount)", returns: "TransactionReceipt", description: "Purchase FLD with approved ERC-20 token" },
    { method: "transfer(to, amount)", returns: "TransactionReceipt", description: "Transfer FLD tokens to another address" },
    { method: "approve(spender, amount)", returns: "TransactionReceipt", description: "Approve spending allowance for a spender" },
  ];

  const rpcMethods = [
    { method: "eth_getBalance", params: "[address, block]", description: "Native MATIC balance of an address" },
    { method: "eth_call", params: "[{to, data}, block]", description: "Execute a read-only contract call" },
    { method: "eth_sendRawTransaction", params: "[signedTx]", description: "Submit a signed transaction" },
    { method: "eth_getTransactionReceipt", params: "[txHash]", description: "Receipt and status of a mined transaction" },
    { method: "eth_getLogs", params: "[{address, topics, fromBlock, toBlock}]", description: "Query event logs by filter" },
    { method: "eth_blockNumber", params: "[]", description: "Current block height" },
  ];

  const contractFunctions = {
    presale: [
      { name: "buyWithNative(uint256 amount)", access: "Public", description: "Purchase FLD tokens with MATIC at current price" },
      { name: "buyWithERC20(address payToken, uint256 amount)", access: "Public", description: "Purchase FLD with an approved stablecoin" },
      { name: "tokenPriceUsd6()", access: "View", description: "Current price per FLD in USD with 6 decimal precision" },
      { name: "presaleSold()", access: "View", description: "Total FLD sold through presale" },
    ],
    vesting: [
      { name: "claimTeam()", access: "Team wallet", description: "Claim vested team allocation" },
      { name: "claimFoundation()", access: "Foundation wallet", description: "Claim vested foundation allocation" },
      { name: "claimLiquidity(address to, uint256 amt)", access: "Owner", description: "Release liquidity pool tokens" },
      { name: "vested(uint256 total, uint256 claimed)", access: "View", description: "Calculate currently vested amount" },
      { name: "vestingStart()", access: "View", description: "Timestamp when vesting schedule began" },
    ],
    admin: [
      { name: "setPrice(uint256 p)", access: "Owner", description: "Update FLD token price (USD, 6 decimals)" },
      { name: "setPaymentToken(address t, bool ok)", access: "Owner", description: "Whitelist or remove an ERC-20 payment token" },
      { name: "setFeed(address f)", access: "Owner", description: "Update Chainlink MATIC/USD price feed address" },
      { name: "setEmergency(bool s)", access: "Owner", description: "Toggle emergency stop on purchases" },
      { name: "sendIncentive(address to, uint256 amt)", access: "Owner", description: "Distribute tokens from incentive pool" },
      { name: "unlockLiquidity()", access: "Owner", description: "Unlock liquidity pool after cliff period" },
    ],
  };

  const whitepaperChapters = [
    { number: "01", title: "Architecture", description: "System design, layer structure, and protocol composition. Covers execution layer, data availability, and cross-component communication." },
    { number: "02", title: "Hosting Protocol", description: "Decentralized static hosting with content addressing, on-chain metadata, and ENS-style domain resolution. No centralized infrastructure." },
    { number: "03", title: "Endowment Economy", description: "Protocol-owned treasury model. Capital deployment, yield generation, and transparent fund allocation for development and incentives." },
    { number: "04", title: "Token Economics", description: "FLD supply distribution, vesting schedules, pool allocations (presale, team, foundation, liquidity, ecosystem, incentives, airdrop)." },
    { number: "05", title: "Security Model", description: "Smart contract audit methodology, immutable deployment history, emergency mechanisms, and access control architecture." },
    { number: "06", title: "Roadmap", description: "Phased delivery plan covering mainnet launch, SDK tooling, hosting beta, endowment activation, and governance rollout." },
  ];

  const networkInfo = [
    { label: "Chain ID", value: String(POLYGON_CHAIN_ID) },
    { label: "Network", value: "Polygon Mainnet" },
    { label: "RPC Endpoint", value: "https://polygon-rpc.com" },
    { label: "Block Explorer", value: "polygonscan.com" },
    { label: "Native Token", value: "MATIC" },
    { label: "FLD Contract", value: `${FLUID_CONTRACT_ADDRESS.slice(0, 6)}...${FLUID_CONTRACT_ADDRESS.slice(-4)}` },
  ];

  const devTools = [
    { name: "Block Explorer", description: "View transactions, contracts, and token transfers", url: "https://polygonscan.com", icon: Search },
    { name: "Testnet Faucet", description: "Request testnet FLD and MATIC for development", url: "#faucet", icon: Wallet },
    { name: "Contract Verifier", description: "Verify and publish smart contract source code", url: "#verify", icon: Shield },
    { name: "Network Status", description: "Real-time block production and network health", url: "#status", icon: Cpu },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 px-4 md:px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Developer Resources</h1>
          <p className="text-muted-foreground mb-6">
            SDK reference, contract documentation, and integration guides for building on Fluid.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search docs..."
              className="pl-10 h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <SectionWrapper id="getting-started">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Getting Started</h2>
        <p className="text-muted-foreground mb-8">Three steps from zero to a live transaction.</p>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold">1</span>
              <h3 className="text-lg font-semibold text-foreground">Install</h3>
            </div>
            <CodeBlock label="Terminal">npm install @fluid/sdk ethers</CodeBlock>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold">2</span>
              <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            </div>
            <CodeBlock label="app.ts">{`import { FluidClient } from "@fluid/sdk";

const client = new FluidClient({
  chainId: ${POLYGON_CHAIN_ID},
  rpc: "https://polygon-rpc.com",
});

const balance = await client.getBalance("0xYourAddress");
console.log("FLD Balance:", balance.toString());`}</CodeBlock>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold">3</span>
              <h3 className="text-lg font-semibold text-foreground">Transact</h3>
            </div>
            <CodeBlock label="purchase.ts">{`import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const tx = await client.buyWithNative(signer, {
  amount: ethers.parseEther("10"),  // 10 MATIC
});

console.log("TX Hash:", tx.hash);
await tx.wait();`}</CodeBlock>
          </div>
        </div>
      </SectionWrapper>

      {/* SDK Reference */}
      <SectionWrapper id="sdk">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">SDK Reference</h2>
        <p className="text-muted-foreground mb-6">Core methods available in <code className="font-mono text-sm bg-muted/50 px-1.5 py-0.5 rounded">@fluid/sdk</code></p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Returns</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sdkMethods.map((m) => (
              <TableRow key={m.method}>
                <TableCell className="font-mono text-sm">{m.method}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{m.returns}</TableCell>
                <TableCell className="text-muted-foreground">{m.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-foreground">CLI Tools</h3>
          <CodeBlock label="Terminal">{`npx @fluid/cli init my-project    # Scaffold a new Fluid project
npx @fluid/cli deploy ./dist      # Deploy static files to Fluid hosting
npx @fluid/cli status              # Check deployment and network status
npx @fluid/cli verify 0xContract   # Verify contract source on-chain`}</CodeBlock>
        </div>
      </SectionWrapper>

      {/* API Reference */}
      <SectionWrapper id="api">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">API Reference</h2>
        <p className="text-muted-foreground mb-6">JSON-RPC endpoints compatible with standard Ethereum tooling.</p>

        <CodeBlock label="Endpoint">POST https://polygon-rpc.com</CodeBlock>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Params</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rpcMethods.map((m) => (
                <TableRow key={m.method}>
                  <TableCell className="font-mono text-sm">{m.method}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{m.params}</TableCell>
                  <TableCell className="text-muted-foreground">{m.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <CodeBlock label="Example request">{`curl -X POST https://polygon-rpc.com \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [{
      "to": "${FLUID_CONTRACT_ADDRESS}",
      "data": "0x18160ddd"
    }, "latest"],
    "id": 1
  }'`}</CodeBlock>
          <p className="text-xs text-muted-foreground mt-2">
            <code className="font-mono">0x18160ddd</code> = <code className="font-mono">totalSupply()</code> function selector
          </p>
        </div>
      </SectionWrapper>

      {/* Smart Contracts */}
      <SectionWrapper id="contracts">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Smart Contracts</h2>
        <p className="text-muted-foreground mb-6">
          FLD token contract deployed on Polygon mainnet.
        </p>

        <Card className="p-4 mb-8 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Contract Address</p>
              <p className="font-mono text-sm text-foreground break-all">{FLUID_CONTRACT_ADDRESS}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={`https://polygonscan.com/address/${FLUID_CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer">
                View on Explorer <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </Card>

        {Object.entries(contractFunctions).map(([category, fns]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground capitalize">{category}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Function</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fns.map((fn) => (
                  <TableRow key={fn.name}>
                    <TableCell className="font-mono text-sm">{fn.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{fn.access}</TableCell>
                    <TableCell className="text-muted-foreground">{fn.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}

        <div className="mt-4">
          <CodeBlock label="Solidity Interface (partial)">{`interface IFluidToken {
    function buyWithNative(uint256 amount) external payable;
    function buyWithERC20(address payToken, uint256 amount) external;
    function tokenPriceUsd6() external view returns (uint256);
    function presaleSold() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
}`}</CodeBlock>
        </div>
      </SectionWrapper>

      {/* Network Info */}
      <SectionWrapper id="network">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Network Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {networkInfo.map((info) => (
            <Card key={info.label} className="p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{info.label}</p>
              <p className="font-mono text-sm font-medium text-foreground break-all">{info.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <CodeBlock label="Add to MetaMask">{`await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    rpcUrls: ["https://polygon-rpc.com"],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    blockExplorerUrls: ["https://polygonscan.com"]
  }]
});`}</CodeBlock>
        </div>
      </SectionWrapper>

      {/* Whitepaper */}
      <SectionWrapper id="whitepaper">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Technical Whitepaper</h2>
        <p className="text-muted-foreground mb-8">
          Protocol specification covering architecture, economics, and security.
        </p>

        <div className="space-y-4 mb-8">
          {whitepaperChapters.map((ch) => (
            <div key={ch.number} className="flex gap-4 p-4 border border-border rounded-md">
              <span className="font-mono text-sm text-muted-foreground mt-0.5">{ch.number}</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{ch.title}</h3>
                <p className="text-sm text-muted-foreground">{ch.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Download Whitepaper (PDF)
        </Button>
      </SectionWrapper>

      {/* Developer Tools */}
      <SectionWrapper id="tools">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Developer Tools</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {devTools.map((tool) => (
            <Card key={tool.name} className="p-5 border border-border">
              <div className="flex items-start gap-3">
                <tool.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      Open <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Resources;
