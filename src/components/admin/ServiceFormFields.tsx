
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CategorySelector from './CategorySelector';

interface FormFieldsProps {
  formData: {
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    category_id: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCategoryChange: (categoryId: number) => void;
  language: string;
}

const ServiceFormFields = ({ formData, onChange, onCategoryChange, language }: FormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ar' ? 'عنوان الخدمة (العربية)' : 'Service Title (Arabic)'}
        </label>
        <Input
          name="title_ar"
          value={formData.title_ar}
          onChange={onChange}
          placeholder={language === 'ar' ? 'أدخل عنوان الخدمة بالعربية' : 'Enter service title in Arabic'}
          className={language === 'ar' ? 'text-right' : 'text-left'}
        />
      </div>
      
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ar' ? 'عنوان الخدمة (الإنجليزية)' : 'Service Title (English)'}
        </label>
        <Input
          name="title_en"
          value={formData.title_en}
          onChange={onChange}
          placeholder={language === 'ar' ? 'أدخل عنوان الخدمة بالإنجليزية' : 'Enter service title in English'}
        />
      </div>
      
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ar' ? 'وصف الخدمة (العربية)' : 'Service Description (Arabic)'}
        </label>
        <Textarea
          name="description_ar"
          value={formData.description_ar}
          onChange={onChange}
          placeholder={language === 'ar' ? 'أدخل وصف الخدمة بالعربية' : 'Enter service description in Arabic'}
          className={`h-32 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        />
      </div>
      
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {language === 'ar' ? 'وصف الخدمة (الإنجليزية)' : 'Service Description (English)'}
        </label>
        <Textarea
          name="description_en"
          value={formData.description_en}
          onChange={onChange}
          placeholder={language === 'ar' ? 'أدخل وصف الخدمة بالإنجليزية' : 'Enter service description in English'}
          className="h-32"
        />
      </div>
      
      <CategorySelector 
        selectedCategory={formData.category_id} 
        onChange={onCategoryChange}
        language={language}
      />
    </div>
  );
};

export default ServiceFormFields;
