
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2 } from 'lucide-react';

interface ClientLogoUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  onRemoveImage: () => void;
  language: string;
  dimensions?: { width: number; height: number };
}

const ClientLogoUploader = ({ 
  onImageSelect, 
  previewUrl, 
  onRemoveImage, 
  language,
  dimensions = { width: 500, height: 500 }
}: ClientLogoUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // التحقق من حجم الملف (الحد الأقصى 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'حجم الصورة يجب أن يكون أقل من 2 ميجابايت' 
            : 'Image size must be less than 2MB',
          variant: 'destructive'
        });
        return;
      }
      
      setIsUploading(true);
      
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'يرجى اختيار ملف صورة صالح' 
            : 'Please select a valid image file',
          variant: 'destructive'
        });
        setIsUploading(false);
        return;
      }
      
      // تحويل الصورة إلى Data URL قبل معالجتها
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // إنشاء صورة مؤقتة للتحقق من الأبعاد
          const img = new Image();
          img.onload = () => {
            // إرسال الملف للمعالجة
            onImageSelect(file);
            setIsUploading(false);
          };
          img.onerror = () => {
            toast({
              title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
              description: language === 'ar' 
                ? 'فشل في قراءة الصورة، يرجى اختيار صورة أخرى' 
                : 'Failed to read image, please select another one',
              variant: 'destructive'
            });
            setIsUploading(false);
          };
          img.src = reader.result;
        }
      };
      reader.onerror = () => {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'فشل في قراءة الملف، يرجى المحاولة مرة أخرى' 
            : 'Failed to read file, please try again',
          variant: 'destructive'
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // التحقق من حجم الملف والنوع
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'حجم الصورة يجب أن يكون أقل من 2 ميجابايت' 
            : 'Image size must be less than 2MB',
          variant: 'destructive'
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'يرجى اختيار ملف صورة صالح' 
            : 'Please select a valid image file',
          variant: 'destructive'
        });
        return;
      }
      
      // تحويل الصورة إلى Data URL قبل معالجتها
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // إنشاء صورة مؤقتة للتحقق من الأبعاد
          const img = new Image();
          img.onload = () => {
            // إرسال الملف للمعالجة
            onImageSelect(file);
          };
          img.onerror = () => {
            toast({
              title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
              description: language === 'ar' 
                ? 'فشل في قراءة الصورة، يرجى اختيار صورة أخرى' 
                : 'Failed to read image, please select another one',
              variant: 'destructive'
            });
          };
          img.src = reader.result;
        }
      };
      reader.onerror = () => {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'فشل في قراءة الملف، يرجى المحاولة مرة أخرى' 
            : 'Failed to read file, please try again',
          variant: 'destructive'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
        isDragging 
          ? 'border-mdyafae bg-mdyafae/5' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-w-full h-auto max-h-[200px] mx-auto rounded"
          />
          <Button 
            type="button"
            variant="destructive" 
            size="sm"
            className="absolute top-2 right-2"
            onClick={onRemoveImage}
          >
            <Trash2 size={16} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
            {dimensions.width} × {dimensions.height}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 mb-3 text-center">
            {language === 'ar' 
              ? 'قم بسحب وإفلات الشعار هنا أو انقر للاختيار' 
              : 'Drag and drop logo here or click to browse'}
          </p>
          <p className="text-xs text-gray-400 mb-3 text-center">
            {language === 'ar' 
              ? `الأبعاد المطلوبة: ${dimensions.width}×${dimensions.height} بكسل` 
              : `Required dimensions: ${dimensions.width}×${dimensions.height} pixels`}
          </p>
          <input 
            id="logoUpload"
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => document.getElementById('logoUpload')?.click()}
            disabled={isUploading}
          >
            {language === 'ar' ? 'اختر ملف' : 'Browse Files'}
          </Button>
          
          <p className="text-xs text-gray-500 mt-3">
            {language === 'ar' 
              ? 'الحد الأقصى لحجم الملف: 2 ميجابايت. الصيغ المدعومة: JPG، PNG، GIF، SVG' 
              : 'Max file size: 2MB. Formats: JPG, PNG, GIF, SVG'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientLogoUploader;
