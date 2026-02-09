import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, TrendingUp, Shield, ExternalLink } from "lucide-react";

const EndowmentSection = () => {
  const features = [
    { icon: Landmark, text: "Protocol-owned treasury" },
    { icon: TrendingUp, text: "Capital deployed on-chain for yield" },
    { icon: Shield, text: "Returns fund development and incentives" },
  ];

  const treasuryAddress = "0xaf3F...946b";

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">ENDOWMENT</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
            <p className="text-muted-foreground text-sm pt-2">
              All flows verifiable via block explorer.
            </p>
          </div>

          <Card className="p-4 bg-muted/50 border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">TREASURY</p>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-foreground">{treasuryAddress}</code>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                <a 
                  href="https://polygonscan.com/address/0xaf3F7E01631dea1198EF66e069D2A7db9085946b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              View treasury allocation and yield flows on-chain.
            </p>
          </Card>
        </div>

        <div className="mt-6">
          <Button variant="outline" size="sm" asChild>
            <a href="/resources#endowment">View Endowment Docs</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EndowmentSection;
