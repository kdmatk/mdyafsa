
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Service } from '@/data/initialServices';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
}

interface ServicesTableProps {
  services: Service[];
  onDeleteService: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

const ServicesTable = ({ services, onDeleteService, onToggleStatus }: ServicesTableProps) => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem('serviceCategories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        // أصناف افتراضية إذا لم تكن متوفرة
        setCategories([
          { id: 1, name_ar: 'توصيل', name_en: 'Delivery' },
          { id: 2, name_ar: 'ضيافة', name_en: 'Hospitality' },
          { id: 3, name_ar: 'مناسبات', name_en: 'Events' },
          { id: 4, name_ar: 'هدايا', name_en: 'Gifts' },
          { id: 5, name_ar: 'أخرى', name_en: 'Others' }
        ]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([
        { id: 1, name_ar: 'توصيل', name_en: 'Delivery' },
        { id: 2, name_ar: 'ضيافة', name_en: 'Hospitality' },
        { id: 3, name_ar: 'مناسبات', name_en: 'Events' },
        { id: 4, name_ar: 'هدايا', name_en: 'Gifts' },
        { id: 5, name_ar: 'أخرى', name_en: 'Others' }
      ]);
    }
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      return language === 'ar' ? category.name_ar : category.name_en;
    }
    return language === 'ar' ? 'غير مصنف' : 'Uncategorized';
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'الصورة' : 'Image'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'العنوان' : 'Title'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'القسم' : 'Category'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  {language === 'ar' ? 'لا توجد خدمات متاحة' : 'No services available'}
                </td>
              </tr>
            ) : (
              services.map(service => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-14 w-14">
                      <img className="h-14 w-14 rounded-md object-cover" src={service.image} alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {language === 'ar' ? service.title_ar : service.title_en}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {getCategoryName(service.category_id)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {language === 'ar' ? service.description_ar : service.description_en}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="ghost" 
                      onClick={() => onToggleStatus(service.id)}
                      className={`inline-flex rounded-full px-3 py-1 text-xs ${
                        service.active 
                          ? 'text-green-800 bg-green-100 hover:bg-green-200' 
                          : 'text-red-800 bg-red-100 hover:bg-red-200'
                      }`}
                    >
                      {service.active 
                        ? <><Check className="h-3.5 w-3.5 mr-1" /> {language === 'ar' ? 'نشط' : 'Active'}</>
                        : <><X className="h-3.5 w-3.5 mr-1" /> {language === 'ar' ? 'غير نشط' : 'Inactive'}</>
                      }
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/admin-panel/services/edit/${service.id}`}>
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900" onClick={() => onDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;
