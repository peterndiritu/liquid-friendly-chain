import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Layers, Zap, Link as LinkIcon } from "lucide-react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

const WalletSection = () => {
  const features = [
    { icon: Key, text: "Non-custodial key ownership" },
    { icon: Layers, text: "Multi-asset support (FLD, stablecoins, wrapped assets)" },
    { icon: Zap, text: "Gas abstraction for seamless UX" },
    { icon: LinkIcon, text: "Native integration with Fluid chain" },
  ];

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">WALLET</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          <Card className="p-4 bg-muted/50 border-border">
            <p className="text-xs text-muted-foreground mb-3 font-medium">CONNECT</p>
            <ConnectButton
              client={client}
              connectModal={{
                size: "compact",
                title: "Connect Wallet",
              }}
              theme="dark"
            />
            <p className="text-xs text-muted-foreground mt-3">
              MetaMask, WalletConnect, Coinbase Wallet supported.
            </p>
          </Card>
        </div>

        <div className="mt-6">
          <Button variant="outline" size="sm" asChild>
            <a href="/resources#wallet">View Wallet Guide</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
