import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import AboutSection from "@/components/AboutSection";
import ResultsSection from "@/components/ResultsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import MobileBottomBar from "@/components/MobileBottomBar";
import { TrainerProfile } from "@/types/TrainerProfile";

// Import trainer data
import coachDemoData from "@/data/trainers/coach-demo.json";

// Trainer data registry
const trainersRegistry: Record<string, TrainerProfile> = {
  "coach-demo": coachDemoData as TrainerProfile,
};

const TrainerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const trainer = slug ? trainersRegistry[slug] : null;

  if (!trainer) {
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
        <CTASection trainer={trainer} />
      </Layout>
      <MobileBottomBar trainer={trainer} />
    </>
  );
};

export default TrainerPage;
