import { CheckCircle } from "lucide-react";

const NoHiddenCostsSection = () => {
  const pills = [
    "Free forever tier",
    "No credit card required",
    "Live link delivered within 24 hours",
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            No Hidden Costs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Free. Upgrade Only <span className="text-gradient">When You're Ready.</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
            Your site lives on TrainU for free—no hosting bill, no domain fees, no developer needed. If you eventually want your own custom domain and advanced features, you can upgrade. Until then, the free version does the job beautifully.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 bg-card border border-card-border rounded-full px-5 py-2.5 text-sm text-foreground/80"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
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
