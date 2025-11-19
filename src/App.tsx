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
import NFCCards from "./pages/NFCCards";
import QRCodesPage from "./pages/QRCodesPage";
import Contacts from "./pages/Contacts";
import MyLeads from "./pages/MyLeads";
import VirtualBackground from "./pages/VirtualBackground";
import EmailSignature from "./pages/EmailSignature";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Upgrade from "./pages/Upgrade";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Cookies from "./pages/Cookies";
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
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/nfc-cards" element={<NFCCards />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/security" element={<Security />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/nfc-cards" element={<ProtectedRoute><NFCCards /></ProtectedRoute>} />
            <Route path="/dashboard/qr-codes" element={<ProtectedRoute><QRCodesPage /></ProtectedRoute>} />
            <Route path="/dashboard/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path="/dashboard/leads" element={<ProtectedRoute><MyLeads /></ProtectedRoute>} />
            <Route path="/dashboard/virtual-background" element={<ProtectedRoute><VirtualBackground /></ProtectedRoute>} />
            <Route path="/dashboard/email-signature" element={<ProtectedRoute><EmailSignature /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/dashboard/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
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
