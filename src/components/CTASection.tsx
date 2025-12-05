import { Link } from "react-router-dom";
import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight, Mail, Phone, Calendar } from "lucide-react";

interface CTASectionProps {
  trainer: TrainerProfile;
  isDemo?: boolean;
}

const CTASection = ({ trainer, isDemo = false }: CTASectionProps) => {
  return (
    <section className="py-20 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            {isDemo ? "Your Turn" : "Get Started Today"}
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {isDemo ? "Want a Site Just Like This?" : "Ready to Look Like a Pro?"}
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
            {isDemo 
              ? "Get your own professional trainer website for free. No coding, no hassle — we build it for you in 24 hours."
              : "One consultation. A clear roadmap. A stronger, more confident you."
            }
          </p>

          {/* CTAs - Different for demo vs regular */}
          {isDemo ? (
            <div className="flex flex-col items-center gap-4">
              {/* Demo: Primary CTA to claim form */}
              <Link
                to="/claim"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
              >
                Claim Your Free Trainer Site
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Demo: Secondary option for consultation */}
              <a
                href={trainer.hero.ctaPrimaryLink}
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium"
              >
                <Calendar className="w-4 h-4" />
                Or book a consultation first →
              </a>
            </div>
          ) : (
            <>
              {/* Regular trainer site: Original CTA behavior */}
              <a
                href={trainer.hero.ctaPrimaryLink}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300 mb-10"
              >
                {trainer.hero.ctaPrimaryLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={`mailto:${trainer.contact.email}`}
                  className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {trainer.contact.email}
                </a>
                {trainer.contact.phone && (
                  <a
                    href={`tel:${trainer.contact.phone}`}
                    className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {trainer.contact.phone}
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
