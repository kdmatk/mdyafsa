
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUpDown, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import ClientLogoUploader from '@/components/admin/ClientLogoUploader';

interface ClientLogo {
  id: number;
  name: string;
  logo: string;
}

const AdminClientLogos = () => {
  const [language, setLanguage] = useState('ar');
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    loadClientLogos();

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const loadClientLogos = () => {
    setIsLoading(true);
    
    const mockClientLogos = [
      { id: 1, name: 'فندق حياة', logo: '/placeholder.svg' },
      { id: 2, name: 'فندق ماريوت', logo: '/placeholder.svg' },
      { id: 3, name: 'فندق هيلتون', logo: '/placeholder.svg' },
      { id: 4, name: 'فندق كراون بلازا', logo: '/placeholder.svg' },
      { id: 5, name: 'فندق موفنبيك', logo: '/placeholder.svg' },
      { id: 6, name: 'فندق ميلينيوم', logo: '/placeholder.svg' },
      { id: 7, name: 'فيراري وورلد أبوظبي', logo: '/placeholder.svg' },
    ];

    try {
      const savedClients = localStorage.getItem('clientLogos');
      if (savedClients) {
        const parsedClients = JSON.parse(savedClients);
        if (Array.isArray(parsedClients) && parsedClients.length > 0) {
          setClientLogos(parsedClients);
          console.log('تم تحميل بيانات العملاء من التخزين المحلي:', parsedClients.length, 'عميل');
        } else {
          setClientLogos(mockClientLogos);
          console.log('لا توجد بيانات عملاء في التخزين المحلي، استخدام البيانات الافتراضية');
        }
      } else {
        setClientLogos(mockClientLogos);
        console.log('لا توجد بيانات عملاء في التخزين المحلي، استخدام البيانات الافتراضية');
      }
    } catch (error) {
      console.error('Error parsing client logos from localStorage:', error);
      setClientLogos(mockClientLogos);
      toast({
        title: language === 'ar' ? 'خطأ في تحميل البيانات' : 'Error Loading Data',
        description: language === 'ar' 
          ? 'حدث خطأ أثناء تحميل بيانات العملاء، تم استخدام البيانات الافتراضية' 
          : 'Error loading client data, using default data instead',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('clientLogos', JSON.stringify(clientLogos));
      
      // تحديث جميع النوافذ والتطبيقات بالتغييرات
      window.dispatchEvent(new Event('storage'));
      
      // إطلاق حدث مخصص لتحديث مكونات عرض العملاء
      const customEvent = new CustomEvent('clientLogosUpdated');
      window.dispatchEvent(customEvent);
      
      // محاولة مسح ذاكرة التخزين المؤقت للصور
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.includes('image-cache')) {
              caches.delete(cacheName);
            }
          });
        });
      }
      
      console.log('تم تحديث بيانات العملاء في التخزين المحلي:', clientLogos.length, 'عميل');
    }
  }, [clientLogos, isLoading]);
  
  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccess(false);
    
    if (!newClientName.trim()) {
      setUploadError(language === 'ar' ? 'يرجى إدخال اسم العميل' : 'Please enter client name');
      return;
    }
    
    if (!selectedFile) {
      setUploadError(language === 'ar' ? 'يرجى اختيار صورة' : 'Please select an image');
      return;
    }
    
    setIsUploading(true);

    try {
      // التأكد من وجود بيانات الصورة
      if (!previewUrl) {
        throw new Error('Image data is missing');
      }
      
      // الحصول على معرف جديد
      const newId = clientLogos.length > 0 
        ? Math.max(...clientLogos.map(c => c.id)) + 1 
        : 1;
      
      // إنشاء كائن العميل الجديد مع الصورة كـ Data URL
      const newClient = {
        id: newId,
        name: newClientName,
        logo: previewUrl // استخدام Data URL للصورة مباشرة
      };
      
      // إضافة إلى بداية المصفوفة لعرضه أولاً
      const updatedLogos = [newClient, ...clientLogos];
      setClientLogos(updatedLogos);
      
      // مسح البيانات بعد الإضافة
      setNewClientName('');
      setSelectedFile(null);
      setPreviewUrl(null);
      
      toast({
        title: language === 'ar' ? 'تمت الإضافة بنجاح' : 'Added Successfully',
        description: language === 'ar' 
          ? 'تمت إضافة شعار العميل الجديد بنجاح!' 
          : 'New client logo has been added successfully!',
      });
      
      setUploadSuccess(true);
      setTimeout(() => setIsDialogOpen(false), 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(language === 'ar' 
        ? 'حدث خطأ أثناء تحميل الصورة. يرجى المحاولة مرة أخرى.' 
        : 'Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClient = (id: number) => {
    const confirmMessage = language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا العميل؟' 
      : 'Are you sure you want to delete this client?';
      
    if (window.confirm(confirmMessage)) {
      const updatedLogos = clientLogos.filter(client => client.id !== id);
      setClientLogos(updatedLogos);
      
      toast({
        title: language === 'ar' ? 'تم الحذف بنجاح' : 'Deleted Successfully',
        description: language === 'ar' 
          ? 'تم حذف العميل بنجاح' 
          : 'Client has been deleted successfully',
      });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    
    setClientLogos(prev => {
      const sorted = [...prev].sort((a, b) => {
        if (sortOrder === 'asc') {
          return b.id - a.id; // desc next
        } else {
          return a.id - b.id; // asc next
        }
      });
      return sorted;
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'شعارات العملاء' : 'Client Logos'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'ar' 
              ? 'إدارة شعارات العملاء الظاهرة في الموقع' 
              : 'Manage client logos displayed on the website'}
          </p>
        </div>
        
        <Button 
          className="mt-4 sm:mt-0 bg-mdyafae hover:bg-mdyafae-dark text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'إضافة عميل جديد' : 'Add New Client'}
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-gray-700">
            {language === 'ar' ? 'قائمة العملاء' : 'Client List'}
          </h2>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleSortOrder}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <span className="mr-1 text-xs font-medium">
                {language === 'ar' 
                  ? (sortOrder === 'asc' ? 'تصاعدي' : 'تنازلي') 
                  : (sortOrder === 'asc' ? 'Ascending' : 'Descending')}
              </span>
              <ArrowUpDown size={14} />
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-mdyafae rounded-full animate-spin"></div>
          </div>
        ) : clientLogos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {language === 'ar' ? 'لا توجد شعارات عملاء حتى الآن' : 'No client logos yet'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {clientLogos.map(client => (
              <div 
                key={client.id} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="relative w-full aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={client.logo || '/placeholder.svg'}
                      alt={client.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                      500 × 500
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 break-words">
                        {client.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {client.id}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'إضافة عميل جديد' : 'Add New Client'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar' 
                ? 'أضف شعار عميل جديد ليتم عرضه في القسم الخاص بالعملاء في الموقع' 
                : 'Add a new client logo to be displayed in the clients section of the website'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="clientName">
                {language === 'ar' ? 'اسم العميل' : 'Client Name'}
              </Label>
              <Input 
                id="clientName" 
                placeholder={language === 'ar' ? 'أدخل اسم العميل' : 'Enter client name'} 
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className={language === 'ar' ? 'text-right' : 'text-left'}
              />
            </div>
            
            <div>
              <Label htmlFor="logoUpload" className="block mb-2">
                {language === 'ar' ? 'شعار العميل (500×500 بكسل)' : 'Client Logo (500×500 pixels)'}
              </Label>
              <ClientLogoUploader
                onImageSelect={handleImageSelect}
                previewUrl={previewUrl}
                onRemoveImage={handleRemoveImage}
                language={language}
                dimensions={{ width: 500, height: 500 }}
              />
            </div>
            
            {uploadError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {language === 'ar' ? 'خطأ' : 'Error'}
                </AlertTitle>
                <AlertDescription>
                  {uploadError}
                </AlertDescription>
              </Alert>
            )}
            
            {uploadSuccess && (
              <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                <Check className="h-4 w-4" />
                <AlertTitle>
                  {language === 'ar' ? 'تم بنجاح' : 'Success'}
                </AlertTitle>
                <AlertDescription>
                  {language === 'ar' 
                    ? 'تم رفع شعار العميل بنجاح' 
                    : 'Client logo uploaded successfully'}
                </AlertDescription>
              </Alert>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isUploading}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button 
                type="submit"
                className="bg-mdyafae hover:bg-mdyafae-dark"
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {language === 'ar' ? 'جاري الرفع...' : 'Uploading...'}
                  </>
                ) : (
                  language === 'ar' ? 'رفع الشعار' : 'Upload Logo'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminClientLogos;
