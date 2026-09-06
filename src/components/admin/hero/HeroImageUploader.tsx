
import { useRef } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import UploaderButton from './uploader/UploaderButton';
import ImagePreview from './uploader/ImagePreview';
import PreviewActions from './uploader/PreviewActions';

interface HeroImageUploaderProps {
  onImageUploaded: (imageUrl: string, dimensions: { width: number; height: number }) => void;
  previewUrl: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageDimensions: { width: number; height: number };
  setImageDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>;
  recommendedDimensions: { width: number; height: number };
  language: string;
}

const HeroImageUploader = ({
  onImageUploaded,
  previewUrl,
  setPreviewUrl,
  selectedFile,
  setSelectedFile,
  imageDimensions,
  setImageDimensions,
  recommendedDimensions,
  language
}: HeroImageUploaderProps) => {
  const isRtl = language === 'ar';
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error('فشل في تحميل الصورة'));
      };
      img.src = url;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      console.log("تم اختيار ملف:", file.name, "الحجم:", file.size, "النوع:", file.type);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setPreviewUrl(dataUrl);
        console.log("تم إنشاء معاينة للصورة:", dataUrl.substring(0, 50) + "...");
        
        try {
          const dimensions = await getImageDimensions(dataUrl);
          setImageDimensions(dimensions);
          console.log("أبعاد الصورة:", dimensions.width, "×", dimensions.height);
        } catch (error) {
          console.error("خطأ في قراءة أبعاد الصورة:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.log("لا يوجد ملف مختار للرفع");
      return;
    }
    
    toast({
      title: isRtl ? "جارٍ الرفع..." : "Uploading...",
      description: isRtl ? "يتم رفع الصورة" : "Your image is being uploaded",
    });
    
    // تأخير مصطنع لمحاكاة عملية الرفع
    setTimeout(() => {
      onImageUploaded(previewUrl, imageDimensions);
      
      toast({
        title: isRtl ? "تم الرفع بنجاح" : "Upload Successful",
        description: isRtl ? "تم رفع الصورة بنجاح" : "Your image has been uploaded successfully",
      });
      
      // إعادة ضبط حالة المعاينة
      handleCancelUpload();
    }, 1000);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setImageDimensions({ width: 0, height: 0 });
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <UploaderButton 
        handleUploadClick={handleUploadClick}
        language={language}
      />
      
      {previewUrl && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{isRtl ? 'معاينة الصورة' : 'Image Preview'}</CardTitle>
            <CardDescription>
              {isRtl 
                ? 'معاينة الصورة قبل استخدامها' 
                : 'Preview your image before using it'}
            </CardDescription>
          </CardHeader>
          
          <ImagePreview
            previewUrl={previewUrl}
            dimensions={imageDimensions}
            recommendedDimensions={recommendedDimensions}
            language={language}
          />
          
          <CardFooter>
            <PreviewActions
              onCancel={handleCancelUpload}
              onUpload={handleUpload}
              language={language}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default HeroImageUploader;
