
export interface Service {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  active: boolean;
  category_id: number;
}

export interface Category {
  id: number;
  name_ar: string;
  name_en: string;
}

// مفتاح ثابت لتخزين البيانات في localStorage - استخدام نفس المفتاح في جميع أنحاء التطبيق
export const SERVICES_STORAGE_KEY = 'adminServices';
export const CATEGORIES_STORAGE_KEY = 'serviceCategories';

// تحسين وظيفة الحصول على علامات التبويب من الفئات
export const getTabsFromCategories = (categories: Category[], language: string): Record<string, string> => {
  if (!categories || categories.length === 0) {
    console.warn(`[تحذير]: لا توجد فئات للتصنيف - ${language}`);
    return { all: language === 'ar' ? 'الكل' : 'All Services' };
  }
  
  const tabs: Record<string, string> = { all: language === 'ar' ? 'الكل' : 'All Services' };
  
  categories.forEach(category => {
    if (category && typeof category.id === 'number') {
      const key = `category_${category.id}`;
      tabs[key] = language === 'ar' ? category.name_ar : category.name_en;
    } else {
      console.warn(`[تحذير]: فئة غير صالحة - ${language}`, category);
    }
  });
  
  return tabs;
};

// تحسين وظيفة التصفية لضمان عرض الخدمات النشطة فقط
export const getFilteredServices = (services: Service[], activeTab: string, language: string): Service[] => {
  // التحقق من صحة البيانات
  if (!Array.isArray(services)) {
    console.error(`[خطأ]: بيانات الخدمات ليست مصفوفة - ${language}`);
    return [];
  }
  
  if (services.length === 0) {
    console.warn(`[تحذير]: لا توجد خدمات للفلترة - ${language}`);
    return [];
  }
  
  // تصفية الخدمات النشطة فقط للعرض في الواجهة الأمامية
  const activeServices = services.filter(service => service.active === true);
  console.log(`[معلومات]: عدد الخدمات النشطة: ${activeServices.length} - ${language}`);
  
  if (activeTab === 'all') return activeServices;
  
  if (activeTab.startsWith('category_')) {
    const categoryId = Number(activeTab.split('_')[1]);
    const filtered = activeServices.filter(service => service.category_id === categoryId);
    
    console.log(`[فلترة]: تصفية حسب الفئة ${categoryId}, ${filtered.length} نتائج - ${language}`);
    
    return filtered;
  }

  const filtered = activeServices.filter(service => {
    const title = language === 'ar' ? service.title_ar.toLowerCase() : service.title_en.toLowerCase();
    
    if (activeTab === 'delivery' && (title.includes('توصيل') || title.includes('delivery'))) return true;
    if (activeTab === 'events' && (title.includes('مناسبات') || title.includes('event'))) return true;
    if (activeTab === 'catering' && (title.includes('ضيافة') || title.includes('hospitality'))) return true;
    if (activeTab === 'chocolate' && (title.includes('شوكولاتة') || title.includes('chocolate'))) return true;
    if (activeTab === 'dj' && (title.includes('ديجي') || title.includes('dj'))) return true;
    if (activeTab === 'flowers' && (title.includes('ورود') || title.includes('flower'))) return true;
    if (activeTab === 'gifts' && (title.includes('هدايا') || title.includes('gift'))) return true;
    
    return false;
  });
  
  console.log(`[فلترة]: تصفية حسب الكلمة المفتاحية "${activeTab}", ${filtered.length} نتائج - ${language}`);
  
  return filtered;
};

// تحسين وظيفة الحصول على الخدمات من التخزين المحلي
export const getServicesFromStorage = (): Service[] => {
  try {
    const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!storedServices) {
      console.warn('[تحذير]: لا توجد خدمات مخزنة في localStorage');
      return [];
    }
    
    const parsedServices = JSON.parse(storedServices);
    if (!Array.isArray(parsedServices)) {
      console.error('[خطأ]: البيانات المخزنة في localStorage ليست مصفوفة صالحة');
      return [];
    }
    
    console.log(`[نجاح]: تم تحميل ${parsedServices.length} خدمة من localStorage`);
    return parsedServices;
  } catch (error) {
    console.error('[خطأ]: خطأ أثناء قراءة الخدمات من localStorage:', error);
    return [];
  }
};

// تحسين وظيفة الحصول على الفئات من التخزين المحلي
export const getCategoriesFromStorage = (): Category[] => {
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!storedCategories) {
      console.warn('[تحذير]: لا توجد فئات مخزنة في localStorage');
      return [];
    }
    
    const parsedCategories = JSON.parse(storedCategories);
    if (!Array.isArray(parsedCategories)) {
      console.error('[خطأ]: البيانات المخزنة للفئات في localStorage ليست مصفوفة صالحة');
      return [];
    }
    
    console.log(`[نجاح]: تم تحميل ${parsedCategories.length} فئة من localStorage`);
    return parsedCategories;
  } catch (error) {
    console.error('[خطأ]: خطأ أثناء قراءة الفئات من localStorage:', error);
    return [];
  }
};

// تحسين وظيفة حفظ الخدمات في التخزين المحلي
export const saveServicesToStorage = (services: Service[]): boolean => {
  try {
    if (!Array.isArray(services)) {
      console.error('[خطأ]: محاولة حفظ بيانات غير صالحة في localStorage: البيانات ليست مصفوفة');
      return false;
    }
    
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    console.log(`[نجاح]: تم حفظ ${services.length} خدمة في localStorage`);
    return true;
  } catch (error) {
    console.error('[خطأ]: خطأ أثناء حفظ الخدمات في localStorage:', error);
    return false;
  }
};

// إضافة وظيفة جديدة للتحقق من صحة الخدمة وتصحيح أي بيانات غير صالحة
export const validateAndFixService = (service: Service): Service => {
  if (!service) return null;
  
  const fixedService = { ...service };
  
  if (!fixedService.id || typeof fixedService.id !== 'number') {
    fixedService.id = Date.now();
  }
  
  if (!fixedService.title_ar) fixedService.title_ar = '';
  if (!fixedService.title_en) fixedService.title_en = '';
  if (!fixedService.description_ar) fixedService.description_ar = '';
  if (!fixedService.description_en) fixedService.description_en = '';
  
  // تصحيح الصورة إذا كانت غير صالحة
  if (!fixedService.image || typeof fixedService.image !== 'string') {
    fixedService.image = '/placeholder.svg';
  }
  
  // التأكد من أن الخدمة نشطة افتراضيًا إذا لم يتم تحديدها
  if (fixedService.active === undefined) {
    fixedService.active = true;
  }
  
  // التأكد من وجود فئة صالحة
  if (!fixedService.category_id || typeof fixedService.category_id !== 'number') {
    fixedService.category_id = 5; // فئة "أخرى" افتراضية
  }
  
  return fixedService;
};
