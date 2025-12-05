import { MessageCircle, Phone, Send } from "lucide-react";
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
            Ready to start your transformation? Reach out and let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Chat Card */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Chat</h3>
            <p className="text-foreground/60 text-sm mb-5">
              Send me a message on Instagram for quick questions.
            </p>
            {trainer.social.instagram ? (
              <button
                onClick={() => window.open(trainer.social.instagram, '_blank', 'noopener,noreferrer')}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Message on Instagram →
              </button>
            ) : (
              <a
                href={`mailto:${trainer.contact.email}`}
                className="text-primary hover:text-primary-glow font-medium text-sm transition-colors"
              >
                Send an Email →
              </a>
            )}
          </div>

          {/* Call Card */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Call</h3>
            <p className="text-foreground/60 text-sm mb-5">
              Book a free consultation call to discuss your goals.
            </p>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow font-medium text-sm transition-colors"
            >
              Book a Call →
            </a>
          </div>

          {/* Send Message Form */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:row-span-1">
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
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
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
