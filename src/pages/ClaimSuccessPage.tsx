import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Mail, ArrowRight } from "lucide-react";
import OverlayNav from "@/components/OverlayNav";
import Footer from "@/components/Footer";

const ClaimSuccessPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OverlayNav />
      
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
        
        <div className="container relative text-center py-20 px-4">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8 animate-fade-up">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>

          {/* Headline */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            We're Building Your Website!
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Thanks for submitting your info. Our team is already working on your professional trainer website.
          </p>

          {/* What's Next Cards */}
          <div 
            className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <div className="rounded-xl border border-border bg-card/50 p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Delivered in 24 Hours</h3>
              </div>
              <p className="text-sm text-foreground/60">
                Your website will be ready within 24 hours. We'll send you a link to preview it before it goes live.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Check Your Email</h3>
              </div>
              <p className="text-sm text-foreground/60">
                You'll receive a confirmation email shortly with next steps and what to expect.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div 
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <Link
              to="/trainers/coach-demo"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
            >
              See what your site could look like
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClaimSuccessPage;
