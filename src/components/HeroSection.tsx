import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 md:px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
          Decentralized infrastructure for hosting and finance
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Host websites, manage capital, and transact on a single chain.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => navigate('/dex')}
          >
            Launch App
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/resources')}
          >
            Read Docs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
