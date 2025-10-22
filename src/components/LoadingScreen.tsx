import liquidChainLogo from "@/assets/liquid-chain-logo.png";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-lg animate-fade-in">
      <div className="relative">
        {/* Rotating Circle Border */}
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 rounded-full border-4 border-transparent border-t-primary border-r-primary/50 animate-spin glow-effect"></div>
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <img 
            src={liquidChainLogo} 
            alt="Fluid Network Logo" 
            className="w-16 h-16 animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
