
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import OurServices from "./pages/OurServices";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminServiceForm from "./pages/AdminServiceForm";
import AdminFeatures from "./pages/AdminFeatures";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminNewsTicker from "./pages/AdminNewsTicker";
import AdminHeroSlider from "./pages/AdminHeroSlider";
import AdminClientLogos from "./pages/AdminClientLogos";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboardLayout from "./components/AdminDashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* مسارات الموقع الأمامي */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* مسار تسجيل الدخول الإداري */}
          <Route path="/mdyafae" element={<AdminLogin />} />
          
          {/* مسارات لوحة التحكم محمية بالـ AdminDashboardLayout */}
          <Route element={<AdminDashboardLayout />}>
            <Route path="/mdyafae/dashboard" element={<AdminDashboard />} />
            <Route path="/mdyafae/services" element={<AdminServices />} />
            <Route path="/mdyafae/services/add" element={<AdminServiceForm />} />
            <Route path="/mdyafae/services/edit/:id" element={<AdminServiceForm />} />
            <Route path="/mdyafae/features" element={<AdminFeatures />} />
            <Route path="/mdyafae/bookings" element={<AdminBookings />} />
            <Route path="/mdyafae/users" element={<AdminUsers />} />
            <Route path="/mdyafae/news-ticker" element={<AdminNewsTicker />} />
            <Route path="/mdyafae/hero-slider" element={<AdminHeroSlider />} />
            <Route path="/mdyafae/client-logos" element={<AdminClientLogos />} />
            <Route path="/mdyafae/settings" element={<Navigate to="/mdyafae" replace />} />
          </Route>
          
          {/* إعادة توجيه المسارات القديمة للمسارات الجديدة */}
          <Route path="/admin" element={<Navigate to="/mdyafae" replace />} />
          <Route path="/admin-panel" element={<Navigate to="/mdyafae" replace />} />
          <Route path="/admin-panel/*" element={<Navigate to="/mdyafae" replace />} />
          
          {/* مسار التوجيه لصفحة 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
