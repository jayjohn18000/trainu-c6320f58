import { Trophy, Rocket, Zap } from "lucide-react";

const WhyThisMattersSection = () => {
  const cards = [
    {
      icon: Trophy,
      title: "Look Like a Real Professional",
      body: "Stop sending people to broken link trees. Get a clean, branded website that instantly communicates trust.",
    },
    {
      icon: Rocket,
      title: "Sell Your Programs on Autopilot",
      body: "Display your signature offers, before/afters, video testimonials, and booking links—all in one place.",
    },
    {
      icon: Zap,
      title: "Do It Without Learning Tech Stuff",
      body: "You don't touch code. You fill out one short form. We do the rest and send you a live link you can put in your bio.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Why This Matters
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Turn Followers into <span className="text-gradient">Paying Clients</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Your website isn't a decoration. It's a 24/7 sales page that books calls while you're coaching.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group bg-card rounded-2xl p-8 border border-card-border hover:border-primary/30 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-foreground/70">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisMattersSection;
