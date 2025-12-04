import { ReactNode } from "react";
import { TrainerProfile } from "@/types/TrainerProfile";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  trainer?: TrainerProfile;
}

const Layout = ({ children, trainer }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href={trainer ? `/trainers/${trainer.slug}` : "/"} className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">
              {trainer?.brandName || "TrainU"}
            </span>
          </a>
          {trainer && (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#programs" className="text-foreground-muted hover:text-foreground transition-colors">
                Programs
              </a>
              <a href="#about" className="text-foreground-muted hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-foreground-muted hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          )}
          {trainer && (
            <a
              href={trainer.primaryCTALink}
              className="bg-gradient-primary text-primary-foreground px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base shadow-button hover:opacity-90 transition-opacity"
            >
              Book Now
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">{children}</main>

      {/* Footer */}
      <Footer trainer={trainer} />
    </div>
  );
};

export default Layout;
