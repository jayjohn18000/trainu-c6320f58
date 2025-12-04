import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

interface HeroSectionProps {
  trainer: TrainerProfile;
}

const HeroSection = ({ trainer }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={trainer.heroImageUrl}
          alt={trainer.brandName}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 animate-fade-up">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-muted">30-Day Money-Back Guarantee</span>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                2K+
              </div>
            </div>
            <div className="text-sm">
              <p className="text-foreground">Trusted by 2,000+ clients worldwide</p>
              <div className="flex items-center gap-1 text-foreground-muted">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>Rated 4.9 out of 5.0</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground">{trainer.heroHeadline.split(".")[0]}.</span>
            {trainer.heroHeadline.split(".")[1] && (
              <>
                <br />
                <span className="text-gradient">{trainer.heroHeadline.split(".")[1].trim()}.</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground-muted mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {trainer.heroSubheadline}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a
              href={trainer.primaryCTALink}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow transition-all duration-300"
            >
              {trainer.primaryCTA}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-foreground-muted self-center">
              No pressure. Just a clear path forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
