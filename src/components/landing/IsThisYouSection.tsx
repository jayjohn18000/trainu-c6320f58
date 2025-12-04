import { CheckCircle, Users } from "lucide-react";

const IsThisYouSection = () => {
  const bullets = [
    "You coach online or in person and need somewhere to send leads.",
    "You're tired of saying \"Just DM me\" and losing people.",
    "You want a pro look before you're making pro money.",
    "You'd rather spend time coaching clients than fighting with websites.",
  ];

  return (
    <section className="py-20 md:py-28 bg-background-elevated">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Is This You?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built for Trainers, Not Web Designers.
            </h2>
            <ul className="space-y-4">
              {bullets.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 border border-card-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">500+ Trainers</p>
                  <p className="text-sm text-foreground/60">Already using TrainU</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary">24h</p>
                  <p className="text-sm text-foreground/60">Average Setup Time</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary">$0</p>
                  <p className="text-sm text-foreground/60">To Get Started</p>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsThisYouSection;
