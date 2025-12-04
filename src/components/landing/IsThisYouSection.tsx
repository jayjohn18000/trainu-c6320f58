import { CheckCircle, Users, Clock, DollarSign } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const IsThisYouSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const bullets = [
    "You coach online or in person and need somewhere to send leads.",
    "You're tired of saying \"Just DM me\" and losing people.",
    "You want a pro look before you're making pro money.",
    "You'd rather spend time coaching clients than fighting with websites.",
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Left: Text Content */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Is This You?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              Built for Trainers, Not Web Designers.
            </h2>
            <ul className="space-y-5">
              {bullets.map((item, index) => (
                <li 
                  key={index} 
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Stats Card */}
          <div
            className={`relative transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-card rounded-2xl p-8 border border-border/50 relative overflow-hidden">
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">500+ Trainers</p>
                    <p className="text-foreground/60">Already using TrainU</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-xl p-6 text-center border border-border/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <p className="text-3xl font-bold text-primary">24h</p>
                    </div>
                    <p className="text-sm text-foreground/60">Average Setup Time</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6 text-center border border-border/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <p className="text-3xl font-bold text-primary">$0</p>
                    </div>
                    <p className="text-sm text-foreground/60">To Get Started</p>
                  </div>
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
