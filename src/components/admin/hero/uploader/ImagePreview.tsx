
import { CardContent } from '@/components/ui/card';
import ImageDimensionsInfo from './ImageDimensionsInfo';

interface ImagePreviewProps {
  previewUrl: string;
  dimensions: { width: number; height: number };
  recommendedDimensions: { width: number; height: number };
  language: string;
}

const ImagePreview = ({ 
  previewUrl, 
  dimensions, 
  recommendedDimensions, 
  language 
}: ImagePreviewProps) => {
  // التحقق من مثالية حجم الصورة
  const isImageSizeOptimal = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return false;
    
    const isOptimalOrBetter = 
      dimensions.width >= recommendedDimensions.width && 
      dimensions.height >= recommendedDimensions.height;
    
    const recommendedRatio = recommendedDimensions.width / recommendedDimensions.height;
    const currentRatio = dimensions.width / dimensions.height;
    const ratioDeviation = Math.abs(currentRatio - recommendedRatio) / recommendedRatio;
    
    const hasGoodRatio = ratioDeviation <= 0.1;
    
    return isOptimalOrBetter || hasGoodRatio;
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="border rounded overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-60 object-cover"
          />
        </div>
        
        <ImageDimensionsInfo 
          dimensions={dimensions}
          isOptimal={isImageSizeOptimal()}
          language={language}
        />
      </div>
    </CardContent>
  );
};

export default ImagePreview;
