
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // تأثير ظهور العناصر عند التمرير
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // تحسين تحميل الصور وإضافة تأثير التلاشي
    const images = document.querySelectorAll('.blur-load');
    images.forEach(image => {
      const img = image.querySelector('img');
      if (img) {
        function loaded() {
          image.classList.add('loaded');
        }
        if (img.complete) {
          loaded();
        } else {
          img.addEventListener('load', loaded);
        }
      }
    });

    // تنظيف ذاكرة التخزين المؤقت للمتصفح بشكل دوري
    const clearCacheInterval = setInterval(() => {
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.startsWith('mdyafae-dynamic-data')) {
              caches.delete(cacheName);
            }
          });
        });
      }
    }, 3600000); // تنظيف كل ساعة

    // تطبيق اتجاه الصفحة بناء على اللغة
    document.body.style.direction = language === 'ar' ? 'rtl' : 'ltr';

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      const images = document.querySelectorAll('.blur-load img');
      images.forEach(img => {
        img.removeEventListener('load', () => {});
      });
      clearInterval(clearCacheInterval);
    };
  }, [language]); // أضفنا language كتبعية للتأثير

  return (
    <motion.div 
      className="flex flex-col min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </motion.div>
  );
};

export default Layout;
