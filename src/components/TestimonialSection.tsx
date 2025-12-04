import { TrainerProfile } from "@/types/TrainerProfile";
import { Quote } from "lucide-react";

interface TestimonialSectionProps {
  trainer: TrainerProfile;
}

const TestimonialSection = ({ trainer }: TestimonialSectionProps) => {
  if (!trainer.testimonialQuote) return null;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
            <Quote className="w-8 h-8 text-primary" />
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-8">
            "{trainer.testimonialQuote}"
          </blockquote>

          {/* Attribution */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {trainer.testimonialName?.charAt(0) || "C"}
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {trainer.testimonialName}
              </p>
              <p className="text-foreground-muted">
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
