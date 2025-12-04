import { TrainerProfile } from "@/types/TrainerProfile";
import { Instagram, Youtube, Mail, MapPin } from "lucide-react";

interface AboutSectionProps {
  trainer: TrainerProfile;
}

const galleryLabels = [
  "Training Day",
  "Strength in Action",
  "Client Results"
];

const AboutSection = ({ trainer }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background-elevated">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Gallery - Redesigned */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-3">
              {trainer.galleryImageUrls.slice(0, 3).map((url, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl aspect-[4/5] group"
                >
                  <img
                    src={url}
                    alt={`${trainer.fullName} - ${galleryLabels[index]}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  {/* Label */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-medium text-foreground/80 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md">
                      {galleryLabels[index]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              About
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Meet {trainer.fullName}
            </h2>
            <div className="flex items-center gap-2 text-foreground/60 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{trainer.niche} • {trainer.location}</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-foreground/70 leading-relaxed max-w-xl">
                {trainer.aboutMe}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-card rounded-xl p-4 border border-card-border text-center">
                <p className="text-2xl font-bold text-primary mb-1">200+</p>
                <p className="text-xs text-foreground/60">Clients</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-card-border text-center">
                <p className="text-2xl font-bold text-foreground mb-1">5+</p>
                <p className="text-xs text-foreground/60">Years</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-card-border text-center">
                <p className="text-2xl font-bold text-foreground mb-1">5.0</p>
                <p className="text-xs text-foreground/60">Rating</p>
              </div>
            </div>

            {/* Connect Section */}
            <div className="border-t border-border/30 pt-6">
              <p className="text-xs text-foreground/50 uppercase tracking-wider mb-4">Connect with {trainer.fullName.split(" ")[0]}</p>
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
                  href={`mailto:${trainer.contactEmail}`}
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
