
import { useState, useEffect } from 'react';
import { HeroConfig } from '@/types/heroSlider';
import { ensureAbsoluteUrl } from '@/utils/imageUtils';

/**
 * هوك لتحميل إعدادات السلايدر من localStorage
 */
export const useConfigLoader = () => {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    useSlider: false,
    images: []
  });

  useEffect(() => {
    console.log("بدأ تحميل إعدادات صورة الواجهة...");
    
    const loadConfig = () => {
      try {
        const config = localStorage.getItem('heroSliderConfig');
        console.log("البيانات المستلمة من localStorage:", config);
        
        if (config) {
          const parsedConfig = JSON.parse(config);
          console.log("تم تحليل إعدادات صورة الواجهة:", parsedConfig);
          
          if (parsedConfig.images && parsedConfig.images.length > 0) {
            // التحقق من أن الصور تحتوي على روابط صالحة وتعديل الروابط النسبية
            const validatedConfig = {
              ...parsedConfig,
              images: parsedConfig.images
                .filter((img: any) => img && img.imageUrl)
                .map((img: any) => ({
                  ...img,
                  imageUrl: ensureAbsoluteUrl(img.imageUrl)
                }))
            };
            
            console.log("إعدادات الصور بعد التحقق:", validatedConfig);
            console.log("عدد الصور الصالحة:", validatedConfig.images.length);
            setHeroConfig(validatedConfig);
          } else {
            console.log("لا توجد صور في الإعدادات");
            setHeroConfig(parsedConfig);
          }
        } else {
          console.log("لم يتم العثور على إعدادات صورة الواجهة في localStorage");
        }
      } catch (error) {
        console.error('خطأ في تحليل إعدادات صورة الواجهة:', error);
      }
    };

    // تحميل الإعدادات عند تهيئة المكون
    loadConfig();

    // إعداد مستمع للتغييرات في localStorage
    const handleStorageChange = (e: StorageEvent) => {
      console.log("تم اكتشاف تغيير في localStorage:", e.key);
      if (e.key === 'heroSliderConfig') {
        console.log("تم تغيير إعدادات صورة الواجهة، جاري إعادة التحميل...");
        loadConfig();
      }
    };

    // إضافة مستمع حدث للتغييرات في localStorage
    window.addEventListener('storage', handleStorageChange);

    // إضافة مستمع حدث مخصص للتغييرات الداخلية
    const handleCustomEvent = () => {
      console.log("تم استلام حدث تحديث مخصص، جاري إعادة تحميل الإعدادات...");
      loadConfig();
    };
    
    window.addEventListener('heroConfigUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('heroConfigUpdated', handleCustomEvent);
    };
  }, []);

  return { heroConfig };
};
