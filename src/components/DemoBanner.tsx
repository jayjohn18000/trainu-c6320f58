import { Link } from "react-router-dom";
import { ArrowRight, X, ArrowLeft } from "lucide-react";
import { useState } from "react";

const DemoBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary/90 via-primary to-primary/90 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container py-2.5 flex items-center gap-2 sm:gap-4">
        {/* Back to TrainU - Now visible on mobile */}
        <Link 
          to="/" 
          className="text-primary-foreground/80 hover:text-primary-foreground text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 shrink-0"
        >
          <ArrowLeft className="w-3 h-3 sm:hidden" />
          <span className="hidden sm:inline">← Back to TrainU</span>
          <span className="sm:hidden">Back</span>
        </Link>
        
        {/* Get My Free Site CTA */}
        <Link 
          to="/claim" 
          className="inline-flex items-center gap-1 sm:gap-1.5 bg-background text-foreground px-3 sm:px-4 py-1.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-background/90 transition-colors"
        >
          <span className="hidden sm:inline">Get My Free Site</span>
          <span className="sm:hidden">Get Free Site</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
        
        {/* Dismiss button */}
        <button 
          onClick={() => setDismissed(true)} 
          className="text-primary-foreground/60 hover:text-primary-foreground transition-colors p-1 ml-auto" 
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;
