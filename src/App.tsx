import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"; // Added ChainId
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Technology from "./pages/Technology";
import Features from "./pages/Features";
import Security from "./pages/Security";
import CrossChain from "./pages/CrossChain";
import Tokenomics from "./pages/Tokenomics";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import StartBuilding from "./pages/StartBuilding";
import DEX from "./pages/DEX";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isLoading]);

  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon}> {/* Polygon mainnet */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <TooltipProvider>
            <LoadingScreen isLoading={isLoading} />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
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
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default App;