
import React from 'react';
import { Plus, Trash2, Camera, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface HeroImage {
  id: string;
  imageUrl: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  dimensions?: { width: number; height: number };
}

interface SliderImagesEditorProps {
  images: HeroImage[];
  activeImageId: string | null;
  setActiveImageId: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddImage: () => void;
  handleRemoveImage: (id: string) => void;
  handleImageChange: (id: string, field: string, value: string, lang?: 'ar' | 'en') => void;
  handleUploadClick: (id: string) => void;
  language: string;
}

const SliderImagesEditor = ({
  images,
  activeImageId,
  setActiveImageId,
  handleAddImage,
  handleRemoveImage,
  handleImageChange,
  handleUploadClick,
  language
}: SliderImagesEditorProps) => {
  const isRtl = language === 'ar';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isRtl ? 'صور السلايدر' : 'Slider Images'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {images.map((image, index) => (
              <div 
                key={image.id}
                className={`
                  cursor-pointer border rounded-md overflow-hidden 
                  ${image.id === activeImageId ? 'ring-2 ring-mdyafae' : ''}
                `}
                onClick={() => setActiveImageId(image.id)}
              >
                {image.imageUrl ? (
                  <img 
                    src={image.imageUrl} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-16 object-cover"
                  />
                ) : (
                  <div className="w-full h-16 bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="text-gray-400" size={20} />
                  </div>
                )}
              </div>
            ))}
            <div 
              className="cursor-pointer border rounded-md border-dashed flex items-center justify-center h-16"
              onClick={handleAddImage}
            >
              <Plus className="text-gray-400" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{isRtl ? 'إدارة صور السلايدر' : 'Manage Slider Images'}</CardTitle>
            <Button 
              onClick={handleAddImage}
              variant="outline"
              className="text-mdyafae"
            >
              <Plus className={`${isRtl ? 'ml-2' : 'mr-2'}`} size={16} />
              {isRtl ? 'إضافة صورة' : 'Add Image'}
            </Button>
          </div>
          <CardDescription>
            {isRtl 
              ? 'أضف صور متعددة للعرض في سلايدر الصفحة الرئيسية' 
              : 'Add multiple images to display in the homepage slider'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="mx-auto h-12 w-12 opacity-30" />
              <p className="mt-2">
                {isRtl ? 'لا توجد صور مضافة. أضف صورة للبدء.' : 'No images added. Add an image to get started.'}
              </p>
            </div>
          ) : (
            activeImageId && images.find(img => img.id === activeImageId) && (
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {isRtl 
                      ? `الصورة ${images.findIndex(img => img.id === activeImageId) + 1}` 
                      : `Image ${images.findIndex(img => img.id === activeImageId) + 1}`}
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-mdyafae hover:text-mdyafae-dark hover:bg-mdyafae/10"
                      onClick={() => handleUploadClick(activeImageId)}
                    >
                      <Camera size={16} className={isRtl ? 'ml-2' : 'mr-2'} />
                      {isRtl ? 'رفع صورة' : 'Upload Image'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveImage(activeImageId)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`image-url-${activeImageId}`}>
                      {isRtl ? 'رابط الصورة' : 'Image URL'}
                    </Label>
                    <Input
                      id={`image-url-${activeImageId}`}
                      value={images.find(img => img.id === activeImageId)?.imageUrl || ''}
                      onChange={(e) => handleImageChange(activeImageId, 'imageUrl', e.target.value)}
                      placeholder={isRtl ? 'أدخل رابط الصورة هنا' : 'Enter image URL here'}
                      dir={isRtl ? 'rtl' : 'ltr'}
                    />
                    {images.find(img => img.id === activeImageId)?.imageUrl && (
                      <div className="mt-2 border rounded overflow-hidden max-h-40">
                        <img 
                          src={images.find(img => img.id === activeImageId)?.imageUrl} 
                          alt="Preview" 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor={`title-ar-${activeImageId}`}>
                      {isRtl ? 'العنوان (عربي)' : 'Title (Arabic)'}
                    </Label>
                    <Input
                      id={`title-ar-${activeImageId}`}
                      value={images.find(img => img.id === activeImageId)?.title.ar || ''}
                      onChange={(e) => handleImageChange(activeImageId, 'title', e.target.value, 'ar')}
                      placeholder={isRtl ? 'أدخل العنوان بالعربية' : 'Enter Arabic title'}
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`subtitle-ar-${activeImageId}`}>
                      {isRtl ? 'النص الفرعي (عربي)' : 'Subtitle (Arabic)'}
                    </Label>
                    <Textarea
                      id={`subtitle-ar-${activeImageId}`}
                      value={images.find(img => img.id === activeImageId)?.subtitle.ar || ''}
                      onChange={(e) => handleImageChange(activeImageId, 'subtitle', e.target.value, 'ar')}
                      placeholder={isRtl ? 'أدخل النص الفرعي بالعربية' : 'Enter Arabic subtitle'}
                      dir="rtl"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor={`title-en-${activeImageId}`}>
                      {isRtl ? 'العنوان (إنجليزي)' : 'Title (English)'}
                    </Label>
                    <Input
                      id={`title-en-${activeImageId}`}
                      value={images.find(img => img.id === activeImageId)?.title.en || ''}
                      onChange={(e) => handleImageChange(activeImageId, 'title', e.target.value, 'en')}
                      placeholder={isRtl ? 'أدخل العنوان بالإنجليزية' : 'Enter English title'}
                      dir="ltr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`subtitle-en-${activeImageId}`}>
                      {isRtl ? 'النص الفرعي (إنجليزي)' : 'Subtitle (English)'}
                    </Label>
                    <Textarea
                      id={`subtitle-en-${activeImageId}`}
                      value={images.find(img => img.id === activeImageId)?.subtitle.en || ''}
                      onChange={(e) => handleImageChange(activeImageId, 'subtitle', e.target.value, 'en')}
                      placeholder={isRtl ? 'أدخل النص الفرعي بالإنجليزية' : 'Enter English subtitle'}
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SliderImagesEditor;
