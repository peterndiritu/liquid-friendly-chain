import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import liquidChainLogo from "@/assets/liquid-chain-logo.png";
import { 
  Twitter, 
  Github, 
  MessageCircle, 
  Send,
  Globe,
  Mail,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
    { icon: Send, label: "Telegram", href: "#" }
  ];

  const quickLinks = [
    { label: "Documentation", href: "#" },
    { label: "Whitepaper", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Developer Tools", href: "#" }
  ];

  const communityLinks = [
    { label: "Community Forum", href: "#" },
    { label: "Bug Bounty", href: "#" },
    { label: "Brand Assets", href: "#" },
    { label: "Media Kit", href: "#" }
  ];

  return (
    <footer className="py-24 px-6 border-t border-border bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <Card className="card-glow p-8 mb-16 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on Liquid Chain development, partnerships, and ecosystem growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <img src={liquidChainLogo} alt="Liquid Chain" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold gradient-text">Liquid Chain</h3>
                <p className="text-sm text-muted-foreground">LQD Token</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The next-generation blockchain platform enabling ultra-fast transactions, 
              seamless cross-chain connectivity, and revolutionary DeFi features.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Resources</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Community</h4>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border animate-fade-in">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Liquid Chain. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Global</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;