
import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('language') || 'ar';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return 'ar';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error setting language in localStorage:', error);
    }

    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [language]);

  const isRtl = language === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  return { 
    language, 
    setLanguage, 
    isRtl, 
    direction 
  };
};
