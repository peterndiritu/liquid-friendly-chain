import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Eye, 
  Zap, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Fingerprint,
  Key,
  Cpu
} from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Quantum-Resistant Cryptography",
      description: "Advanced post-quantum cryptographic algorithms protecting against future quantum computing threats.",
      details: ["Lattice-based encryption", "Hash-based signatures", "Quantum-safe key exchange"]
    },
    {
      icon: Eye,
      title: "AI-Powered Threat Detection",
      description: "Machine learning algorithms continuously monitor network activity for suspicious behavior and potential attacks.",
      details: ["Real-time monitoring", "Pattern recognition", "Automated response"]
    },
    {
      icon: Lock,
      title: "Multi-Layer Security",
      description: "Comprehensive security framework with multiple layers of protection and redundant safety measures.",
      details: ["Defense in depth", "Redundant systems", "Fail-safe mechanisms"]
    },
    {
      icon: Key,
      title: "Advanced Key Management",
      description: "Secure key generation, distribution, and storage with hardware security module integration.",
      details: ["HSM integration", "Secure key derivation", "Multi-signature support"]
    },
    {
      icon: Fingerprint,
      title: "Identity Verification",
      description: "Biometric authentication and identity verification systems for enhanced user security.",
      details: ["Biometric auth", "Identity proofs", "Privacy preservation"]
    },
    {
      icon: Users,
      title: "Decentralized Security",
      description: "Distributed security model eliminating single points of failure and enhancing overall network resilience.",
      details: ["No single point of failure", "Distributed consensus", "Network resilience"]
    }
  ];

  const audits = [
    {
      company: "CertiK",
      status: "Completed",
      score: "98/100",
      date: "December 2024"
    },
    {
      company: "Quantstamp",
      status: "Completed", 
      score: "A+",
      date: "November 2024"
    },
    {
      company: "Trail of Bits",
      status: "In Progress",
      score: "Pending",
      date: "January 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Security</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Military-grade security protocols protecting your assets with next-generation cryptography and AI-powered threat detection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-glow animate-glow-pulse">
                Security Audit Report
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Bug Bounty Program
              </Button>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Security Architecture</h2>
              <p className="text-xl text-muted-foreground">
                Multi-layered security framework designed to protect against current and future threats
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="card-glow p-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Audits */}
        <section className="py-20 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Security Audits</h2>
              <p className="text-xl text-muted-foreground">
                Independent security assessments by leading blockchain security firms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audits.map((audit, index) => (
                <Card key={index} className="card-glow p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 mx-auto flex items-center justify-center mb-3">
                      {audit.status === "Completed" ? 
                        <CheckCircle className="w-8 h-8 text-white" /> :
                        <Cpu className="w-8 h-8 text-white" />
                      }
                    </div>
                    <h3 className="text-lg font-bold">{audit.company}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={audit.status === "Completed" ? "text-green-500" : "text-yellow-500"}>
                        {audit.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-semibold">{audit.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{audit.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="card-glow p-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">99.99%</div>
                  <p className="text-muted-foreground">Network Uptime</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">0</div>
                  <p className="text-muted-foreground">Security Breaches</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">$2M</div>
                  <p className="text-muted-foreground">Bug Bounty Pool</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold gradient-text">24/7</div>
                  <p className="text-muted-foreground">Security Monitoring</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Security;