import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocumentaryEvent from "./pages/DocumentaryEvent";
import CodingCompetition from "./pages/CodingCompetition";
import StandupComedy from "./pages/StandupComedy";
import QuizCompetition from "./pages/QuizCompetition";
import Ideathon from "./pages/Ideathon";
import Contact from "./pages/Contact";
import Merchandise from "./pages/Merchandise";
import EnhancedMagicalCursor from "./components/EnhancedMagicalCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EnhancedMagicalCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events/documentary" element={<DocumentaryEvent />} />
          <Route path="/events/coding" element={<CodingCompetition />} />
          <Route path="/events/comedy" element={<StandupComedy />} />
          <Route path="/events/quiz" element={<QuizCompetition />} />
          <Route path="/events/ideathon" element={<Ideathon />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/merchandise" element={<Merchandise />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
