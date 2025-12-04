import { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";

const ClaimFormSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    brandName: "",
    email: "",
    instagram: "",
    location: "",
    niche: "",
    bio: "",
    programs: "",
    bookingLink: "",
    strategyCall: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to GHL form or backend
    console.log("Form submitted:", formData);
    alert("Thanks! We'll be in touch within 24 hours.");
  };

  return (
    <section id="claim" className="py-20 md:py-28 bg-background-elevated">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Claim Your Free <span className="text-gradient">Trainer Website</span>
            </h2>
            <p className="text-foreground/70">
              Fill out the form below and we'll send you a live link within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Coaching Brand Name *
                </label>
                <input
                  type="text"
                  name="brandName"
                  required
                  value={formData.brandName}
                  onChange={handleChange}
                  className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Smith Strength"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Instagram Link
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Los Angeles, CA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Niche / Specialty *
              </label>
              <input
                type="text"
                name="niche"
                required
                value={formData.niche}
                onChange={handleChange}
                className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Strength Training, Weight Loss, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Short Bio (1–2 sentences)
              </label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Tell us a bit about yourself and your coaching style..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Program Descriptions (optional)
              </label>
              <textarea
                name="programs"
                rows={3}
                value={formData.programs}
                onChange={handleChange}
                className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Briefly describe your coaching programs or services..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Booking Link (Calendly, GHL, etc.)
              </label>
              <input
                type="url"
                name="bookingLink"
                value={formData.bookingLink}
                onChange={handleChange}
                className="w-full bg-card border border-card-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="https://calendly.com/yourlink"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Photos (1–3 photos)
              </label>
              <div className="border-2 border-dashed border-card-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-foreground/40 mx-auto mb-2" />
                <p className="text-foreground/60 text-sm">
                  Drag and drop or click to upload
                </p>
                <p className="text-foreground/40 text-xs mt-1">
                  PNG, JPG up to 10MB
                </p>
                <input type="file" className="hidden" accept="image/*" multiple />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="strategyCall"
                id="strategyCall"
                checked={formData.strategyCall}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-card-border bg-card text-primary focus:ring-primary/50"
              />
              <label htmlFor="strategyCall" className="text-foreground/70 text-sm">
                I'd like a free strategy call about growing my coaching business.
              </label>
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-button hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              Build My Free Site
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ClaimFormSection;
