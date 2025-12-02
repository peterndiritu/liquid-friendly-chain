import fluidLogo from "@/assets/fluid-logo.png";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background backdrop-blur-lg transition-opacity duration-300 ${
        isExiting ? 'opacity-0 animate-fade-out' : 'opacity-100 animate-fade-in'
      }`}
    >
      <div className="relative">
        {/* Rotating Circle Border */}
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 rounded-full border-4 border-transparent border-t-primary border-r-primary/50 animate-spin glow-effect"></div>
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <img 
            src={fluidLogo} 
            alt="Fluid Network Logo" 
            className="w-16 h-16 animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
