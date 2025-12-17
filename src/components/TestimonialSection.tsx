import { TrainerProfile } from "@/types/TrainerProfile";
import { Star } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface TestimonialSectionProps {
  trainer: TrainerProfile;
}

const TestimonialSection = ({ trainer }: TestimonialSectionProps) => {
  // Get first testimonial and first before/after result
  const testimonial = trainer.testimonials[0];
  const beforeAfter = trainer.results.beforeAfter[0];

  if (!testimonial) return null;

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div>
            {/* Section label */}
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Results
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Results that last
            </h2>

            <p className="text-lg text-foreground/60 leading-relaxed mb-10 max-w-lg">
              The goal isn't a perfect week — it's steady progress you can keep.
            </p>

            {/* Transformation label */}
            <div className="mb-6">
              <span className="inline-block text-xs text-foreground/50 uppercase tracking-wider bg-card/50 border border-border/50 px-3 py-1.5 rounded-full">
                12-week transformation (strength + consistency)
              </span>
            </div>

            {/* Client testimonial card */}
            <div className="space-y-6">
              {/* Avatar and info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground ring-4 ring-primary/20">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {testimonial.subtitle}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-foreground/80 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </div>
          </div>

          {/* Right side - Before/After Slider */}
          {beforeAfter && (
            <div className="lg:pl-8">
              <BeforeAfterSlider
                beforeImage={beforeAfter.beforeImageUrl}
                afterImage={beforeAfter.afterImageUrl}
                beforeLabel="Before"
                afterLabel="After"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
