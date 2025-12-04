import { TrainerProfile } from "@/types/TrainerProfile";
import { Quote } from "lucide-react";

interface TestimonialSectionProps {
  trainer: TrainerProfile;
}

const TestimonialSection = ({ trainer }: TestimonialSectionProps) => {
  if (!trainer.testimonialQuote) return null;

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-8">
            Client Results
          </span>

          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
            <Quote className="w-8 h-8 text-primary" />
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-10">
            "{trainer.testimonialQuote}"
          </blockquote>

          {/* Attribution */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground ring-4 ring-primary/20">
              {trainer.testimonialName?.charAt(0) || "C"}
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {trainer.testimonialName}
              </p>
              <p className="text-foreground/60">
                {trainer.testimonialRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
