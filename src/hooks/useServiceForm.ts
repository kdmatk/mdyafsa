
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ServiceFormData {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  active: boolean;
  category_id: number;
}

export const useServiceForm = (language: string) => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<ServiceFormData>({
    id: Date.now(),
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    image: '',
    active: true,
    category_id: 5 // Default to "Others" category
  });
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If editing, fetch the service data
    if (isEditing) {
      const savedServices = localStorage.getItem('adminServices');
      if (savedServices) {
        const services = JSON.parse(savedServices);
        const serviceToEdit = services.find((s: any) => s.id === Number(id));
        
        if (serviceToEdit) {
          setFormData(serviceToEdit);
          setImagePreview(serviceToEdit.image);
        } else {
          navigate('/admin-panel/services');
          toast({
            title: language === 'ar' ? 'خطأ' : 'Error',
            description: language === 'ar' ? 'الخدمة غير موجودة' : 'Service not found',
            variant: 'destructive',
          });
        }
      }
    }
  }, [id, isEditing, language, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryId: number) => {
    setFormData(prev => ({ ...prev, category_id: categoryId }));
  };

  const handleImageChange = (imageDataUrl: string) => {
    setImagePreview(imageDataUrl);
    setFormData(prev => ({ ...prev, image: imageDataUrl }));
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  const validateForm = () => {
    if (!formData.title_ar || !formData.title_en || !formData.description_ar || !formData.description_en) {
      toast({
        title: language === 'ar' ? 'خطأ في النموذج' : 'Form Error',
        description: language === 'ar' ? 'جميع الحقول مطلوبة' : 'All fields are required',
        variant: 'destructive',
      });
      return false;
    }
    
    if (!formData.image) {
      toast({
        title: language === 'ar' ? 'خطأ في النموذج' : 'Form Error',
        description: language === 'ar' ? 'يرجى تحميل صورة للخدمة' : 'Please upload an image for the service',
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Get current services
    const savedServices = localStorage.getItem('adminServices');
    let services = savedServices ? JSON.parse(savedServices) : [];
    
    if (isEditing) {
      // Update existing service
      services = services.map((service: any) => 
        service.id === Number(id) ? { ...formData, id: Number(id) } : service
      );
      
      toast({
        title: language === 'ar' ? 'تم التحديث' : 'Updated',
        description: language === 'ar' ? 'تم تحديث الخدمة بنجاح' : 'Service has been updated successfully',
      });
    } else {
      // Add new service
      services.push({ ...formData, id: Date.now() });
      
      toast({
        title: language === 'ar' ? 'تمت الإضافة' : 'Added',
        description: language === 'ar' ? 'تمت إضافة الخدمة بنجاح' : 'Service has been added successfully',
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('adminServices', JSON.stringify(services));
    
    // Navigate back to services list
    navigate('/admin-panel/services');
  };

  return {
    formData,
    imagePreview,
    isEditing,
    handleInputChange,
    handleCategoryChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    navigate
  };
};
