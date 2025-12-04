import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Menu, Instagram, Youtube, Mail } from "lucide-react";
import { TrainerProfile } from "@/types/TrainerProfile";

interface OverlayNavProps {
  trainer?: TrainerProfile;
}

const OverlayNav = ({ trainer }: OverlayNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = trainer
    ? [
        { label: "Home", href: `/trainers/${trainer.slug}` },
        { label: "About", href: "#about" },
        { label: "Programs", href: "#programs" },
        { label: "Results", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "What You Get", href: "#what-you-get" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Get My Free Site", href: "#claim" },
      ];

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <Link
              to={trainer ? `/trainers/${trainer.slug}` : "/"}
              className="flex flex-col"
            >
              <span className="text-lg md:text-xl font-bold text-foreground leading-tight">
                {trainer?.brandName || "TrainU"}
              </span>
              {trainer && (
                <span className="text-xs text-foreground/60 hidden sm:block">
                  {trainer.niche}
                </span>
              )}
            </Link>
          </div>

          {/* Right: Primary CTA */}
          {trainer && (
            <a
              href={trainer.primaryCTALink}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              Book Consultation
            </a>
          )}
          {!trainer && (
            <a
              href="/trainers/coach-demo"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              View Demo
            </a>
          )}
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel - Left Aligned */}
        <div
          className={`absolute top-0 left-0 h-full w-full sm:w-[380px] bg-card/95 backdrop-blur-2xl border-r border-border/30 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-start justify-between p-6 border-b border-border/30">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {trainer?.brandName || "TrainU"}
              </span>
              {trainer && (
                <>
                  <span className="text-sm text-foreground/70 mt-1">
                    {trainer.niche}
                  </span>
                  <span className="text-xs text-foreground/50 mt-0.5">
                    📍 {trainer.location}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center py-4 px-4 -mx-4 rounded-xl text-xl font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                style={{ 
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.3s ease ${index * 0.05 + 0.1}s`
                }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          {trainer && (
            <div className="px-6 mt-4">
              <a
                href={trainer.primaryCTALink}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gradient-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg shadow-button hover:scale-[1.02] transition-transform"
              >
                {trainer.primaryCTA}
              </a>
            </div>
          )}

          {/* Social Icons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/30">
            <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">Connect</p>
            <div className="flex items-center gap-3">
              {trainer?.social?.instagram && (
                <a
                  href={trainer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {trainer?.social?.youtube && (
                <a
                  href={trainer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {(trainer?.contactEmail || !trainer) && (
                <a
                  href={trainer ? `mailto:${trainer.contactEmail}` : "#"}
                  className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {!trainer && (
                <>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
            <p className="text-center text-foreground/30 text-xs mt-6">
              Powered by TrainU
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayNav;
