import { TrainerProfile } from "@/types/TrainerProfile";
import { Star } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div>
            {/* Section label */}
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Results
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Progress you can see
            </h2>

            <p className="text-lg text-foreground/60 leading-relaxed mb-10 max-w-lg">
              Every transformation tells a story. These programs are built to help you move better, feel stronger, and see steady progress, without extremes, burnout, or quick fixes.
            </p>

            {/* Client testimonial card */}
            <div className="space-y-6">
              {/* Avatar and info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground ring-4 ring-primary/20">
                  {trainer.testimonialName?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {trainer.testimonialName}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {trainer.testimonialRole}
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
                "{trainer.testimonialQuote}"
              </blockquote>
            </div>
          </div>

          {/* Right side - Before/After Slider */}
          <div className="lg:pl-8">
            <BeforeAfterSlider
              beforeImage={trainer.beforeImageUrl || "/images/before.png"}
              afterImage={trainer.afterImageUrl || "/images/after.png"}
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
