import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [language, setLanguage] = useState('ar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/mdyafae/dashboard');
      }
    };

    void checkSession();

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
        description: language === 'ar' ? 'مرحبًا بك في لوحة التحكم' : 'Welcome to the admin dashboard',
        variant: 'default',
      });
      navigate('/mdyafae/dashboard');
    } catch (error) {
      console.error('[AdminLogin] Supabase sign-in failed:', error);
      toast({
        title: language === 'ar' ? 'فشل تسجيل الدخول' : 'Login Failed',
        description: language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png"
            alt="MDYAF مضياف"
            className="h-24 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-mdyafae">
            {language === 'ar' ? 'تسجيل دخول المسؤول' : 'Admin Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar'
              ? 'أدخل حساب المسؤول المسجل في Supabase'
              : 'Enter an administrator account registered in Supabase'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${language === 'ar' ? 'text-right' : 'text-left'} mb-1 text-gray-700`}
              >
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`pl-10 ${language === 'ar' ? 'text-right pr-3' : 'text-left'}`}
                  placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${language === 'ar' ? 'text-right' : 'text-left'} mb-1 text-gray-700`}
              >
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`pl-10 ${language === 'ar' ? 'text-right pr-3' : 'text-left'}`}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-mdyafae hover:bg-mdyafae-dark"
              disabled={isLoading}
            >
              {isLoading
                ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...')
                : (language === 'ar' ? 'تسجيل الدخول' : 'Sign in')}
            </Button>
          </div>

          <div className="text-center mt-4">
            <a
              href="/"
              className="font-medium text-mdyafae hover:text-mdyafae-dark"
            >
              {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to homepage'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
