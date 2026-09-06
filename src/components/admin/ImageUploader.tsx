
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2 } from 'lucide-react';

interface ImageUploaderProps {
  imagePreview: string;
  onImageChange: (imageDataUrl: string) => void;
  onRemoveImage: () => void;
  language: string;
}

const ImageUploader = ({ imagePreview, onImageChange, onRemoveImage, language }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // التحقق من حجم الملف (الحد الأقصى 1MB)
      if (file.size > 1024 * 1024) {
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'حجم الصورة يجب أن يكون أقل من 1 ميجابايت' 
            : 'Image size must be less than 1MB',
          variant: 'destructive'
        });
        setIsUploading(false);
        return;
      }
      
      // Convert to Data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        onImageChange(imageDataUrl);
        setIsUploading(false);
        
        toast({
          title: language === 'ar' ? 'تم تحميل الصورة' : 'Image Uploaded',
          description: language === 'ar' ? 'تم تحميل الصورة بنجاح' : 'Image has been uploaded successfully',
        });
      };
      
      reader.onerror = () => {
        setIsUploading(false);
        toast({
          title: language === 'ar' ? 'خطأ في تحميل الصورة' : 'Image Upload Error',
          description: language === 'ar' 
            ? 'حدث خطأ أثناء تحميل الصورة، يرجى المحاولة مرة أخرى' 
            : 'An error occurred while uploading the image, please try again',
          variant: 'destructive'
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {language === 'ar' ? 'صورة الخدمة' : 'Service Image'}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Service preview" 
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <Button 
              type="button"
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2" 
              onClick={onRemoveImage}
              disabled={isUploading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-4">
              {language === 'ar' 
                ? 'اسحب وأفلت الصورة هنا، أو انقر للاختيار' 
                : 'Drag and drop an image here, or click to select'}
            </p>
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button 
                type="button" 
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={isUploading}
              >
                {isUploading 
                  ? (language === 'ar' ? 'جاري التحميل...' : 'Uploading...') 
                  : (language === 'ar' ? 'اختر صورة' : 'Select Image')}
              </Button>
              <input 
                id="image-upload"
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
            
            <p className="text-xs text-gray-500 mt-2">
              {language === 'ar' 
                ? 'الحد الأقصى لحجم الملف: 1 ميجابايت' 
                : 'Maximum file size: 1MB'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
