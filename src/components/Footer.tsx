import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import fluidLogo from "@/assets/fluid-logo.png";
import { 
  Twitter, 
  Github, 
  MessageCircle, 
  Send,
  Globe,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/fluidnetwork" },
    { icon: Github, label: "GitHub", href: "https://github.com/fluidnetwork" },
    { icon: MessageCircle, label: "Discord", href: "https://discord.gg/fluidnetwork" },
    { icon: Send, label: "Telegram", href: "https://t.me/fluidnetwork" }
  ];

  const quickLinks = [
    { label: "DEX", href: "/dex" },
    { label: "Documentation", href: "/resources" },
    { label: "Whitepaper", href: "/resources#whitepaper" },
    { label: "API Reference", href: "/resources#api" },
    { label: "Developer Tools", href: "/resources#tools" }
  ];

  const communityLinks = [
    { label: "Community Forum", href: "/community" },
    { label: "Bug Bounty", href: "/community#bug-bounty" },
    { label: "Brand Assets", href: "/community#brand-assets" },
    { label: "Media Kit", href: "/community#media-kit" }
  ];

  return (
    <footer className="py-12 md:py-16 lg:py-24 px-4 md:px-6 border-t border-border bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <Card className="card-glow p-4 md:p-6 lg:p-8 mb-8 md:mb-12 lg:mb-16 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 gradient-text">Stay Updated</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Get the latest updates on Fluid Network development, partnerships, and ecosystem growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                />
              </div>
              <Button className="button-glow">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          {/* Brand Section */}
          <div className="sm:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <img src={fluidLogo} alt="Fluid Network" className="w-10 h-10 md:w-12 md:h-12" />
              <div>
                <h3 className="text-lg md:text-xl font-bold gradient-text">Fluid Network</h3>
                <p className="text-xs md:text-sm text-muted-foreground">FLUID Token</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-md leading-relaxed">
              The next-generation blockchain platform enabling ultra-fast transactions, 
              seamless cross-chain connectivity, and revolutionary DeFi features.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 h-9 w-9 md:h-10 md:w-10 p-0"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in">
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground">Resources</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="animate-fade-in">
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-foreground">Community</h4>
            <ul className="space-y-2 md:space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 md:pt-8 border-t border-border animate-fade-in gap-4">
          <div className="flex items-center space-x-4 md:space-x-6">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © 2025 Fluid Network. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="/privacy-policy" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
              <Globe className="w-3 h-3 md:w-4 md:h-4" />
              <span>Global</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
