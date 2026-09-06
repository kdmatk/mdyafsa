
import { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Feature {
  id: number;
  title: string;
  description: string;
}

const AdminFeatures = () => {
  const [language, setLanguage] = useState('ar');
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    // Load features based on language
    const loadFeatures = () => {
      const defaultFeatures = language === 'ar' 
        ? [
            { id: 1, title: 'ضيافة عربية أصيلة', description: 'تقديم خدمات الضيافة العربية الأصيلة بأعلى مستويات الجودة' },
            { id: 2, title: 'تصميم مناسبات', description: 'تصميم المناسبات والاحتفالات بطريقة مبتكرة تناسب متطلبات العميل' },
            { id: 3, title: 'خدمة على مدار الساعة', description: 'تقديم خدمات الضيافة على مدار الساعة وفي أي وقت' },
            { id: 4, title: 'طاقم متميز', description: 'طاقم عمل محترف ومدرب على أعلى مستوى' },
          ]
        : [
            { id: 1, title: 'Authentic Arabic Hospitality', description: 'Providing authentic Arabic hospitality services with the highest quality standards' },
            { id: 2, title: 'Event Design', description: 'Designing events and celebrations in an innovative way that suits customer requirements' },
            { id: 3, title: '24/7 Service', description: 'Providing hospitality services around the clock and at any time' },
            { id: 4, title: 'Distinguished Staff', description: 'Professional staff trained to the highest level' },
          ];
      
      // Try to load from localStorage first
      const savedFeatures = localStorage.getItem(`adminFeatures_${language}`);
      if (savedFeatures) {
        try {
          const parsedFeatures = JSON.parse(savedFeatures);
          setFeatures(parsedFeatures);
          setIsLocalStorageLoaded(true);
        } catch (error) {
          console.error('فشل في تحميل الميزات من التخزين المحلي:', error);
          setFeatures(defaultFeatures);
        }
      } else if (isLocalStorageLoaded) {
        // If we've loaded from localStorage before but don't have data for this language, 
        // use the default features but don't overwrite existing data from other language
        setFeatures(defaultFeatures);
      } else {
        // First load and no localStorage data
        setFeatures(defaultFeatures);
        // Save default features to localStorage
        localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(defaultFeatures));
      }
    };
    
    loadFeatures();
  }, [language, isLocalStorageLoaded]);

  const handleAdd = () => {
    setEditingFeature(null);
    setNewTitle('');
    setNewDescription('');
    setDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const feature = features.find(f => f.id === id);
    if (feature) {
      setEditingFeature(feature);
      setNewTitle(feature.title);
      setNewDescription(feature.description);
      setDialogOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const updatedFeatures = features.filter(feature => feature.id !== id);
    setFeatures(updatedFeatures);
    localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(updatedFeatures));
    
    toast({
      title: language === 'ar' ? 'تم الحذف بنجاح' : 'Deleted Successfully',
      description: language === 'ar' ? 'تم حذف الميزة بنجاح' : 'The feature has been deleted successfully',
    });
  };

  const handleSave = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      toast({
        title: language === 'ar' ? 'البيانات غير مكتملة' : 'Incomplete Data',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    let updatedFeatures: Feature[];
    
    if (editingFeature) {
      // Edit existing feature
      updatedFeatures = features.map(feature => 
        feature.id === editingFeature.id 
          ? { ...feature, title: newTitle, description: newDescription } 
          : feature
      );
      
      toast({
        title: language === 'ar' ? 'تم التعديل بنجاح' : 'Updated Successfully',
        description: language === 'ar' ? 'تم تعديل الميزة بنجاح' : 'The feature has been updated successfully',
      });
    } else {
      // Add new feature
      const newId = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;
      updatedFeatures = [...features, { id: newId, title: newTitle, description: newDescription }];
      
      toast({
        title: language === 'ar' ? 'تمت الإضافة بنجاح' : 'Added Successfully',
        description: language === 'ar' ? 'تمت إضافة الميزة بنجاح' : 'The feature has been added successfully',
      });
    }
    
    setFeatures(updatedFeatures);
    localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(updatedFeatures));
    setDialogOpen(false);
  };

  return (
    <AdminDashboardLayout>
      <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">
          {language === 'ar' ? 'إدارة الميزات' : 'Features Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'إدارة ميزات وخصائص خدمات مضياف mdyafae' 
            : 'Manage features and characteristics of Mdyafae Emirates services'}
        </p>
      </div>

      <div className="flex justify-between mb-6">
        <Button 
          onClick={handleAdd} 
          className="bg-mdyafae hover:bg-mdyafae-dark"
        >
          <PlusCircle size={18} className="mr-1" />
          <span>{language === 'ar' ? 'إضافة ميزة جديدة' : 'Add New Feature'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className={`text-lg font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {feature.description}
              </p>
              <div className={`flex gap-2 ${language === 'ar' ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(feature.id)}
                  className="text-amber-600 border-amber-600 hover:bg-amber-50"
                >
                  <Edit size={16} className="mr-1" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(feature.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash size={16} className="mr-1" />
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for adding/editing features */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={language === 'ar' ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle>
              {editingFeature 
                ? (language === 'ar' ? 'تعديل الميزة' : 'Edit Feature') 
                : (language === 'ar' ? 'إضافة ميزة جديدة' : 'Add New Feature')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'ar' ? 'عنوان الميزة' : 'Feature Title'}
              </label>
              <Input 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل عنوان الميزة' : 'Enter feature title'}
                className={language === 'ar' ? 'text-right' : 'text-left'}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'ar' ? 'وصف الميزة' : 'Feature Description'}
              </label>
              <Textarea 
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل وصف الميزة' : 'Enter feature description'}
                className={`${language === 'ar' ? 'text-right' : 'text-left'}`}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className={language === 'ar' ? 'justify-start flex-row-reverse' : 'justify-end'}>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button 
              className="bg-mdyafae hover:bg-mdyafae-dark" 
              onClick={handleSave}
            >
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminFeatures;
