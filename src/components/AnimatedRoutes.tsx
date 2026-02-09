import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Resources from "@/pages/Resources";
import Community from "@/pages/Community";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import DEX from "@/pages/DEX";
import AdminDashboard from "@/pages/AdminDashboard";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/dex" element={<DEX />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<Community />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Redirects for removed marketing pages */}
        <Route path="/technology" element={<Navigate to="/" replace />} />
        <Route path="/features" element={<Navigate to="/" replace />} />
        <Route path="/security" element={<Navigate to="/" replace />} />
        <Route path="/cross-chain" element={<Navigate to="/" replace />} />
        <Route path="/tokenomics" element={<Navigate to="/" replace />} />
        <Route path="/analytics" element={<Navigate to="/" replace />} />
        <Route path="/start-building" element={<Navigate to="/resources" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
