import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Youtube, Mail, MapPin, Users, Award, Star, Check } from "lucide-react";

interface AboutSectionProps {
  trainer: TrainerProfile;
}

const AboutSection = ({ trainer }: AboutSectionProps) => {
  // Use the third gallery image (Strength in Action) or profile photo
  const galleryImages = trainer.trainer.galleryImageUrls || [];
  const heroImage = galleryImages[2] || galleryImages[0] || trainer.trainer.profilePhotoUrl;

  // Use dynamic stats from trainer profile or fallback to defaults
  const stats = trainer.stats || {};
  const clientCount = stats.clientCount || "200+";
  const rating = stats.rating || "5.0";
  const yearsExperience = stats.yearsExperience || "5+";

  const expectations = [
    "A plan you can follow (even on busy weeks)",
    "Clear weekly targets, not vague advice",
    "Regular progress reviews + adjustments",
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 bg-background-elevated">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Single Hero Image with Floating Stats */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <img
                src={heroImage}
                alt={`${trainer.trainer.fullName} - Strength in Action`}
                className="w-full h-full object-cover object-top scale-[1.02] brightness-110"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Cards - Using dynamic stats */}
            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 md:bottom-8 md:-right-8 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 shadow-xl max-w-[140px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">{clientCount}</p>
                  <p className="text-[10px] sm:text-xs text-foreground/60">Clients Transformed</p>
                </div>
              </div>
            </div>

            <div className="absolute top-3 -left-2 sm:top-4 sm:-left-4 md:top-8 md:-left-8 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 shadow-xl max-w-[120px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">{rating}</p>
                  <p className="text-[10px] sm:text-xs text-foreground/60">Client Rating</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-2 sm:-right-4 md:-right-8 -translate-y-1/2 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 shadow-xl max-w-[130px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">{yearsExperience}</p>
                  <p className="text-[10px] sm:text-xs text-foreground/60">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
              Your Coach
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Meet {trainer.trainer.fullName}
            </h2>
            <div className="flex items-center gap-2 text-foreground/60 mb-4 sm:mb-6">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm">{trainer.trainer.specialty} • {trainer.trainer.location}</span>
            </div>
            
            <div className="space-y-4 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl">
                {trainer.trainer.bio}
              </p>
            </div>

            {/* What you can expect */}
            <div className="bg-card/50 border border-border/50 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">What you can expect:</p>
              <ul className="space-y-2">
                {expectations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="border-t border-border/30 pt-4 sm:pt-6">
              <p className="text-xs text-foreground/50 uppercase tracking-wider mb-3 sm:mb-4">Connect with {trainer.trainer.fullName.split(" ")[0]}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {trainer.social.instagram && (
                  <a
                    href={trainer.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                  >
                    <Instagram className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm text-foreground/80">Instagram</span>
                  </a>
                )}
                {trainer.social.youtube && (
                  <a
                    href={trainer.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                  >
                    <Youtube className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm text-foreground/80">YouTube</span>
                  </a>
                )}
                <a
                  href={`mailto:${trainer.contact.email}`}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-foreground/80">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
