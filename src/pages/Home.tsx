import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Sparkles, Trophy, Rocket, Zap, CheckCircle, Users } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />

        <div className="container relative z-10 text-center py-20">
          {/* Badge - staggered animation */}
          <div 
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Free for Personal Trainers</span>
          </div>

          {/* Main Headline - staggered */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            Become a Professional Trainer
            <br />
            <span className="text-gradient">Online—For Free.</span>
          </h1>

          {/* Subheadline - staggered */}
          <p
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            TrainU gives personal trainers a done-for-you, professional website that's ready to sell programs and book clients—no tech skills, no setup costs, just instant credibility.
          </p>

          {/* CTAs - staggered */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <Link
              to="/trainers/coach-demo"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Claim My Free Website</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/trainers/coach-demo"
              className="text-foreground/70 hover:text-primary font-medium transition-colors flex items-center gap-2"
            >
              See a Live Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Why This Matters Section */}
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
            {/* Card 1 */}
            <div className="group bg-card rounded-2xl p-8 border border-card-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                <Trophy className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Look Like a Real Professional</h3>
              <p className="text-foreground/70">
                Stop sending people to broken link trees and random bios. Get a clean, branded site that makes you look like the coach they should trust.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-card rounded-2xl p-8 border border-card-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Sell Your Programs on Autopilot</h3>
              <p className="text-foreground/70">
                Showcase your signature offers, before/afters, and testimonials—then send leads straight into your DMs, email, or calendar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-card rounded-2xl p-8 border border-card-border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Do It Without Learning "Tech Stuff"</h3>
              <p className="text-foreground/70">
                You don't touch code. You fill out one short form. We do the rest and send you a live link you can drop in your bio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Paid Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              No Hidden Costs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Start Free. Upgrade Only <span className="text-gradient">When You're Ready.</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Your site lives on TrainU for free—no hosting bill, no developer, no hidden fees. When you're ready for your <span className="text-foreground font-medium">own domain and custom branding</span>, you can upgrade. Until then, your free site does the job.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Free forever tier
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Live in under 24 hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
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
                {[
                  "You coach online or in-person and need somewhere to send leads.",
                  "You're tired of saying \"Just DM me\" and losing people.",
                  "You want a pro look before you're making pro money.",
                  "You'd rather spend time coaching clients than fighting with websites.",
                ].map((item, index) => (
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

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Look Like a Pro?
          </h2>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto mb-10">
            One short form. A done-for-you website. A real link you can put in your bio today.
          </p>
          <Link
            to="/trainers/coach-demo"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Get My Free Trainer Site</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Footer glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>
    </Layout>
  );
};

export default Home;
