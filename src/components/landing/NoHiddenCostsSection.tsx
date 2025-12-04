import { CheckCircle } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const NoHiddenCostsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const pills = [
    "Free forever tier",
    "No credit card required",
    "Live link delivered within 24 hours",
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="container">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            No Hidden Costs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Start Free. Upgrade Only <span className="text-gradient">When You're Ready.</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Your site lives on TrainU for free—no hosting bill, no domain fees, no developer needed. If you eventually want your own custom domain and advanced features, you can upgrade. Until then, the free version does the job beautifully.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            {pills.map((pill, index) => (
              <span
                key={pill}
                className={`inline-flex items-center gap-2.5 bg-card border border-border/50 rounded-full px-5 py-3 text-sm text-foreground/80 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoHiddenCostsSection;
