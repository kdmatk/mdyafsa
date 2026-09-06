
import { Maximize } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroImagePreviewProps {
  image: {
    imageUrl: string;
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    dimensions?: { width: number; height: number };
  };
  language: string;
}

const HeroImagePreview = ({ image, language }: HeroImagePreviewProps) => {
  const isRtl = language === 'ar';

  if (!image.imageUrl) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRtl ? 'الصورة الحالية' : 'Current Image'}</CardTitle>
        <CardDescription>
          {isRtl 
            ? 'معاينة الصورة كما ستظهر في الواجهة' 
            : 'Preview how the image will appear on the front page'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative border rounded-lg overflow-hidden">
            <img 
              src={image.imageUrl} 
              alt="Current hero" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                {isRtl ? image.title.ar : image.title.en}
              </h2>
              <p className="text-white/80 mt-2">
                {isRtl ? image.subtitle.ar : image.subtitle.en}
              </p>
            </div>
          </div>
          
          {image.dimensions && image.dimensions.width > 0 && (
            <div className="text-sm text-gray-500 flex items-center">
              <Maximize className="mr-2" size={14} />
              {isRtl 
                ? `أبعاد الصورة: ${image.dimensions.width} × ${image.dimensions.height} بكسل`
                : `Image dimensions: ${image.dimensions.width} × ${image.dimensions.height} pixels`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroImagePreview;
