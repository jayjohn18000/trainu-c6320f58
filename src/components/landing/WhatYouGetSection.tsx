import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const WhatYouGetSection = () => {
  const features = [
    "Hero section with your best photo and headline.",
    "Clear breakdown of your coaching services and programs.",
    "Testimonials or before/after transformations (if provided).",
    "Simple, readable About section with your niche and location.",
    "Prominent 'Book With Me' call-to-action tied to your existing calendar link.",
    "Your social links (Instagram, TikTok, YouTube, etc.) in the header/footer.",
    "Fully responsive layout that looks great on mobile.",
    "Modern scroll animations inspired by top fitness brands.",
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              A Complete, Professionally Designed <span className="text-gradient">Trainer Website</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              You send us your info. We send you a done-for-you website that's ready to share with clients, add to your bio, and use as your main online home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card/50 rounded-xl p-4 border border-card-border/50"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>

          {/* Demo Preview */}
          <div className="relative bg-card rounded-2xl border border-card-border p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2">
                <img
                  src="/images/demo-hero.png"
                  alt="Demo trainer site preview"
                  className="rounded-xl shadow-lg border border-border/20"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  See It In Action
                </h3>
                <p className="text-foreground/70 mb-6">
                  Check out our demo trainer site to see exactly what you'll get—a premium, professional website ready to convert leads.
                </p>
                <Link
                  to="/trainers/coach-demo"
                  className="group inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
                >
                  View Demo Trainer Site
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
