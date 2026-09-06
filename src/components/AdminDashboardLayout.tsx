import { useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DashboardHeader } from './admin/dashboard/DashboardHeader';
import { DashboardSidebar } from './admin/dashboard/DashboardSidebar';
import { DashboardContent } from './admin/dashboard/DashboardContent';
import { useDashboardNav } from '@/hooks/useDashboardNav';
import { supabase } from '@/lib/supabase';

interface AdminDashboardLayoutProps {
  children?: ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const [language, setLanguage] = useState('ar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { navItems } = useDashboardNav(language);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate('/mdyafae', { replace: true });
        setAuthChecked(true);
        return;
      }

      setUsername(data.user.email ?? 'admin');
      setLastLogin(data.user.last_sign_in_at ?? null);
      setAuthChecked(true);
    };

    void checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/mdyafae', { replace: true });
      }
    });

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: language === 'ar' ? 'تعذر تسجيل الخروج' : 'Logout Failed',
        description: language === 'ar' ? 'يرجى المحاولة مرة أخرى' : 'Please try again',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged Out Successfully',
      description: language === 'ar' ? 'تم تسجيل خروجك من لوحة التحكم' : 'You have been logged out from the dashboard',
    });
    navigate('/mdyafae', { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">{language === 'ar' ? 'جاري التحقق من الجلسة...' : 'Checking session...'}</p>
      </div>
    );
  }

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-100">
      <DashboardHeader
        language={language}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        <DashboardSidebar
          language={language}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          lastLogin={lastLogin}
          navItems={navItems}
          location={location}
          handleLogout={handleLogout}
          username={username}
        />

        <DashboardContent>
          {children || <Outlet />}
        </DashboardContent>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
