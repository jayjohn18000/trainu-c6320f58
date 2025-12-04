import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const WhatYouGetSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    "Pro hero section with your photo",
    "Your services & programs listed",
    "Client testimonials showcase",
    "About you section",
    "Book now button linked to your calendar",
    "Social media links",
    "Mobile-optimized design",
    "Smooth modern animations",
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Everything You Need, <span className="text-gradient">Done For You</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
              Send us your info. Get a complete website in 24 hours. No coding required.
            </p>
          </div>

          {/* Features + Mockups Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features Checklist */}
            <div 
              className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 50}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockups - Desktop & Mobile */}
            <div 
              className={`relative transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="relative flex items-end justify-center gap-4">
                {/* Desktop Mockup */}
                <div className="w-3/4">
                  <img
                    src="/images/mockup-desktop.png"
                    alt="Desktop trainer website preview"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>
                {/* Mobile Mockup */}
                <div className="w-1/3 -ml-16 mb-4 relative z-10">
                  <img
                    src="/images/mockup-mobile.png"
                    alt="Mobile trainer website preview"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* See It In Action Demo Preview */}
          <div 
            className={`relative bg-card rounded-2xl border border-border/50 p-6 md:p-10 overflow-hidden transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/20 group cursor-pointer">
                  <img
                    src="/images/demo-hero.png"
                    alt="Demo trainer site preview"
                    className="w-full blur-sm group-hover:blur-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-foreground font-semibold bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                      Hover to preview
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  See It In Action
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  Preview our demo site—a premium, professional trainer website ready to convert followers into clients.
                </p>
                <Link
                  to="/trainers/coach-demo"
                  className="group inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
                >
                  View Demo Site
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;