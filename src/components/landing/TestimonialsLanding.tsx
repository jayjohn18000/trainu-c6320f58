import { Quote } from "lucide-react";

const TestimonialsLanding = () => {
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
    <section className="py-20 md:py-28 bg-background-elevated">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Trainers <span className="text-gradient">Love TrainU</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-card-border relative"
            >
              <Quote className="w-10 h-10 text-primary/30 absolute top-6 left-6" />
              <div className="pt-8">
                <p className="text-lg md:text-xl text-foreground/90 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
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
