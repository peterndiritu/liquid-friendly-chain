import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Code, Cpu, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Resources = () => {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Setup your wallet, connect to the network, and make your first transaction",
      link: "#getting-started"
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation with code examples and endpoints",
      link: "#api"
    },
    {
      icon: Cpu,
      title: "Smart Contracts",
      description: "Solidity tutorials, deployment guides, and best practices",
      link: "#contracts"
    },
    {
      icon: Download,
      title: "SDKs & Libraries",
      description: "JavaScript, TypeScript, Python, and Go development kits",
      link: "#sdks"
    }
  ];

  const networkInfo = [
    { label: "Chain ID", value: "56 (BSC Mainnet)" },
    { label: "RPC Endpoint", value: "https://bsc-dataseed.binance.org/" },
    { label: "Block Explorer", value: "https://bscscan.com" },
    { label: "Symbol", value: "FLD" }
  ];

  const developerTools = [
    { name: "Block Explorer", description: "View transactions and contracts", url: "https://bscscan.com" },
    { name: "Testnet Faucet", description: "Get testnet FLD tokens", url: "#faucet" },
    { name: "Contract Verifier", description: "Verify your smart contracts", url: "#verify" },
    { name: "Network Status", description: "Real-time network health", url: "#status" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Developer Resources
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Everything you need to build on Fluid Network - from quick starts to advanced integrations
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <category.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <a href={category.link} className="text-primary hover:underline inline-flex items-center gap-2">
                  Learn more <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network Information */}
      <section id="network-info" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Network Information
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {networkInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">{info.label}</p>
                <p className="font-mono text-sm font-semibold break-all">{info.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section id="tools" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Developer Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {developerTools.map((tool, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button variant="outline" asChild>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Access Tool <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section id="whitepaper" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Technical Whitepaper
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Deep dive into Fluid Network's architecture, consensus mechanism, and technical specifications
          </p>
          <Button size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download Whitepaper
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;