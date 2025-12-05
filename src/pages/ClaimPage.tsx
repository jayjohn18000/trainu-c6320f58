import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import TrainerWebsiteForm from "@/components/TrainerWebsiteForm";
import Footer from "@/components/Footer";

const ClaimPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OverlayNav />
      
      {/* Hero Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        
        <div className="container relative">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Claim Your Free <span className="text-gradient">Trainer Website</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Fill out this quick form and we'll build your done-for-you website in the next 24 hours. 
            No cost, no contracts, no catches.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 relative">
        <div className="container">
          <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/50 backdrop-blur p-6 sm:p-8 md:p-10">
            <TrainerWebsiteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClaimPage;
