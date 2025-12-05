import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
const DemoBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary/90 via-primary to-primary/90 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-primary-foreground/90 text-sm hidden sm:inline">
        </span>
          <span className="text-primary-foreground font-medium text-sm truncate">
        </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors hidden sm:inline">
            ← Back to TrainU
          </Link>
          <Link to="/claim" className="inline-flex items-center gap-1.5 bg-background text-foreground px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-background/90 transition-colors">
            Get My Free Site
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button onClick={() => setDismissed(true)} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors p-1" aria-label="Dismiss banner">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>;
};
export default DemoBanner;