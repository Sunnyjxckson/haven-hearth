import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoiceRoomProvider } from "@/contexts/VoiceRoomContext";
import Index from "./pages/Index";
import TextChannel from "./pages/TextChannel";
import GeneralRoom from "./pages/GeneralRoom";
import Highlights from "./pages/Highlights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VoiceRoomProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/channel/:channelId" element={<TextChannel />} />
            <Route path="/room/:roomId" element={<GeneralRoom />} />
            <Route path="/highlights/:channelId" element={<Highlights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VoiceRoomProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
