import { ReactNode } from "react";
import { TrainerProfile } from "@/types/TrainerProfile";
import Footer from "./Footer";
import OverlayNav from "./OverlayNav";

interface LayoutProps {
  children: ReactNode;
  trainer?: TrainerProfile;
}

const Layout = ({ children, trainer }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <OverlayNav trainer={trainer} />

      {/* Main Content */}
      <main className="pt-16 md:pt-20">{children}</main>

      {/* Footer */}
      <Footer trainer={trainer} />
    </div>
  );
};

export default Layout;
