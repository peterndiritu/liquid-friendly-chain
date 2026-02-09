import { Button } from "@/components/ui/button";
import fluidLogo from "@/assets/fluid-logo.png";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Button asChild>
            <a href="/dex">Launch App</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/resources#whitepaper">Whitepaper</a>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://github.com/fluidnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://discord.gg/fluidnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Discord
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>

        {/* Brand + Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <img src={fluidLogo} alt="Fluid" className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">Fluid Network</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
