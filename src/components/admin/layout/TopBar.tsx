
import React from 'react';
import { Menu, User, LogOut, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TopBarProps {
  language: string;
  setLanguage: (language: string) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  username?: string; // إضافة خاصية اسم المستخدم
}

export const TopBar: React.FC<TopBarProps> = ({
  language,
  setLanguage,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  isSidebarOpen,
  setIsSidebarOpen,
  username = 'admin', // القيمة الافتراضية هي admin
}) => {
  const isRtl = language === 'ar';
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLastLogin');
    localStorage.removeItem('adminUsername'); // حذف اسم المستخدم عند تسجيل الخروج
    
    toast({
      title: language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logout Successful',
      description: language === 'ar' ? 'نراك قريبًا!' : 'See you soon!',
    });
    
    navigate('/admin/login');
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50 h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {/* زر القائمة الجانبية للجوال */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* زر القائمة الجانبية للأجهزة اللوحية والحواسيب */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isRtl ? (
              isSidebarOpen ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />
            ) : (
              isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />
            )}
          </Button>
          
          <div className={`text-xl font-semibold text-mdyafae ${isRtl ? 'mr-4' : 'ml-4'}`}>
            {language === 'ar' ? 'لوحة تحكم مضياف' : 'MDYAF Dashboard'}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* قائمة اللغة */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {language === 'ar' ? 'العربية' : 'English'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* قائمة المستخدم */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {isRtl ? 'حساب المستخدم' : 'Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{username}</span> {/* عرض اسم المستخدم */}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>{isRtl ? 'تسجيل الخروج' : 'Logout'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
