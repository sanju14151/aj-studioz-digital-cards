import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import Auth from "./pages/Auth";
import Preview from "./pages/Preview";
import PublicCard from "./pages/PublicCard";
import Dashboard from "./pages/Dashboard";
import IDCards from "./pages/IDCards";
import YoutubeIDCardCreator from "./pages/YoutubeIDCardCreator";
import CustomDomainSettings from "./pages/CustomDomainSettings";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/preview" element={<Preview />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/id-cards" element={<ProtectedRoute><IDCards /></ProtectedRoute>} />
            <Route path="/create/youtube-id-card" element={<ProtectedRoute><YoutubeIDCardCreator /></ProtectedRoute>} />
            <Route path="/settings/custom-domain/:cardId" element={<ProtectedRoute><CustomDomainSettings /></ProtectedRoute>} />
            {/* Public card routes - username based like wcard.io */}
            <Route path="/:username" element={<PublicCard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
