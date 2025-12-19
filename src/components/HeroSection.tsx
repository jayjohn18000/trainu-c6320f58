import { Link } from "react-router-dom";
import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight, Star, Users, Award, MapPin } from "lucide-react";

interface HeroSectionProps {
  trainer: TrainerProfile;
  isDemo?: boolean;
}

const HeroSection = ({ trainer, isDemo = false }: HeroSectionProps) => {
  // Use dynamic stats from trainer profile or fallback to defaults
  const stats = trainer.stats || {};
  const clientCount = stats.clientCount || "200+";
  const rating = stats.rating || "5.0";
  const yearsExperience = stats.yearsExperience || "5+";

  const bookingLink = trainer.social.bookingLink || trainer.hero.ctaPrimaryLink;

  const primaryCta = isDemo
    ? bookingLink
      ? { label: "Book Free Consult", href: bookingLink }
      : null
    : trainer.hero.ctaPrimaryLabel && trainer.hero.ctaPrimaryLink
    ? { label: trainer.hero.ctaPrimaryLabel, href: trainer.hero.ctaPrimaryLink }
    : null;

  const secondaryCta =
    trainer.hero.ctaSecondaryLabel && trainer.hero.ctaSecondaryLink
      ? {
          label: trainer.hero.ctaSecondaryLabel,
          href: trainer.hero.ctaSecondaryLink,
        }
      : null;

  return (
    <section className={`relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden ${isDemo ? 'pt-[52px]' : ''}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={trainer.hero.backgroundImageUrl}
          alt={trainer.trainer.businessName}
          className="w-full h-full object-cover object-top scale-[1.02]"
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

          {/* Trust indicators - Now using dynamic stats + location */}
          <div 
            className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">{clientCount} clients</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm text-foreground/80">{rating} rating</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">{yearsExperience} years</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">{trainer.trainer.location}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <span className="text-foreground">{trainer.hero.headline}</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl animate-fade-up opacity-0" 
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            {trainer.hero.subheadline}
          </p>

          {/* CTA */}
          {(primaryCta || secondaryCta) && (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="text-foreground/60 hover:text-primary transition-colors font-medium"
                >
                  {secondaryCta.label} →
                </a>
              )}
            </div>
          )}

          {/* System Vibe - Demo only */}
          {isDemo && trainer.hero.systemVibe && (
            <p 
              className="text-sm text-foreground/50 mt-6 animate-fade-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              {trainer.hero.systemVibe}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
