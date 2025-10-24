import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Github, Twitter, Send, Users, Award, Rocket, GraduationCap } from "lucide-react";

const Community = () => {
  const platforms = [
    {
      icon: MessageCircle,
      name: "Discord Server",
      description: "Join 10,000+ members for support, discussions, and project showcases",
      members: "10.5K members",
      link: "https://discord.gg/fluidnetwork",
      color: "text-[#5865F2]"
    },
    {
      icon: Send,
      name: "Telegram Group",
      description: "Real-time updates, announcements, and quick community chat",
      members: "8.2K members",
      link: "https://t.me/fluidnetwork",
      color: "text-[#0088cc]"
    },
    {
      icon: Twitter,
      name: "Twitter/X",
      description: "Follow us for news, updates, and ecosystem highlights",
      members: "15K followers",
      link: "https://twitter.com/fluidnetwork",
      color: "text-[#1DA1F2]"
    },
    {
      icon: Github,
      name: "GitHub",
      description: "Contribute to open source, report issues, and view our codebase",
      members: "2.5K stars",
      link: "https://github.com/fluidnetwork",
      color: "text-foreground"
    }
  ];

  const initiatives = [
    {
      icon: Award,
      title: "Bug Bounty Program",
      description: "Earn rewards up to $50,000 for finding critical vulnerabilities",
      cta: "Learn More",
      link: "#bug-bounty"
    },
    {
      icon: Rocket,
      title: "Developer Grants",
      description: "Get funding from $5,000 to $100,000 for building on Fluid Network",
      cta: "Apply Now",
      link: "#grants"
    },
    {
      icon: Users,
      title: "Ambassador Program",
      description: "Represent Fluid Network globally and earn exclusive rewards",
      cta: "Become Ambassador",
      link: "#ambassador"
    },
    {
      icon: GraduationCap,
      title: "Educational Content",
      description: "Access tutorials, workshops, webinars, and certification programs",
      cta: "Start Learning",
      link: "#education"
    }
  ];

  const stats = [
    { label: "Active Developers", value: "2,500+" },
    { label: "Community Members", value: "35,000+" },
    { label: "Projects Built", value: "180+" },
    { label: "Countries", value: "95+" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Connect with developers, builders, and enthusiasts from around the world building the future of blockchain
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Community Platforms
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <platform.icon className={`w-12 h-12 mb-4 ${platform.color}`} />
                <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-4">{platform.description}</p>
                <p className="text-sm font-semibold text-primary mb-4">{platform.members}</p>
                <Button asChild className="w-full">
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    Join {platform.name}
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Initiatives */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Community Initiatives
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Participate in programs designed to support and reward our community members
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="p-6">
                <initiative.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                <p className="text-muted-foreground mb-6">{initiative.description}</p>
                <Button variant="outline" asChild>
                  <a href={initiative.link}>{initiative.cta}</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Community Projects
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover amazing projects built by our community members
          </p>
          <Button size="lg" variant="outline">
            View Project Showcase
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;