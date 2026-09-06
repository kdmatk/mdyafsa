
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { useServiceForm } from '@/hooks/useServiceForm';
import FormHeader from '@/components/admin/FormHeader';
import ServiceFormFields from '@/components/admin/ServiceFormFields';
import ImageUploader from '@/components/admin/ImageUploader';
import FormActions from '@/components/admin/FormActions';

const AdminServiceForm = () => {
  const [language, setLanguage] = useState('ar');
  
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const {
    formData,
    imagePreview,
    isEditing,
    handleInputChange,
    handleCategoryChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    navigate
  } = useServiceForm(language);

  const getHeaderTexts = () => {
    const title = isEditing 
      ? (language === 'ar' ? 'تعديل الخدمة' : 'Edit Service') 
      : (language === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service');
    
    const subtitle = language === 'ar' 
      ? 'قم بملء النموذج أدناه لإضافة أو تحديث الخدمة' 
      : 'Fill out the form below to add or update a service';
      
    return { title, subtitle };
  };

  return (
    <AdminDashboardLayout>
      <FormHeader 
        title={getHeaderTexts().title} 
        subtitle={getHeaderTexts().subtitle} 
        onBack={() => navigate('/admin-panel/services')}
        language={language}
      />

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <ServiceFormFields 
            formData={formData} 
            onChange={handleInputChange}
            onCategoryChange={handleCategoryChange}
            language={language}
          />
          
          <ImageUploader 
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            language={language}
          />
          
          <FormActions 
            onCancel={() => navigate('/admin-panel/services')}
            isEditing={isEditing}
            language={language}
          />
        </form>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminServiceForm;
