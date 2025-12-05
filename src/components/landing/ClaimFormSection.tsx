import useScrollAnimation from "@/hooks/useScrollAnimation";
import TrainerWebsiteForm from "@/components/TrainerWebsiteForm";

const ClaimFormSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="claim" className="py-24 md:py-32 bg-background-elevated relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container relative">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Form Container */}
          <div 
            className={`bg-card rounded-2xl border border-border/50 p-6 sm:p-8 backdrop-blur transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <TrainerWebsiteForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimFormSection;
