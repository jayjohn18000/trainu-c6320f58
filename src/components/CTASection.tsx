import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight, Mail, Phone } from "lucide-react";

interface CTASectionProps {
  trainer: TrainerProfile;
}

const CTASection = ({ trainer }: CTASectionProps) => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Get Started Today
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Look Like a Pro?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
            One consultation. A clear roadmap. A stronger, more confident you.
          </p>

          {/* Primary CTA */}
          <a
            href={trainer.primaryCTALink}
            className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300 mb-10"
          >
            {trainer.primaryCTA}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${trainer.contactEmail}`}
              className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              {trainer.contactEmail}
            </a>
            {trainer.contactPhone && (
              <a
                href={`tel:${trainer.contactPhone}`}
                className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                {trainer.contactPhone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
