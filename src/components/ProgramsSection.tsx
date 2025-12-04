import { TrainerProgram } from "@/types/TrainerProgram";
import { Check, Sparkles } from "lucide-react";

interface ProgramsSectionProps {
  programs: TrainerProgram[];
}

const ProgramsSection = ({ programs }: ProgramsSectionProps) => {
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
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Every program includes personalized coaching, accountability, and a clear roadmap to your goals.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`relative group rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 ${
                program.isFeatured
                  ? "bg-gradient-card border-2 border-primary/30 shadow-glow"
                  : "bg-card border border-card-border hover:border-primary/20"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {program.isFeatured && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 bg-gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Program Content */}
              <div className="pt-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {program.name}
                </h3>
                <p className="text-foreground-muted mb-6">
                  {program.shortTagline}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {program.pricePerMonth.split("/")[0]}
                  </span>
                  <span className="text-foreground-muted">
                    /{program.pricePerMonth.split("/")[1] || "month"}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {program.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-muted">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    program.isFeatured
                      ? "bg-gradient-primary text-primary-foreground shadow-button hover:shadow-glow"
                      : "bg-accent text-foreground border border-border hover:border-primary/30 hover:bg-accent/80"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
