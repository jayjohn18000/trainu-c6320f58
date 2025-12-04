import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Zap, MessageCircle } from "lucide-react";

const HeroLanding = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Darkened Overlay */}
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="container relative z-10 text-center py-20">
        {/* Eyebrow Badge */}
        <div 
          className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Free for Personal Trainers</span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up max-w-4xl mx-auto"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          Become a Professional Trainer
          <br />
          <span className="text-gradient">Online—For Free.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10 opacity-0 animate-fade-up leading-relaxed"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          TrainU builds personal trainers a studio-quality website that positions you as a real professional—ready to sell programs, book clients, and grow your brand. No fees. No tech. No barriers. Just instant credibility.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <a
            href="#claim"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Claim My Free Trainer Site</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/trainers/coach-demo"
            className="text-foreground/70 hover:text-primary font-medium transition-colors flex items-center gap-2"
          >
            See a Live Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Micro-proof row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-foreground/60 opacity-0 animate-fade-up"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Trusted by trainers nationwide
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Delivered in 24 hours
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            Perfect for Instagram bios
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroLanding;
