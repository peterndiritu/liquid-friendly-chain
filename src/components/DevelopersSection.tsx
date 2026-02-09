import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Terminal, FileCode, TestTube, ExternalLink } from "lucide-react";

const DevelopersSection = () => {
  const tools = [
    { icon: Package, text: "TypeScript SDK" },
    { icon: Terminal, text: "Command-line interface" },
    { icon: FileCode, text: "Smart contract templates" },
    { icon: TestTube, text: "Public testnet with faucet" },
  ];

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">DEVELOPERS</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {tools.map((tool, index) => (
              <div key={index} className="flex items-start gap-3">
                <tool.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{tool.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-muted/50 border-border">
              <p className="text-xs text-muted-foreground mb-2 font-medium">INSTALL</p>
              <pre className="text-sm font-mono text-foreground">
                <code>npm install @fluid/sdk</code>
              </pre>
            </Card>

            <Card className="p-4 bg-muted/50 border-border">
              <p className="text-xs text-muted-foreground mb-2 font-medium">CLI</p>
              <pre className="text-sm font-mono text-foreground">
                <code>npx fluid init my-project</code>
              </pre>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="/resources">View Full Docs</a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://github.com/fluidnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://discord.gg/fluidnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              Discord
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DevelopersSection;
