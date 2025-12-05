import { ReactNode } from "react";
import { TrainerProfile } from "@/types/TrainerProfile";
import Footer from "./Footer";
import OverlayNav from "./OverlayNav";

interface LayoutProps {
  children: ReactNode;
  trainer?: TrainerProfile;
  isDemo?: boolean;
}

const Layout = ({ children, trainer, isDemo = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <OverlayNav trainer={trainer} isDemo={isDemo} />

      {/* Main Content - extra padding when demo banner is shown */}
      <main className={`pt-16 md:pt-20 ${isDemo ? 'pt-[116px] md:pt-[132px]' : ''}`}>{children}</main>

      {/* Footer */}
      <Footer trainer={trainer} isDemo={isDemo} />
    </div>
  );
};

export default Layout;
