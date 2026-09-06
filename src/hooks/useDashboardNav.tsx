
import { LayoutDashboard, Package, List, Users, Calendar, Radio, Image, Building, Star, Settings, FileText } from 'lucide-react';

export const useDashboardNav = (language: string) => {
  const getNavItems = () => {
    if (language === 'ar') {
      return [
        { to: "/mdyafae/dashboard", text: "الرئيسية", icon: <LayoutDashboard size={20} /> },
        { to: "/mdyafae/hero-slider", text: "صورة الواجهة", icon: <Image size={20} /> },
        { to: "/mdyafae/services", text: "الخدمات", icon: <Package size={20} /> },
        { to: "/mdyafae/features", text: "الميزات", icon: <Star size={20} /> },
        { to: "/mdyafae/bookings", text: "الحجوزات", icon: <Calendar size={20} /> },
        { to: "/mdyafae/users", text: "المستخدمين", icon: <Users size={20} /> },
        { to: "/mdyafae/client-logos", text: "عملاؤنا المميزون", icon: <Building size={20} /> },
        { to: "/mdyafae/news-ticker", text: "الشريط الإخباري", icon: <Radio size={20} /> },
        { to: "/mdyafae/settings", text: "الإعدادات", icon: <Settings size={20} /> },
        { to: "/", text: "العودة للموقع", icon: <FileText size={20} /> },
      ];
    } else {
      return [
        { to: "/mdyafae/dashboard", text: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { to: "/mdyafae/hero-slider", text: "Hero Image", icon: <Image size={20} /> },
        { to: "/mdyafae/services", text: "Services", icon: <Package size={20} /> },
        { to: "/mdyafae/features", text: "Features", icon: <Star size={20} /> },
        { to: "/mdyafae/bookings", text: "Bookings", icon: <Calendar size={20} /> },
        { to: "/mdyafae/users", text: "Users", icon: <Users size={20} /> },
        { to: "/mdyafae/client-logos", text: "Our Clients", icon: <Building size={20} /> },
        { to: "/mdyafae/news-ticker", text: "News Ticker", icon: <Radio size={20} /> },
        { to: "/mdyafae/settings", text: "Settings", icon: <Settings size={20} /> },
        { to: "/", text: "Back to Site", icon: <FileText size={20} /> },
      ];
    }
  };

  return {
    navItems: getNavItems()
  };
};
