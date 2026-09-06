
import { useState, useEffect } from 'react';
import { 
  Service, 
  Category, 
  getTabsFromCategories, 
  getServicesFromStorage, 
  getCategoriesFromStorage,
  SERVICES_STORAGE_KEY,
  saveServicesToStorage,
  validateAndFixService
} from '@/utils/serviceFilters';
import { initialServices } from '@/data/initialServices';

// فئات الخدمات الافتراضية
const defaultCategories: Category[] = [
  {
    id: 1,
    name_ar: "خدمات الضيافة",
    name_en: "Hospitality Services"
  },
  {
    id: 2,
    name_ar: "خدمات التوصيل",
    name_en: "Delivery Services"
  },
  {
    id: 3,
    name_ar: "المناسبات والحفلات",
    name_en: "Events & Parties"
  },
  {
    id: 4,
    name_ar: "الورود والهدايا",
    name_en: "Flowers & Gifts"
  },
  {
    id: 5,
    name_ar: "أخرى",
    name_en: "Others"
  }
];

export const useServiceData = (language: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tabLabels, setTabLabels] = useState<Record<string, string>>({all: language === 'ar' ? 'الكل' : 'All Services'});
  const [isLoading, setIsLoading] = useState(true);
  
  // تحميل الخدمات
  useEffect(() => {
    setIsLoading(true);
    console.log(`[بدء]: بدء تحميل الخدمات... - ${language}`);
    
    const loadData = () => {
      try {
        // تحميل الخدمات
        let loadedServices = getServicesFromStorage();
        
        // تصحيح أي خدمات غير صالحة
        if (loadedServices && loadedServices.length > 0) {
          loadedServices = loadedServices.map(service => validateAndFixService(service)).filter(Boolean);
        }
        
        // التحقق من صحة بنية البيانات
        const validServices = Array.isArray(loadedServices) && loadedServices.length > 0 
          ? loadedServices 
          : initialServices.map(service => validateAndFixService(service));
        
        // عرض معلومات تصحيح الأخطاء حول الخدمات
        console.log(`[معلومات]: إجمالي الخدمات: ${validServices.length} - ${language}`);
        
        setServices(validServices);
        console.log(`[نجاح]: تم تعيين ${validServices.length} خدمة - ${language}`);
        
        // إذا كانت البيانات غير متطابقة، قم بتحديث التخزين المحلي
        const originalServicesJSON = JSON.stringify(loadedServices);
        const validServicesJSON = JSON.stringify(validServices);
        
        if (originalServicesJSON !== validServicesJSON) {
          console.log(`[تحديث]: الخدمات تحتاج إلى تحديث في التخزين المحلي - ${language}`);
          saveServicesToStorage(validServices);
        }
        
        // تحميل الفئات
        let loadedCategories = getCategoriesFromStorage();
        
        // التحقق من صحة بنية الفئات
        const validCategories = Array.isArray(loadedCategories) && loadedCategories.length > 0 
          ? loadedCategories 
          : defaultCategories;
        
        setCategories(validCategories);
        setTabLabels(getTabsFromCategories(validCategories, language));
        
        console.log(`[اكتمال]: تم تحميل الخدمات والفئات - ${language}`);
      } catch (error) {
        console.error(`[خطأ]: خطأ أثناء تحميل البيانات: ${error} - ${language}`);
        // استخدم البيانات الافتراضية في حالة حدوث خطأ
        setServices(initialServices);
        setCategories(defaultCategories);
        setTabLabels(getTabsFromCategories(defaultCategories, language));
        
        // محاولة إصلاح التخزين المحلي
        try {
          saveServicesToStorage(initialServices);
        } catch (storageError) {
          console.error(`[خطأ]: فشل حفظ البيانات الافتراضية في التخزين المحلي: ${storageError} - ${language}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    // تأخير صغير لضمان أن DOM جاهز
    const timeoutId = setTimeout(loadData, 100);
    return () => clearTimeout(timeoutId);
  }, [language]);

  return { services, categories, tabLabels, isLoading };
};
