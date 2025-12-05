import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import MobileBottomBar from "@/components/MobileBottomBar";
import { useTrainerProfile } from "@/hooks/useTrainerProfile";

type TrainerPageProps = {
  customSlug?: string;
};

const TrainerPage = ({ customSlug }: TrainerPageProps) => {
  const { slug: urlSlug } = useParams<{ slug: string }>();
  const slug = customSlug || urlSlug;
  const { trainer, loading, error } = useTrainerProfile(slug);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground/60">Loading trainer profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !trainer) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
            <p className="text-xl text-foreground/60 mb-6">Trainer Not Found</p>
            <a
              href="/"
              className="text-primary hover:text-primary-glow font-semibold transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout trainer={trainer}>
        <HeroSection trainer={trainer} />
        <ProgramsSection programs={trainer.programs} />
        <AboutSection trainer={trainer} />
        <ResultsSection trainer={trainer} />
        <TestimonialSection trainer={trainer} />
        <ContactSection trainer={trainer} />
        <CTASection trainer={trainer} />
      </Layout>
      <MobileBottomBar trainer={trainer} />
    </>
  );
};

export default TrainerPage;
