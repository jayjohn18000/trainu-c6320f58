import { Link } from "react-router-dom";
import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Calendar, ArrowRight } from "lucide-react";

interface MobileBottomBarProps {
  trainer: TrainerProfile;
  isDemo?: boolean;
}

const MobileBottomBar = ({ trainer, isDemo = false }: MobileBottomBarProps) => {
  const bookingLink = trainer.social.bookingLink || trainer.hero.ctaPrimaryLink;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">
              {trainer.trainer.fullName.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground truncate">
            {trainer.trainer.businessName}
          </span>
        </div>

        {/* Actions - Different for demo vs regular */}
        <div className="flex items-center gap-2">
          {isDemo ? (
            <>
              {/* Demo: Calendar as secondary icon button */}
              <a
                href={bookingLink}
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                aria-label="Book consultation"
              >
                <Calendar className="w-5 h-5" />
              </a>
              {/* Demo: Primary CTA to claim form */}
              <Link
                to="/claim"
                className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm shadow-button"
              >
                Get My Site
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              {/* Regular: Original behavior */}
              {trainer.social.instagram && (
                <button
                  onClick={() => window.open(trainer.social.instagram, '_blank', 'noopener,noreferrer')}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </button>
              )}
              <a
                href={bookingLink}
                className="flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm shadow-button"
              >
                <Calendar className="w-4 h-4" />
                Book
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomBar;
