import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="container relative text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Ready to Look Like a <span className="text-gradient">Pro?</span>
        </h2>
        <p className="text-lg text-foreground/70 max-w-xl mx-auto mb-10">
          One short form. A done-for-you website. A real link you can put in your bio today.
        </p>
        <div className="flex flex-col items-center gap-4">
          <a
            href="#claim"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.03] transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Get My Free Trainer Site</span>
            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/trainers/coach-demo"
            className="text-foreground/60 hover:text-primary transition-colors text-sm"
          >
            See a Live Demo First →
          </Link>
        </div>
      </div>

      {/* Footer glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default FinalCTASection;
