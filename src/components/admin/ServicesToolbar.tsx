
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ServicesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ServicesToolbar = ({ searchTerm, onSearchChange }: ServicesToolbarProps) => {
  const { language } = useLanguage();

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between mb-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
      <div className={`mb-4 md:mb-0 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">
          {language === 'ar' ? 'إدارة الخدمات' : 'Manage Services'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'إضافة وتعديل وحذف خدمات موقع مضياف الإمارات' 
            : 'Add, edit and delete Mdyafae Emirates services'}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
        {language === 'ar' && <div className="sm:pl-2"></div>}
        <div className="relative">
          <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder={language === 'ar' ? 'بحث عن خدمة...' : 'Search services...'}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Link to="/admin-panel/services/add">
          <Button className="bg-mdyafae hover:bg-mdyafae-dark w-full sm:w-auto">
            <Plus className="mr-1 h-4 w-4" />
            {language === 'ar' ? 'إضافة خدمة' : 'Add Service'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesToolbar;

