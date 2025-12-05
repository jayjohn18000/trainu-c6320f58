import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight, Star, Users, Award } from "lucide-react";

interface HeroSectionProps {
  trainer: TrainerProfile;
}

const HeroSection = ({ trainer }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={trainer.hero.backgroundImageUrl}
          alt={trainer.trainer.businessName}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          {/* Trainer Identity - Name & Niche */}
          <div 
            className="animate-fade-up opacity-0" 
            style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
          >
            <p className="text-primary font-semibold tracking-wide mb-2">
              {trainer.trainer.fullName}
            </p>
            <p className="text-sm text-foreground/60 uppercase tracking-widest mb-6">
              {trainer.trainer.specialty} • {trainer.trainer.location}
            </p>
          </div>

          {/* Trust indicators */}
          <div 
            className="flex flex-wrap items-center gap-4 mb-8 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">200+ clients</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm text-foreground/80">5.0 rated</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">5+ years</span>
            </div>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <span className="text-foreground">{trainer.hero.headline.split(".")[0]}.</span>
            {trainer.hero.headline.split(".")[1] && (
              <>
                <br />
                <span className="text-gradient">{trainer.hero.headline.split(".")[1].trim()}.</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl animate-fade-up opacity-0" 
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            {trainer.hero.subheadline}
          </p>

          {/* CTA */}
          <div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <a
              href={trainer.hero.ctaPrimaryLink}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              {trainer.hero.ctaPrimaryLabel}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            {trainer.hero.ctaSecondaryLabel && trainer.hero.ctaSecondaryLink && (
              <a 
                href={trainer.hero.ctaSecondaryLink} 
                className="text-foreground/60 hover:text-primary transition-colors font-medium"
              >
                {trainer.hero.ctaSecondaryLabel} →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
