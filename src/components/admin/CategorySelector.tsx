
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: number;
  name_ar: string;
  name_en: string;
}

// Initial categories data
const initialCategories = [
  { id: 1, name_ar: "خدمات الضيافة", name_en: "Hospitality Services" },
  { id: 2, name_ar: "خدمات التوصيل", name_en: "Delivery Services" },
  { id: 3, name_ar: "المناسبات والحفلات", name_en: "Events & Parties" },
  { id: 4, name_ar: "الورود والهدايا", name_en: "Flowers & Gifts" },
  { id: 5, name_ar: "أخرى", name_en: "Others" }
];

interface CategorySelectorProps {
  selectedCategory: number;
  onChange: (categoryId: number) => void;
  language: string;
}

const CategorySelector = ({ selectedCategory, onChange, language }: CategorySelectorProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name_ar: '', name_en: '' });
  const { toast } = useToast();
  const isRtl = language === 'ar';

  useEffect(() => {
    // Load categories from localStorage or use initial data
    const savedCategories = localStorage.getItem('serviceCategories');
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error parsing categories:', error);
        setCategories(initialCategories);
        localStorage.setItem('serviceCategories', JSON.stringify(initialCategories));
      }
    } else {
      setCategories(initialCategories);
      localStorage.setItem('serviceCategories', JSON.stringify(initialCategories));
    }
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.name_ar || !newCategory.name_en) {
      toast({
        title: isRtl ? 'خطأ' : 'Error',
        description: isRtl ? 'يرجى إدخال اسم القسم باللغتين العربية والإنجليزية' : 'Please enter category name in both Arabic and English',
        variant: 'destructive'
      });
      return;
    }

    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const updatedCategories = [...categories, { ...newCategory, id: newId }];
    
    setCategories(updatedCategories);
    localStorage.setItem('serviceCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: isRtl ? 'تم الإضافة' : 'Added Successfully',
      description: isRtl ? 'تمت إضافة القسم الجديد بنجاح' : 'New category has been added successfully'
    });
    
    setNewCategory({ name_ar: '', name_en: '' });
    setIsDialogOpen(false);
    
    // Select the newly added category
    onChange(newId);
  };

  return (
    <div className={`flex items-center ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRtl ? 'القسم' : 'Category'}
        </label>
        <Select
          value={String(selectedCategory)}
          onValueChange={(value) => onChange(Number(value))}
        >
          <SelectTrigger className={isRtl ? 'text-right' : 'text-left'}>
            <SelectValue placeholder={isRtl ? 'اختر القسم' : 'Select category'} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {isRtl ? category.name_ar : category.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            type="button"
            className="mt-6 ml-2"
          >
            <Plus size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className={isRtl ? 'text-right' : 'text-left'}>
          <DialogHeader>
            <DialogTitle>{isRtl ? 'إضافة قسم جديد' : 'Add New Category'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {isRtl ? 'اسم القسم (بالعربية)' : 'Category Name (Arabic)'}
              </label>
              <Input 
                value={newCategory.name_ar}
                onChange={(e) => setNewCategory({ ...newCategory, name_ar: e.target.value })}
                placeholder={isRtl ? 'أدخل اسم القسم بالعربية' : 'Enter category name in Arabic'}
                className={isRtl ? 'text-right' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {isRtl ? 'اسم القسم (بالإنجليزية)' : 'Category Name (English)'}
              </label>
              <Input 
                value={newCategory.name_en}
                onChange={(e) => setNewCategory({ ...newCategory, name_en: e.target.value })}
                placeholder={isRtl ? 'أدخل اسم القسم بالإنجليزية' : 'Enter category name in English'}
              />
            </div>
          </div>
          
          <DialogFooter className={isRtl ? 'justify-start' : ''}>
            <Button 
              onClick={handleAddCategory}
              className="bg-mdyafae hover:bg-mdyafae-dark"
            >
              {isRtl ? 'إضافة القسم' : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategorySelector;
