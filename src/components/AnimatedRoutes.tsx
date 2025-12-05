import { useLocation, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Technology from "@/pages/Technology";
import Features from "@/pages/Features";
import Security from "@/pages/Security";
import CrossChain from "@/pages/CrossChain";
import Tokenomics from "@/pages/Tokenomics";
import Analytics from "@/pages/Analytics";
import Resources from "@/pages/Resources";
import Community from "@/pages/Community";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import StartBuilding from "@/pages/StartBuilding";
import DEX from "@/pages/DEX";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/features" element={<Features />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cross-chain" element={<CrossChain />} />
        <Route path="/tokenomics" element={<Tokenomics />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<Community />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/start-building" element={<StartBuilding />} />
        <Route path="/dex" element={<DEX />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
