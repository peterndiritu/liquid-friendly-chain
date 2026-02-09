import { Button } from "@/components/ui/button";
import { Github, FileCheck, History, ExternalLink } from "lucide-react";

const SecuritySection = () => {
  const items = [
    { 
      icon: Github, 
      title: "Open Source", 
      description: "All contracts available on GitHub",
      link: "https://github.com/fluidnetwork",
      linkText: "View Repository"
    },
    { 
      icon: FileCheck, 
      title: "Audited", 
      description: "Security audits with public reports",
      link: "/resources#audits",
      linkText: "View Reports"
    },
    { 
      icon: History, 
      title: "Immutable", 
      description: "Deployment history verified on-chain",
      link: "https://polygonscan.com/address/0xaf3F7E01631dea1198EF66e069D2A7db9085946b",
      linkText: "View History"
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">SECURITY</h2>
        
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-medium text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-primary" asChild>
                <a 
                  href={item.link} 
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 text-sm"
                >
                  {item.linkText}
                  {item.link.startsWith("http") && <ExternalLink className="w-3 h-3" />}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
