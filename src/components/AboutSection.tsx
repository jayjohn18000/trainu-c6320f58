import { TrainerProfile } from "@/types/TrainerProfile";

interface AboutSectionProps {
  trainer: TrainerProfile;
}

const AboutSection = ({ trainer }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background-elevated">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Gallery */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {trainer.galleryImageUrls.slice(0, 4).map((url, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl ${
                    index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${trainer.fullName} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {index === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Meet {trainer.fullName.split(" ")[0]}
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-foreground-muted leading-relaxed">
                {trainer.aboutMe}
              </p>
            </div>

            {/* Stats/Info */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl p-4 border border-card-border">
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {trainer.niche.split(" ")[0]}
                </p>
                <p className="text-sm text-foreground-muted">
                  {trainer.niche}
                </p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-card-border">
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  📍
                </p>
                <p className="text-sm text-foreground-muted">
                  {trainer.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            {(trainer.social.instagram || trainer.social.tiktok || trainer.social.youtube) && (
              <div className="flex gap-4">
                {trainer.social.instagram && (
                  <a
                    href={trainer.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-accent border border-border flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {trainer.social.tiktok && (
                  <a
                    href={trainer.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-accent border border-border flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                )}
                {trainer.social.youtube && (
                  <a
                    href={trainer.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-accent border border-border flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
