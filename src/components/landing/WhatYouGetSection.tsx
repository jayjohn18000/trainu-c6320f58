import { Link } from "react-router-dom";
import { Check, ArrowRight, Image, FileText, Users, Calendar, Share2, Smartphone, Sparkles } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const WhatYouGetSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    { icon: Image, text: "Hero section with your best photo and headline" },
    { icon: FileText, text: "Clear breakdown of your coaching services and programs" },
    { icon: Users, text: "Testimonials or before/after transformations (if provided)" },
    { icon: FileText, text: "Simple, readable About section with your niche and location" },
    { icon: Calendar, text: "Prominent 'Book With Me' call-to-action tied to your existing calendar link" },
    { icon: Share2, text: "Your social links (Instagram, TikTok, YouTube, etc.) in the header/footer" },
    { icon: Smartphone, text: "Fully responsive layout that looks great on mobile" },
    { icon: Sparkles, text: "Modern scroll animations inspired by top fitness brands" },
  ];

  return (
    <section className="py-24 md:py-32 bg-background-elevated relative overflow-hidden">
      <div className="container">
        <div ref={ref} className="max-w-5xl mx-auto">
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
              A Complete, Professionally Designed <span className="text-gradient">Trainer Website</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              You send us your info. We send you a done-for-you website that's ready to share with clients, add to your bio, and use as your main online home.
            </p>
          </div>

          {/* Features Checklist */}
          <div 
            className={`grid md:grid-cols-2 gap-4 mb-16 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 bg-card/50 rounded-xl p-5 border border-border/30 hover:border-primary/30 hover:bg-card transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${300 + index * 50}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/80 leading-relaxed">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Demo Preview */}
          <div 
            className={`relative bg-card rounded-2xl border border-border/50 p-6 md:p-10 overflow-hidden transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/20">
                  <img
                    src="/images/demo-hero.png"
                    alt="Demo trainer site preview"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  See It In Action
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  Check out our demo trainer site to see exactly what you'll get—a premium, professional website ready to convert leads into paying clients.
                </p>
                <Link
                  to="/trainers/coach-demo"
                  className="group inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
                >
                  View Demo Trainer Site
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
