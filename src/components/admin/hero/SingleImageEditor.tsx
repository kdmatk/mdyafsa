
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeroImageUploader from './HeroImageUploader';

interface SingleImageEditorProps {
  currentImage: {
    id: string;
    imageUrl: string;
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    dimensions?: { width: number; height: number };
  };
  handleSingleImageChange: (field: string, value: string, lang?: 'ar' | 'en') => void;
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

const SingleImageEditor = ({
  currentImage,
  handleSingleImageChange,
  onImageUploaded,
  previewUrl,
  setPreviewUrl,
  selectedFile,
  setSelectedFile,
  imageDimensions,
  setImageDimensions,
  recommendedDimensions,
  language
}: SingleImageEditorProps) => {
  const isRtl = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRtl ? 'الصورة الرئيسية' : 'Main Image'}</CardTitle>
        <CardDescription>
          {isRtl 
            ? 'تخصيص الصورة الرئيسية التي ستظهر في الواجهة' 
            : 'Customize the main image that will be displayed to visitors'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <HeroImageUploader
              onImageUploaded={onImageUploaded}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              imageDimensions={imageDimensions}
              setImageDimensions={setImageDimensions}
              recommendedDimensions={recommendedDimensions}
              language={language}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image-url">
              {isRtl ? 'رابط الصورة' : 'Image URL'}
            </Label>
            <Input
              id="image-url"
              value={currentImage.imageUrl}
              onChange={(e) => handleSingleImageChange('imageUrl', e.target.value)}
              placeholder={isRtl ? 'أدخل رابط الصورة هنا' : 'Enter image URL here'}
              dir={isRtl ? 'rtl' : 'ltr'}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="title-ar">
              {isRtl ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </Label>
            <Input
              id="title-ar"
              value={currentImage.title.ar}
              onChange={(e) => handleSingleImageChange('title', e.target.value, 'ar')}
              placeholder={isRtl ? 'أدخل العنوان بالعربية' : 'Enter Arabic title'}
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle-ar">
              {isRtl ? 'النص الفرعي (عربي)' : 'Subtitle (Arabic)'}
            </Label>
            <Textarea
              id="subtitle-ar"
              value={currentImage.subtitle.ar}
              onChange={(e) => handleSingleImageChange('subtitle', e.target.value, 'ar')}
              placeholder={isRtl ? 'أدخل النص الفرعي بالعربية' : 'Enter Arabic subtitle'}
              dir="rtl"
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="title-en">
              {isRtl ? 'العنوان (إنجليزي)' : 'Title (English)'}
            </Label>
            <Input
              id="title-en"
              value={currentImage.title.en}
              onChange={(e) => handleSingleImageChange('title', e.target.value, 'en')}
              placeholder={isRtl ? 'أدخل العنوان بالإنجليزية' : 'Enter English title'}
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle-en">
              {isRtl ? 'النص الفرعي (إنجليزي)' : 'Subtitle (English)'}
            </Label>
            <Textarea
              id="subtitle-en"
              value={currentImage.subtitle.en}
              onChange={(e) => handleSingleImageChange('subtitle', e.target.value, 'en')}
              placeholder={isRtl ? 'أدخل النص الفرعي بالإنجليزية' : 'Enter English subtitle'}
              dir="ltr"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleImageEditor;
