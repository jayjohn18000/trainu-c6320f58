import { ArrowRight, CalendarCheck, RefreshCw, TrendingUp } from "lucide-react";
import { TrainerProfile } from "@/types/TrainerProfile";

interface CoachingEngineSectionProps {
  trainer: TrainerProfile;
}

const CoachingEngineSection = ({ trainer }: CoachingEngineSectionProps) => {
  const bookingLink = trainer.social.bookingLink || trainer.hero.ctaPrimaryLink;

  const features = [
    {
      icon: CalendarCheck,
      title: "Books consults",
      description: "Clear offer + one-click booking to turn visitors into calls.",
    },
    {
      icon: RefreshCw,
      title: "Keeps clients consistent",
      description: "Built-in reminders and check-ins so momentum doesn't fade.",
    },
    {
      icon: TrendingUp,
      title: "Creates a clear path",
      description: "Visitors can start with a program and upgrade when ready.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background-elevated">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Your Coaching System
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            This is more than a website.<br />
            <span className="text-gradient">It's your coaching engine.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {bookingLink && (
          <div className="text-center">
            <a
              href={bookingLink}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              Book Free Consult
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoachingEngineSection;
