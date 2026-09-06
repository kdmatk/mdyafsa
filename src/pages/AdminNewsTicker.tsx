
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AdminNewsTicker = () => {
  const [language, setLanguage] = useState('ar');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize with existing news from localStorage or default values
  const [newsItems, setNewsItems] = useState(() => {
    const savedNews = localStorage.getItem('newsTickerItems');
    if (savedNews) {
      return JSON.parse(savedNews);
    }
    // Default news items (copied from the NewsTicker component)
    return [
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
    ];
  });

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Add new empty news item
  const handleAddNewsItem = () => {
    setNewsItems([...newsItems, { ar: "", en: "" }]);
  };

  // Remove a news item
  const handleRemoveNewsItem = (index: number) => {
    const updatedItems = [...newsItems];
    updatedItems.splice(index, 1);
    setNewsItems(updatedItems);
  };

  // Update news item text
  const handleUpdateNewsItem = (index: number, lang: 'ar' | 'en', value: string) => {
    const updatedItems = [...newsItems];
    updatedItems[index][lang] = value;
    setNewsItems(updatedItems);
  };

  // Save all news items to localStorage
  const handleSaveAll = () => {
    // Filter out empty news items
    const filteredItems = newsItems.filter(item => item.ar.trim() !== "" || item.en.trim() !== "");
    
    // Save to localStorage
    localStorage.setItem('newsTickerItems', JSON.stringify(filteredItems));
    
    // Show success notification
    toast({
      title: language === 'ar' ? "تم الحفظ بنجاح" : "Saved Successfully",
      description: language === 'ar' 
        ? "تم حفظ الشريط الإخباري بنجاح وسيظهر على الموقع" 
        : "News ticker items saved successfully and will appear on the website",
    });
  };

  return (
    <AdminDashboardLayout>
      <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">
          {language === 'ar' ? 'إدارة الشريط الإخباري' : 'News Ticker Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'أضف وعدل أخبار الشريط المتحرك التي تظهر في الصفحة الرئيسية' 
            : 'Add and edit news ticker items that appear on the homepage'}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className={language === 'ar' ? 'text-right' : 'text-left'}>
            {language === 'ar' ? 'الأخبار المعروضة' : 'News Items'}
          </CardTitle>
          <CardDescription className={language === 'ar' ? 'text-right' : 'text-left'}>
            {language === 'ar' 
              ? 'أضف وعدل الأخبار التي ستظهر في الشريط المتحرك بالموقع' 
              : 'Add and edit news that will appear in the scrolling ticker on the website'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-md ${language === 'ar' ? 'text-right' : 'text-left'} relative`}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveNewsItem(index)}
                >
                  <Trash2 size={18} />
                </Button>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {language === 'ar' ? 'النص العربي' : 'Arabic Text'}
                  </label>
                  <Textarea 
                    value={item.ar}
                    onChange={(e) => handleUpdateNewsItem(index, 'ar', e.target.value)}
                    dir="rtl"
                    placeholder="أدخل النص العربي هنا"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {language === 'ar' ? 'النص الإنجليزي' : 'English Text'}
                  </label>
                  <Textarea 
                    value={item.en}
                    onChange={(e) => handleUpdateNewsItem(index, 'en', e.target.value)}
                    dir="ltr"
                    placeholder="Enter English text here"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={handleAddNewsItem}
                className={`border-dashed ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <PlusCircle size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
                {language === 'ar' ? 'إضافة خبر جديد' : 'Add New Item'}
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSaveAll} className={language === 'ar' ? 'flex-row-reverse' : ''}>
              <Save size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
              {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default AdminNewsTicker;
