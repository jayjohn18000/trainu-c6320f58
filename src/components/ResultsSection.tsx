import { TrainerProfile } from "@/types/TrainerProfile";
import { ArrowRight } from "lucide-react";

interface ResultsSectionProps {
  trainer: TrainerProfile;
}

const steps = [
  {
    number: "01",
    title: "Quick consult",
    description: "We map your goal, schedule, and starting point."
  },
  {
    number: "02", 
    title: "Your plan is built",
    description: "Training + nutrition targets tailored to you."
  },
  {
    number: "03",
    title: "Weekly accountability",
    description: "Check-ins and adjustments as you progress."
  },
  {
    number: "04",
    title: "Consistency support",
    description: "Reminders so you stay on track without overthinking."
  },
  {
    number: "05",
    title: "Progress reviews",
    description: "We measure what works and keep momentum."
  }
];

const ResultsSection = ({ trainer }: ResultsSectionProps) => {
  // Use the "Client Results" image (index 1 from gallery) or profile photo
  const galleryImages = trainer.trainer.galleryImageUrls || [];
  const resultsImage = galleryImages[1] || galleryImages[0] || trainer.trainer.profilePhotoUrl;
  const bookingLink = trainer.social.bookingLink || trainer.hero.ctaPrimaryLink;

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How coaching works
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-md">
              Simple steps. Clear expectations. Consistency built in.
            </p>

            {/* CTA Button */}
            {bookingLink && (
              <a
                href={bookingLink}
                className="group inline-flex items-center gap-3 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 mb-12"
              >
                Book Free Consult
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

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
