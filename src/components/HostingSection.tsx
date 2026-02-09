import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HardDrive, Link as LinkIcon, FileCode, Globe } from "lucide-react";

const HostingSection = () => {
  const features = [
    { icon: HardDrive, text: "Upload static files to permanent storage" },
    { icon: FileCode, text: "Content addressed by deterministic hash" },
    { icon: LinkIcon, text: "On-chain metadata for provenance" },
    { icon: Globe, text: "Domain mapping via ENS-style resolver" },
  ];

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">HOSTING</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
            <p className="text-muted-foreground text-sm pt-2">
              No centralized servers required.
            </p>
          </div>

          <Card className="p-4 bg-muted/50 border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">DEPLOY</p>
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{`$ fluid deploy ./dist
Uploading 12 files...
Hash: 0x7f3a...c4d2
Site live at fluid://your-site.fld`}</code>
            </pre>
          </Card>
        </div>

        <div className="mt-6">
          <Button variant="outline" size="sm" asChild>
            <a href="/resources#hosting">View Hosting Docs</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HostingSection;
