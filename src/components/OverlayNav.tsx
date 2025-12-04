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
        { label: "Programs", href: "#programs" },
        { label: "About", href: "#about" },
        { label: "Results", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Demo", href: "/trainers/coach-demo" },
      ];

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link
            to={trainer ? `/trainers/${trainer.slug}` : "/"}
            className="flex items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-bold text-foreground">
              {trainer?.brandName || "TrainU"}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
          >
            <Menu className="w-5 h-5 text-foreground" />
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              Menu
            </span>
          </button>
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
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-card/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <span className="text-xl font-bold text-foreground">
              {trainer?.brandName || "TrainU"}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center py-4 text-2xl font-medium text-foreground/80 hover:text-primary transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
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
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/50">
            <div className="flex items-center justify-center gap-4">
              {trainer?.social?.instagram && (
                <a
                  href={trainer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {trainer?.social?.youtube && (
                <a
                  href={trainer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {(trainer?.contactEmail || !trainer) && (
                <a
                  href={trainer ? `mailto:${trainer.contactEmail}` : "#"}
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
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
                    className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
            <p className="text-center text-foreground/40 text-xs mt-4">
              Powered by TrainU
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayNav;
