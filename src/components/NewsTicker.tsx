
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/utils/translations';
import { Button } from '@/components/ui/button';

const NewsTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  const [activeNews, setActiveNews] = useState(0);
  
  // إضافة الأخبار من localStorage أو استخدام القيم الافتراضية
  const [news, setNews] = useState([
    {
      ar: "تطبيق مضياف التطبيق الأول بالإمارات لخدمات الضيافة والطعام فريق إماراتي ومرخص من مؤسسة محمد بن راشد آل مكتوم",
      en: "MDYAF app - The first hospitality and food services app in the UAE with an Emirati team licensed by Mohammed Bin Rashid Al Maktoum Foundation"
    },
    {
      ar: "لديك شركة تعمل في مجال الضيافة بالامارات سجل شركتك معنا واحصل على فرصة انتشار اكبر عبر تطبيق مضياف",
      en: "Do you have a hospitality company in the UAE? Register with us for greater exposure through MDYAF app"
    },
    {
      ar: "تم اضافة اقسام جديدة داخل التطبيق منها خدمة طلب مرافق شخصي او حماية داخل التطبيق",
      en: "New sections have been added to the app including personal companion and security services"
    }
  ]);

  // Load news items from localStorage on component mount
  useEffect(() => {
    const savedNews = localStorage.getItem('newsTickerItems');
    if (savedNews) {
      const parsedNews = JSON.parse(savedNews);
      if (Array.isArray(parsedNews) && parsedNews.length > 0) {
        setNews(parsedNews);
      }
    }
  }, []);

  // تبديل بين الأخبار كل 15 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % news.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [news.length]);

  // الخبر الحالي المعروض
  const currentNews = news[activeNews];
  const newsText = isRtl ? currentNews?.ar : currentNews?.en;

  useEffect(() => {
    // Safety check to make sure we have news items
    if (!currentNews) return;
    
    // تم تعديل هذه الفقرة لتجنب الخطأ الذي يحدث عند إعادة الكتابة في العنصر
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    // إعادة تعيين المحتوى بدلاً من مضاعفته في كل مرة
    ticker.innerHTML = '';
    
    // إضافة المحتوى مرة واحدة
    const contentSpan = document.createElement('span');
    contentSpan.innerHTML = `<span class="mx-4 font-bold">◆</span>${newsText}<span class="mx-4 font-bold">◆</span>`;
    ticker.appendChild(contentSpan);
    
    // إضافة نسخة إضافية للتمرير المستمر
    const cloneSpan = contentSpan.cloneNode(true);
    ticker.appendChild(cloneSpan);
    
    // تعديل اتجاه الحركة بناءً على اللغة
    ticker.style.animationDirection = isRtl ? 'normal' : 'reverse';
  }, [isRtl, activeNews, newsText]);

  // رابط "انضم لينا كمقدم خدمة" الذي سيظل ثابتًا دائمًا
  const serviceProviderText = isRtl ? "انضم الينا كمقدم خدمة" : "Join us as a service provider";
  const serviceProviderUrl = "https://mdyaf.ae/%d8%b5%d9%81%d8%ad%d8%a9-%d8%a7%d9%86%d8%b6%d9%85-%d8%a7%d9%84%d9%8a%d9%86%d8%a7/";

  return (
    <div className="bg-mdyafae text-white overflow-hidden py-3 relative">
      <div
        ref={tickerRef}
        className="whitespace-nowrap inline-block animate-news-ticker"
        style={{ animationDirection: isRtl ? 'normal' : 'reverse' }}
      >
        {/* العنصر سيتم إضافته من خلال useEffect */}
      </div>
      
      {/* عرض رابط "انضم لينا كمقدم خدمة" بشكل ثابت دائمًا */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10">
        <a 
          href={serviceProviderUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-mdyafae-gold text-mdyafae px-4 py-1 rounded-full font-bold hover:bg-white transition-colors inline-flex items-center"
        >
          {serviceProviderText}
        </a>
      </div>
    </div>
  );
};

export default NewsTicker;
