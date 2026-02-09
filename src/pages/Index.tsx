import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HostingSection from "@/components/HostingSection";
import EndowmentSection from "@/components/EndowmentSection";
import WalletSection from "@/components/WalletSection";
import BlockchainSection from "@/components/BlockchainSection";
import SecuritySection from "@/components/SecuritySection";
import DevelopersSection from "@/components/DevelopersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <HostingSection />
        <EndowmentSection />
        <WalletSection />
        <BlockchainSection />
        <SecuritySection />
        <DevelopersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
