import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrainerPage from "./pages/TrainerPage";
import ClaimPage from "./pages/ClaimPage";
import ClaimSuccessPage from "./pages/ClaimSuccessPage";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminSubmissionDetail from "./pages/AdminSubmissionDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<ClaimPage />} />
          <Route path="/claim/success" element={<ClaimSuccessPage />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
          <Route path="/admin/submissions/:id" element={<AdminSubmissionDetail />} />
          <Route path="/trainers/:slug" element={<TrainerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
