import Layout from "@/components/Layout";
import HeroLanding from "@/components/landing/HeroLanding";
import NoHiddenCostsSection from "@/components/landing/NoHiddenCostsSection";
import WhyThisMattersSection from "@/components/landing/WhyThisMattersSection";
import IsThisYouSection from "@/components/landing/IsThisYouSection";
import WhatYouGetSection from "@/components/landing/WhatYouGetSection";
import TestimonialsLanding from "@/components/landing/TestimonialsLanding";
import FinalCTASection from "@/components/landing/FinalCTASection";

const Home = () => {
  return (
    <Layout>
      <HeroLanding />
      <NoHiddenCostsSection />
      <div id="how-it-works">
        <WhyThisMattersSection />
      </div>
      <IsThisYouSection />
      <div id="what-you-get">
        <WhatYouGetSection />
      </div>
      <div id="testimonials">
        <TestimonialsLanding />
      </div>
      <FinalCTASection />
    </Layout>
  );
};

export default Home;
