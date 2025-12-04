import { Quote } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const TestimonialsLanding = () => {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      quote: "I booked 3 clients in the first week just because my site finally looked legit.",
      name: "Ava",
      role: "Strength Coach",
    },
    {
      quote: "The site looked better than what a marketing agency quoted me $2,500 for.",
      name: "Jordan",
      role: "Online Trainer",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container relative">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Why Trainers <span className="text-gradient">Love TrainU</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-card rounded-2xl p-8 md:p-10 border border-border/50 relative hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
              <div className="pt-10">
                <p className="text-xl md:text-2xl text-foreground/90 italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsLanding;
