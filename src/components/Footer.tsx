import { Link } from "react-router-dom";
import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Youtube, Mail, ArrowRight } from "lucide-react";

interface FooterProps {
  trainer?: TrainerProfile;
  isDemo?: boolean;
}

const Footer = ({ trainer, isDemo = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border pb-20 sm:pb-0">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container py-12">
        {/* Demo: Add CTA banner above footer content */}
        {isDemo && (
          <div className="mb-10 p-6 rounded-2xl bg-card/50 border border-border/30 text-center">
            <p className="text-foreground/70 mb-3">Like what you see?</p>
            <Link
              to="/claim"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Get Your Own Free Trainer Website
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground mb-1">
              {trainer?.trainer.businessName || "TrainU Website Factory"}
            </p>
            <p className="text-sm text-foreground/60">
              {trainer
                ? `© ${currentYear} ${trainer.trainer.fullName}. All rights reserved.`
                : `© ${currentYear} TrainU. All rights reserved.`}
            </p>
          </div>

          {/* Contact & Social */}
          {trainer && (
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${trainer.contact.email}`}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{trainer.contact.email}</span>
              </a>
              {trainer.social.instagram && (
                <button
                  onClick={() => window.open(trainer.social.instagram, '_blank', 'noopener,noreferrer')}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-muted-hover transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </button>
              )}
              {trainer.social.youtube && (
                <button
                  onClick={() => window.open(trainer.social.youtube, '_blank', 'noopener,noreferrer')}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-muted-hover transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Powered By - Links to landing page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/50">Powered by</span>
            <Link
              to="/"
              className="text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
            >
              TrainU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
