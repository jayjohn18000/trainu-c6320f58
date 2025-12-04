import { ArrowRight } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const ClaimFormSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Placeholder GHL form URL - replace with actual URL
  const GHL_FORM_URL = "https://YOUR_GHL_FORM_URL_HERE";

  return (
    <section id="claim" className="py-24 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container relative">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Claim Your Free <span className="text-gradient">Trainer Website</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              Fill out this quick form and we'll build your free website in the next 24 hours.
            </p>
          </div>

          {/* GHL Form Embed Container */}
          <div 
            className={`bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Iframe for GHL form - replace src with your actual GHL form URL */}
            <iframe
              src={GHL_FORM_URL}
              className="w-full min-h-[800px] border-0"
              title="Claim Your Free Trainer Website Form"
              loading="lazy"
            />
          </div>

          {/* Fallback/Alternative CTA */}
          <div 
            className={`text-center mt-8 transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-foreground/50 text-sm mb-4">
              Having trouble with the form? Open it directly:
            </p>
            <a
              href={GHL_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Open Form in New Tab
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimFormSection;
