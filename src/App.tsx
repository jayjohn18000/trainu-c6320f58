import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDomainMapping } from "@/hooks/useDomainMapping";
import Home from "./pages/Home";
import TrainerPage from "./pages/TrainerPage";
import ClaimPage from "./pages/ClaimPage";
import ClaimSuccessPage from "./pages/ClaimSuccessPage";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminSubmissionDetail from "./pages/AdminSubmissionDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle domain-based routing
const AppRoutes = () => {
  const { trainerSlug, isCustomDomain, loading } = useDomainMapping();

  // Show loading while checking domain
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If on a custom domain, render the trainer's page at root
  if (isCustomDomain && trainerSlug) {
    return (
      <Routes>
        <Route path="/" element={<TrainerPage customSlug={trainerSlug} />} />
        <Route path="*" element={<TrainerPage customSlug={trainerSlug} />} />
      </Routes>
    );
  }

  // Default routing for main domain
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/claim" element={<ClaimPage />} />
      <Route path="/claim/success" element={<ClaimSuccessPage />} />
      <Route path="/admin/submissions" element={<AdminSubmissions />} />
      <Route path="/admin/submissions/:id" element={<AdminSubmissionDetail />} />
      <Route path="/trainers/:slug" element={<TrainerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
