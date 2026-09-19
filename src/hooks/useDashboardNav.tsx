import { LayoutDashboard, Package, Users, Calendar, Radio, Image, Building, Star, FileText, BriefcaseBusiness, Headphones, ShoppingBag } from 'lucide-react';

export const useDashboardNav = (language: string) => {
  const ar = language === 'ar';
  return { navItems: [
    { to: "/mdyafae/dashboard", text: ar ? "مركز العمليات" : "Operations Hub", icon: <LayoutDashboard size={20} /> },
    { to: "/mdyafae/projects", text: ar ? "المشاريع التقنية" : "Tech Projects", icon: <BriefcaseBusiness size={20} /> },
    { to: "/mdyafae/clients", text: ar ? "العملاء" : "Clients", icon: <Building size={20} /> },
    { to: "/mdyafae/tickets", text: ar ? "الدعم والتذاكر" : "Support Tickets", icon: <Headphones size={20} /> },
    { to: "/mdyafae/orders", text: ar ? "الطلبات والخدمات" : "Orders", icon: <ShoppingBag size={20} /> },
    { to: "/mdyafae/services", text: ar ? "خدمات الموقع" : "Website Services", icon: <Package size={20} /> },
    { to: "/mdyafae/bookings", text: ar ? "الحجوزات" : "Bookings", icon: <Calendar size={20} /> },
    { to: "/mdyafae/users", text: ar ? "المستخدمون" : "Users", icon: <Users size={20} /> },
    { to: "/mdyafae/hero-slider", text: ar ? "واجهة الموقع" : "Hero", icon: <Image size={20} /> },
    { to: "/mdyafae/features", text: ar ? "الميزات" : "Features", icon: <Star size={20} /> },
    { to: "/mdyafae/client-logos", text: ar ? "شعارات العملاء" : "Client Logos", icon: <Building size={20} /> },
    { to: "/mdyafae/news-ticker", text: ar ? "الشريط الإخباري" : "News Ticker", icon: <Radio size={20} /> },
    { to: "/", text: ar ? "عرض الموقع" : "View Site", icon: <FileText size={20} /> },
  ]};
};
