import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Droplet, Code, Rocket, ExternalLink, Play, BookOpen } from "lucide-react";

const StartBuilding = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Install MetaMask or your preferred wallet and add Fluid Network",
      action: "Setup Guide",
      link: "#wallet-setup"
    },
    {
      icon: Droplet,
      title: "Get Testnet FLD",
      description: "Request free testnet tokens from our faucet to start testing",
      action: "Get Tokens",
      link: "#faucet"
    },
    {
      icon: Code,
      title: "Deploy Your First Contract",
      description: "Follow our step-by-step tutorial to deploy a smart contract",
      action: "Start Tutorial",
      link: "#tutorial"
    },
    {
      icon: Rocket,
      title: "Launch Your dApp",
      description: "Build and deploy your decentralized application on mainnet",
      action: "Deploy Now",
      link: "#deploy"
    }
  ];

  const frameworks = [
    {
      name: "Hardhat",
      description: "Ethereum development environment for professionals",
      code: `npm install --save-dev hardhat
npx hardhat init`
    },
    {
      name: "Truffle",
      description: "Development framework for Ethereum-based dApps",
      code: `npm install -g truffle
truffle init`
    },
    {
      name: "Remix IDE",
      description: "Browser-based IDE for smart contract development",
      code: "No installation required - Use online at remix.ethereum.org"
    }
  ];

  const resources = [
    { icon: BookOpen, title: "Documentation", description: "Complete API and SDK documentation", link: "/resources" },
    { icon: Code, title: "Code Examples", description: "Sample contracts and dApps", link: "#examples" },
    { icon: Play, title: "Video Tutorials", description: "Step-by-step video guides", link: "#videos" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Start Building on Fluid Network
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get started with Fluid Network in minutes. Build fast, scalable dApps with our developer-friendly tools and comprehensive documentation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Play className="w-5 h-5" />
              Quick Start Guide
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/resources">View Documentation</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Four Steps to Your First dApp
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{step.description}</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={step.link}>{step.action}</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Environment */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Development Environment
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fluid Network is compatible with all popular Ethereum development tools
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-2">{framework.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{framework.description}</p>
                <div className="bg-background rounded-md p-4 font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-all">{framework.code}</pre>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network Configuration */}
      <section id="wallet-setup" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Network Configuration
          </h2>
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Add Fluid Network to MetaMask</h3>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Network Name</p>
                  <p className="font-mono text-sm">Fluid Network</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chain ID</p>
                  <p className="font-mono text-sm">56</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">RPC URL</p>
                  <p className="font-mono text-sm break-all">https://bsc-dataseed.binance.org/</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Currency Symbol</p>
                  <p className="font-mono text-sm">FLD</p>
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto">
              Add to MetaMask Automatically
            </Button>
          </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Learning Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <resource.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="outline" asChild>
                  <a href={resource.link}>
                    Explore <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our Discord community for support from the Fluid Network team and fellow developers
          </p>
          <Button size="lg" asChild>
            <a href="/community" className="gap-2">
              Join Developer Community <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartBuilding;