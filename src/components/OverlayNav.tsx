import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Menu, Instagram, Youtube, Mail, Home, Calendar, Twitter, Facebook } from "lucide-react";
import { TrainerProfile } from "@/types/TrainerProfile";

interface OverlayNavProps {
  trainer?: TrainerProfile;
  isDemo?: boolean;
}

const OverlayNav = ({ trainer, isDemo = false }: OverlayNavProps) => {
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

  const bookingLink = trainer?.social?.bookingLink || trainer?.hero?.ctaPrimaryLink;

  // Navigation links based on context - Updated for demo
  const navLinks = trainer
    ? isDemo
      ? [
          { label: "Home", href: `/trainers/${trainer.slug}` },
          { label: "Programs", href: "#programs" },
          { label: "Results", href: "#testimonials" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "Contact", href: "#contact" },
          { label: "Back to TrainU", href: "/", isInternal: true },
        ]
      : [
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
        { label: "Get My Free Site", href: "/claim", isInternal: true },
      ];

  // CTA configuration based on context - Demo shows Book Free Consult
  const headerCta = isDemo
    ? { label: "Book Free Consult", href: bookingLink || "#contact", isInternal: false }
    : trainer
    ? { label: "Book Consultation", href: trainer.hero.ctaPrimaryLink, isInternal: false }
    : { label: "View Demo", href: "/trainers/coach-demo", isInternal: true };

  return (
    <>
      {/* Top Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/20 ${isDemo ? 'top-[52px]' : ''}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card/50 border border-border/30 hover:bg-card hover:border-primary/30 transition-all duration-200"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <Link
              to={trainer ? `/trainers/${trainer.slug}` : "/"}
              className="flex flex-col"
            >
              <span className="text-lg md:text-xl font-bold text-foreground leading-tight">
                {trainer?.trainer.businessName || "TrainU"}
              </span>
              {trainer && (
                <span className="text-xs text-foreground/60 hidden sm:block">
                  {trainer.trainer.specialty}
                </span>
              )}
            </Link>
          </div>

          {/* Right: Primary CTA */}
          {headerCta.isInternal ? (
            <Link
              to={headerCta.href}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              {headerCta.label}
            </Link>
          ) : (
            <a
              href={headerCta.href}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              {headerCta.label}
            </a>
          )}
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-background/95 backdrop-blur-lg transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Panel - Left Aligned */}
        <div
          className={`absolute top-0 left-0 h-full w-full sm:w-[400px] bg-card/98 backdrop-blur-2xl border-r border-border/20 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-start justify-between p-6 border-b border-border/20">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {trainer?.trainer.businessName || "TrainU"}
              </span>
              {trainer ? (
                <>
                  <span className="text-sm text-foreground/70 mt-1">
                    {trainer.trainer.specialty}
                  </span>
                  <span className="text-xs text-foreground/50 mt-0.5">
                    📍 {trainer.trainer.location}
                  </span>
                </>
              ) : (
                <span className="text-sm text-foreground/60 mt-1">
                  Free Trainer Websites
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col p-6 gap-1" aria-label="Main navigation">
            {navLinks.map((link, index) => (
              link.isInternal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 py-4 px-4 -mx-4 rounded-xl text-xl font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                  style={{ 
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease ${index * 0.05 + 0.1}s`
                  }}
                >
                  {link.label === "Back to TrainU" && <Home className="w-5 h-5" />}
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ) : (
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
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="px-6 mt-4 space-y-3">
            {/* Primary CTA - For demo, show Book Free Consult */}
            {isDemo && trainer ? (
              <>
                <a
                  href={bookingLink}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg shadow-button hover:scale-[1.02] transition-transform"
                >
                  Book Free Consult
                </a>
                {/* Secondary: Get My Free Site */}
                <Link
                  to="/claim"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-foreground/60 hover:text-foreground py-2 transition-colors"
                >
                  Trainer? Get your own site free →
                </Link>
              </>
            ) : trainer ? (
              <a
                href={trainer.hero.ctaPrimaryLink}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gradient-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg shadow-button hover:scale-[1.02] transition-transform"
              >
                {trainer.hero.ctaPrimaryLabel}
              </a>
            ) : (
              <Link
                to="/claim"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gradient-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg shadow-button hover:scale-[1.02] transition-transform"
              >
                Get My Free Site
              </Link>
            )}
          </div>

          {/* Social Icons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/20">
            <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">Connect</p>
            <div className="flex items-center gap-3 flex-wrap">
              {trainer ? (
                <>
                  {trainer.social?.instagram && (
                    <button
                      onClick={() => window.open(trainer.social.instagram, '_blank', 'noopener,noreferrer')}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </button>
                  )}
                  {trainer.social?.youtube && (
                    <button
                      onClick={() => window.open(trainer.social.youtube, '_blank', 'noopener,noreferrer')}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </button>
                  )}
                  {trainer.contact?.email && (
                    <a
                      href={`mailto:${trainer.contact.email}`}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => window.open('https://instagram.com/official.trainu', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => window.open('https://twitter.com/official_trainu', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => window.open('https://tiktok.com/@trainu8', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open('https://facebook.com/TrainU', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <a
                    href="mailto:hello@trainu.us"
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
            <Link 
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-center text-foreground/30 hover:text-primary text-xs mt-6 transition-colors"
            >
              Powered by TrainU
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayNav;
