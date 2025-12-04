import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Sparkles, Users, Zap, Globe } from "lucide-react";

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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        <div className="container relative z-10 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">TrainU Website Factory</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Beautiful Trainer Websites
            <br />
            <span className="text-gradient">Built for You</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            A clean, modular template system that creates stunning personal trainer websites from simple JSON data.
            Built for scale.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/trainers/coach-demo"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow transition-all duration-300"
            >
              View Demo Trainer Site
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-background-elevated">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Data-Driven Templates</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Each trainer website is generated from a simple JSON file. No coding required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-2xl p-8 border border-card-border hover:border-primary/20 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Instant Generation</h3>
              <p className="text-foreground/70">
                Add a JSON file with trainer data and the website is instantly available at /trainers/[slug].
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-2xl p-8 border border-card-border hover:border-primary/20 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Fully Customizable</h3>
              <p className="text-foreground/70">
                Override colors, images, programs, and content. Each trainer can have their own brand.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-2xl p-8 border border-card-border hover:border-primary/20 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Scale Infinitely</h3>
              <p className="text-foreground/70">
                Built to be duplicated hundreds of times. Clean, modular, and maintainable code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Link */}
      <section className="py-20 bg-background text-center">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">See It In Action</h2>
          <Link
            to="/trainers/coach-demo"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-semibold text-lg transition-colors"
          >
            Visit the demo trainer page
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
