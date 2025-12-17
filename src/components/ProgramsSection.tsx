import { TrainerProgram } from "@/types/TrainerProfile";
import { Check, Sparkles, ArrowRight } from "lucide-react";

interface ProgramsSectionProps {
  programs: TrainerProgram[];
  bookingLink?: string;
}

const ProgramsSection = ({ programs, bookingLink }: ProgramsSectionProps) => {
  return (
    <section id="programs" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose the level of support you want. Everything is designed to fit real life — even busy weeks.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`relative group rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow flex flex-col h-full ${
                program.isPrimary
                  ? "bg-gradient-card border-2 border-primary/30 shadow-glow"
                  : "bg-card border border-card-border hover:border-primary/20"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {program.isPrimary && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 bg-gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Program Content */}
              <div className="pt-2 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-foreground/60 mb-4">
                  {program.description}
                </p>

                {/* Bullet Points */}
                {program.bullets && program.bullets.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {program.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price */}
                <div className="mb-6 mt-auto">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    ${program.price}
                  </span>
                  <span className="text-foreground/60">
                    /{program.priceLabel.split("/")[1] || "month"}
                  </span>
                </div>

                {/* CTA Button - Full Width */}
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    program.isPrimary
                      ? "bg-gradient-primary text-primary-foreground shadow-button hover:shadow-glow hover:scale-[1.02]"
                      : "bg-accent text-foreground border border-border hover:border-primary/30 hover:bg-accent/80"
                  }`}
                >
                  {program.ctaLabel || "Get Started"}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-foreground/50 mt-10">
          Not sure? Book a free consult and I'll recommend the best fit.
        </p>
      </div>
    </section>
  );
};

export default ProgramsSection;
