import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight } from "lucide-react";

interface ResultsSectionProps {
  trainer: TrainerProfile;
}

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We'll explore your goals, challenges, and lifestyle to create the right approach."
  },
  {
    number: "02", 
    title: "Personalized Plan",
    description: "Training and nutrition tailored to your lifestyle — realistic, flexible, and sustainable."
  },
  {
    number: "03",
    title: "Weekly Coaching",
    description: "Consistent check-ins to track progress, adjust, and keep you accountable."
  },
  {
    number: "04",
    title: "Lifestyle Integration",
    description: "We adapt your plan as your schedule, cycle, and needs shift."
  },
  {
    number: "05",
    title: "Long-Term Balance",
    description: "Progress doesn't end here — we'll refine, celebrate, and keep building together."
  }
];

const ResultsSection = ({ trainer }: ResultsSectionProps) => {
  // Use the "Client Results" image (index 1 from gallery)
  const resultsImage = trainer.galleryImageUrls[1] || trainer.galleryImageUrls[0];

  return (
    <section id="results" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your path to<br />lasting results
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-md">
              Every transformation starts with structure. Here's how we turn goals into real progress — one step at a time.
            </p>

            {/* CTA Button */}
            <a
              href={trainer.primaryCTALink}
              className="group inline-flex items-center gap-3 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 mb-12"
            >
              Book Your Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Results Image */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] max-w-sm">
              <img
                src={resultsImage}
                alt="Client Results"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Steps */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="group">
                  <span className="text-sm text-foreground/40 font-mono mb-2 block">
                    {step.number}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
