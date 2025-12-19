import { Send, Calendar, Instagram } from "lucide-react";
import { TrainerProfile } from "@/types/TrainerProfile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ContactSectionProps {
  trainer: TrainerProfile;
}

const ContactSection = ({ trainer }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const bookingLink = trainer.social.bookingLink || trainer.hero.ctaPrimaryLink;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For static site, open mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${trainer.contact.email}?subject=${subject}&body=${body}`;
    toast({
      title: "Opening email client",
      description: "Your message is ready to send.",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Ready to start? Book a free consult or send me a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Book a Free Consult Card */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Book a Free Consult</h3>
            <p className="text-foreground/60 text-sm mb-6 flex-1">
              Schedule a quick call to discuss your goals and see if we're a good fit. No pressure, no commitment.
            </p>
            {bookingLink && (
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground py-4 rounded-xl font-semibold transition-all duration-300 shadow-button hover:shadow-glow hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consult
              </a>
            )}
            {trainer.social.instagram && (
              <button
                onClick={() => window.open(trainer.social.instagram, '_blank', 'noopener,noreferrer')}
                className="flex items-center justify-center gap-2 text-foreground/50 hover:text-primary text-sm mt-4 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Quick question? Message me on Instagram →
              </button>
            )}
          </div>

          {/* Send Message Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-5">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full border-border hover:border-primary/30"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
