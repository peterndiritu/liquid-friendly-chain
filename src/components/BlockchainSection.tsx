import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Database, Code, ExternalLink } from "lucide-react";

const BlockchainSection = () => {
  const features = [
    { icon: Cpu, text: "Low-fee execution layer" },
    { icon: Database, text: "Data availability optimized" },
    { icon: Code, text: "Smart contracts for real applications" },
  ];

  const chainInfo = {
    chainId: "137",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
  };

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">BLOCKCHAIN</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
            <p className="text-muted-foreground text-sm pt-2">
              Purpose-built for hosting and finance workloads.
            </p>
          </div>

          <Card className="p-4 bg-muted/50 border-border space-y-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium">CHAIN ID</p>
              <code className="text-sm font-mono text-foreground">{chainInfo.chainId}</code>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">RPC</p>
              <code className="text-sm font-mono text-foreground break-all">{chainInfo.rpc}</code>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-primary" asChild>
                <a 
                  href={chainInfo.explorer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm"
                >
                  Block Explorer
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Button variant="outline" size="sm" asChild>
            <a href="/resources#blockchain">View Chain Docs</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
