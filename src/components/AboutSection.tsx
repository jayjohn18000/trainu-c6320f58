import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Youtube, Mail, MapPin, Users, Award, Star } from "lucide-react";

interface AboutSectionProps {
  trainer: TrainerProfile;
}

const AboutSection = ({ trainer }: AboutSectionProps) => {
  // Use the third gallery image (Strength in Action) or profile photo
  const galleryImages = trainer.trainer.galleryImageUrls || [];
  const heroImage = galleryImages[2] || galleryImages[0] || trainer.trainer.profilePhotoUrl;

  return (
    <section id="about" className="py-20 md:py-32 bg-background-elevated">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Single Hero Image with Floating Stats */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <img
                src={heroImage}
                alt={`${trainer.trainer.fullName} - Strength in Action`}
                className="w-full h-full object-cover brightness-110"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">200+</p>
                  <p className="text-xs text-foreground/60">Clients Transformed</p>
                </div>
              </div>
            </div>

            <div className="absolute top-4 -left-4 md:top-8 md:-left-8 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">5.0</p>
                  <p className="text-xs text-foreground/60">Client Rating</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">5+</p>
                  <p className="text-xs text-foreground/60">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              About
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Meet {trainer.trainer.fullName}
            </h2>
            <div className="flex items-center gap-2 text-foreground/60 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{trainer.trainer.specialty} • {trainer.trainer.location}</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-foreground/70 leading-relaxed max-w-xl">
                {trainer.trainer.bio}
              </p>
            </div>

            {/* Connect Section */}
            <div className="border-t border-border/30 pt-6">
              <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">Connect with {trainer.trainer.fullName.split(" ")[0]}</p>
              <div className="flex flex-wrap gap-3">
                {trainer.social.instagram && (
                  <a
                    href={trainer.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                  >
                    <Instagram className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground/80">Instagram</span>
                  </a>
                )}
                {trainer.social.youtube && (
                  <a
                    href={trainer.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                  >
                    <Youtube className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground/80">YouTube</span>
                  </a>
                )}
                <a
                  href={`mailto:${trainer.contact.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground/80">Email</span>
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
