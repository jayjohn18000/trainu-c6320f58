import { Trophy, Rocket, Zap } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const WhyThisMattersSection = () => {
  const { ref, isVisible } = useScrollAnimation();

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

  const beforeItems = [
    "Messy Instagram bio with random links",
    "Canva link to program PDFs",
    "Notes app program list",
    '"DM me to book" in bio',
    "No credibility signals",
  ];

  const afterItems = [
    "Clean, branded hero section",
    "Professional program cards",
    "Client testimonials displayed",
    "One-click booking button",
    "Trust badges & social proof",
  ];

  return (
    <section className="py-24 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container relative">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Why This Matters
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
            Turn Followers into <span className="text-gradient">Paying Clients</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Your website isn't a decoration. It's a 24/7 sales page that books calls while you're coaching.
          </p>
        </div>

        {/* Before/After Transformation */}
        <div 
          className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* BEFORE Card */}
          <div className="bg-card/50 rounded-2xl p-6 border border-destructive/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/50 to-destructive/20" />
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                Before
              </span>
              <span className="text-foreground/50 text-sm">The messy trainer look</span>
            </div>
            <ul className="space-y-3">
              {beforeItems.map((item, index) => (
                <li 
                  key={index}
                  className={`flex items-center gap-3 text-foreground/60 transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${250 + index * 80}ms` }}
                >
                  <span className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-0.5 bg-destructive/60 rotate-45" />
                  </span>
                  <span className="line-through decoration-foreground/30">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER Card */}
          <div className="bg-card rounded-2xl p-6 border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  After
                </span>
                <span className="text-foreground/70 text-sm">Your TrainU website</span>
              </div>
              <ul className="space-y-3">
                {afterItems.map((item, index) => (
                  <li 
                    key={index}
                    className={`flex items-center gap-3 text-foreground transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${250 + index * 80}ms` }}
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisMattersSection;