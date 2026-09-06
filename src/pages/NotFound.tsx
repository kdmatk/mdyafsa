
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Home, ArrowRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const [isArabic, setIsArabic] = useState(language === 'ar');

  useEffect(() => {
    // استماع لتغييرات اللغة
    const handleLanguageChange = (event: CustomEvent) => {
      setIsArabic(event.detail === 'ar');
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [location.pathname]);

  // التأكد من تعيين الاتجاه بناءً على اللغة
  useEffect(() => {
    setIsArabic(language === 'ar');
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className={`max-w-lg w-full text-center ${isArabic ? 'rtl' : 'ltr'}`}>
        <img 
          src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
          alt="MDYAF مضياف" 
          className="h-20 mx-auto mb-6"
        />

        <h1 className="text-6xl font-bold text-mdyafae mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isArabic ? 'عفواً، الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          {isArabic 
            ? 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها أو حذفها' 
            : 'The page you are looking for doesn\'t exist or has been moved or deleted'}
        </p>

        <Alert variant="destructive" className="mb-6 text-right">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className={`${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'ملاحظة هامة' : 'Important Note'}
          </AlertTitle>
          <AlertDescription className={`${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic 
              ? 'إذا كنت تحاول الوصول إلى موقعنا عبر نطاق مخصص، فقد تكون إعدادات DNS لا تزال قيد التنفيذ. يرجى المحاولة مرة أخرى لاحقاً.' 
              : 'If you are trying to access our site via a custom domain, DNS settings might still be propagating. Please try again later.'}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/" 
            className={`flex items-center bg-mdyafae hover:bg-mdyafae-dark text-white px-6 py-3 rounded-md transition-colors duration-300 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <Home className={`h-5 w-5 ${isArabic ? 'ml-2' : 'mr-2'}`} />
            {isArabic ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
          </a>
          
          <a 
            href="tel:920033765" 
            className={`flex items-center bg-white border border-mdyafae text-mdyafae hover:bg-gray-50 px-6 py-3 rounded-md transition-colors duration-300 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            {isArabic ? 'اتصل بنا للمساعدة' : 'Call Us for Help'}
            <ArrowRight className={`h-5 w-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
