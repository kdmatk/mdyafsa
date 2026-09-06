
import { Button } from '@/components/ui/button';
import { 
  Truck, Calendar, Utensils, Flower, Shield, 
  Gift, PlusCircle, ChefHat, CakeSlice, Music, Loader2
} from 'lucide-react';

interface ServiceCategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabLabels: Record<string, string>;
  categories: Category[];
  language: string;
  isLoading?: boolean;
}

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
}

export const ServiceCategoryTabs = ({ 
  activeTab, 
  setActiveTab, 
  tabLabels, 
  categories,
  language,
  isLoading = false
}: ServiceCategoryTabsProps) => {
  
  console.log('[ServiceCategoryTabs]', { 
    activeTab, 
    tabLabelsCount: Object.keys(tabLabels).length,
    categoriesCount: categories?.length || 0, 
    language,
    isLoading
  });
  
  const getCategoryIcon = (categoryKey: string) => {
    const defaultIcons: Record<string, JSX.Element> = {
      'delivery': <Truck size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'events': <Calendar size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'catering': <ChefHat size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'chocolate': <CakeSlice size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'dj': <Music size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'flowers': <Flower size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
      'gifts': <Gift size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />,
    };
    
    if (categoryKey === 'all') return null;
    
    if (categoryKey.startsWith('category_')) {
      const categoryId = Number(categoryKey.split('_')[1]);
      const category = categories?.find(c => c.id === categoryId);
      
      if (!category) {
        console.warn(`[${language === 'ar' ? 'تحذير' : 'WARNING'}]: ${language === 'ar' ? 'فئة غير موجودة' : 'Category not found'} ID: ${categoryId}`);
        return <PlusCircle size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      }
      
      const categoryName = (language === 'ar' ? category.name_ar : category.name_en) || '';
      
      if (categoryName.toLowerCase().includes('ورود') || categoryName.toLowerCase().includes('flower')) return <Flower size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      if (categoryName.toLowerCase().includes('توصيل') || categoryName.toLowerCase().includes('delivery')) return <Truck size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      if (categoryName.toLowerCase().includes('مناسبات') || categoryName.toLowerCase().includes('event')) return <Calendar size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      if (categoryName.toLowerCase().includes('ضيافة') || categoryName.toLowerCase().includes('hospitality')) return <Utensils size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      if (categoryName.toLowerCase().includes('هدايا') || categoryName.toLowerCase().includes('gift')) return <Gift size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      if (categoryName.toLowerCase().includes('أمن') || categoryName.toLowerCase().includes('security')) return <Shield size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
      
      return <PlusCircle size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
    }
    
    return defaultIcons[categoryKey] || <PlusCircle size={16} className={language === 'ar' ? "ml-2" : "mr-2"} />;
  };

  // إذا كانت البيانات قيد التحميل
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 mb-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-mdyafae" />
          <span className="text-mdyafae-dark">
            {language === 'ar' ? 'جاري تحميل الفئات...' : 'Loading categories...'}
          </span>
        </div>
      </div>
    );
  }

  // التحقق من وجود البيانات قبل العرض
  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const hasTabLabels = tabLabels && Object.keys(tabLabels).length > 0;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {hasTabLabels && (
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          className={`rounded-full px-6 ${activeTab === 'all' ? 'bg-mdyafae text-white' : 'text-mdyafae-dark hover:text-mdyafae'}`}
          onClick={() => setActiveTab('all')}
        >
          {tabLabels.all || (language === 'ar' ? 'الكل' : 'All Services')}
        </Button>
      )}
      
      {hasCategories ? (
        categories.map(category => (
          <Button
            key={`category_${category.id}`}
            variant={activeTab === `category_${category.id}` ? 'default' : 'outline'}
            className={`rounded-full px-6 ${activeTab === `category_${category.id}` ? 'bg-mdyafae text-white' : 'text-mdyafae-dark hover:text-mdyafae'}`}
            onClick={() => setActiveTab(`category_${category.id}`)}
          >
            {getCategoryIcon(`category_${category.id}`)}
            {language === 'ar' ? category.name_ar : category.name_en}
          </Button>
        ))
      ) : (
        <div className="text-center text-gray-500">
          {language === 'ar' ? 'لا توجد فئات متاحة' : 'No categories available'}
        </div>
      )}
      
      {(!hasCategories && !hasTabLabels) && (
        <div className="w-full text-center my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800">
            {language === 'ar' 
              ? 'لم يتم العثور على بيانات الخدمات. يرجى تحديث الصفحة أو الاتصال بالمسؤول.' 
              : 'Service data not found. Please refresh or contact administrator.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryTabs;
