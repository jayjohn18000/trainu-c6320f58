import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Youtube, Mail } from "lucide-react";

interface FooterProps {
  trainer?: TrainerProfile;
}

const Footer = ({ trainer }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border pb-20 sm:pb-0">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground mb-1">
              {trainer?.brandName || "TrainU Website Factory"}
            </p>
            <p className="text-sm text-foreground/60">
              {trainer
                ? `© ${currentYear} ${trainer.fullName}. All rights reserved.`
                : `© ${currentYear} TrainU. All rights reserved.`}
            </p>
          </div>

          {/* Contact & Social */}
          {trainer && (
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${trainer.contactEmail}`}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{trainer.contactEmail}</span>
              </a>
              {trainer.social.instagram && (
                <a
                  href={trainer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-muted-hover transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {trainer.social.youtube && (
                <a
                  href={trainer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-muted-hover transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* Powered By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/50">Powered by</span>
            <a
              href="https://trainu.us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
            >
              TrainU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
