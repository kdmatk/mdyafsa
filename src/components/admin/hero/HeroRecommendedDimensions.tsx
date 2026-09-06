
import { Maximize } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroRecommendedDimensionsProps {
  recommendedDimensions: { width: number; height: number };
  language: string;
}

const HeroRecommendedDimensions = ({ recommendedDimensions, language }: HeroRecommendedDimensionsProps) => {
  const isRtl = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRtl ? 'أبعاد الصورة الموصى بها' : 'Recommended Image Dimensions'}</CardTitle>
        <CardDescription>
          {isRtl 
            ? 'لأفضل النتائج، استخدم صورًا بهذه الأبعاد' 
            : 'For best results, use images with these dimensions'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Maximize className="text-gray-500" size={18} />
          <p className="text-mdyafae font-medium">
            {isRtl 
              ? `الأبعاد المثالية: ${recommendedDimensions.width} × ${recommendedDimensions.height} بكسل` 
              : `Ideal dimensions: ${recommendedDimensions.width} × ${recommendedDimensions.height} pixels`}
          </p>
        </div>
        <div className="text-gray-600 text-sm">
          {isRtl 
            ? 'يمكن استخدام صور بأبعاد أكبر أو بنسبة عرض إلى ارتفاع مماثلة (16:9). الصور الأصغر قد تظهر بجودة أقل.' 
            : 'You can use larger images or images with similar aspect ratio (16:9). Smaller images may appear with lower quality.'}
        </div>
        <div className="text-gray-600 text-sm">
          {isRtl 
            ? 'سيتم ضبط الصور تلقائيًا لملء المساحة المخصصة مع الحفاظ على نسبة العرض إلى الارتفاع.' 
            : 'Images will be automatically adjusted to fill the designated space while maintaining the aspect ratio.'}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroRecommendedDimensions;
