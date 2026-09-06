
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Clock, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface DashboardSidebarProps {
  language: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  lastLogin: string | null;
  navItems: Array<{
    to: string;
    text: string;
    icon: React.ReactNode;
  }>;
  location: { pathname: string };
  handleLogout: () => void;
  username?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  language,
  sidebarOpen,
  setSidebarOpen,
  lastLogin,
  navItems,
  location,
  handleLogout,
  username
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (language === 'ar') {
        // تنسيق للعربية
        const day = date.toLocaleDateString('ar-SA', { weekday: 'long' });
        const dateFormatted = date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
        const time = date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        return `${day}، ${dateFormatted} - ${time}`;
      } else {
        // تنسيق للإنجليزية
        return format(date, "EEEE, MMMM do yyyy 'at' h:mm a");
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <aside 
      className={`
        ${sidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}
        md:translate-x-0
        w-64 h-full bg-white shadow-md z-20
        transition-transform duration-300 ease-in-out
        fixed md:relative
        ${language === 'ar' ? 'right-0' : 'left-0'}
      `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
            alt="MDYAF مضياف" 
            className="h-10 w-auto"
          />
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 rounded-md text-mdyafae hover:bg-mdyafae/10 transition-colors"
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* عرض معلومات المستخدم */}
      {username && (
        <div className={`px-4 py-3 text-sm bg-mdyafae/5 border-b ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="font-medium text-mdyafae">
            {language === 'ar' ? `مرحباً، ${username}` : `Welcome, ${username}`}
          </div>
        </div>
      )}

      {/* عرض آخر تسجيل دخول */}
      {lastLogin && (
        <div className={`px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b flex items-center ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <Clock size={14} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
          <span>
            {language === 'ar' ? 'آخر تسجيل دخول: ' : 'Last login: '}
            {formatDate(lastLogin)}
          </span>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4 h-[calc(100vh-14rem)]">
        <ul className="space-y-2 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${location.pathname === item.to 
                    ? 'bg-mdyafae text-white' 
                    : 'text-gray-600 hover:bg-mdyafae/10 hover:text-mdyafae'}
                  ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}
                `}
              >
                <span>{item.icon}</span>
                <span className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t space-y-3">
        <Button
          onClick={handleLogout}
          variant="outline"
          className={`w-full flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          <LogOut size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
          {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </Button>
      </div>

      <div className="hidden md:block absolute top-20 -right-3 bg-white rounded-full shadow-md">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-mdyafae hover:text-mdyafae-dark rounded-full"
        >
          {language === 'ar' 
            ? (sidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)
            : (sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />)
          }
        </button>
      </div>
    </aside>
  );
};
