
import { Crop } from 'lucide-react';

interface ImageDimensionsInfoProps {
  dimensions: { width: number; height: number };
  isOptimal: boolean;
  language: string;
}

const ImageDimensionsInfo = ({ dimensions, isOptimal, language }: ImageDimensionsInfoProps) => {
  const isRtl = language === 'ar';
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Crop className={`text-gray-600 ${isOptimal ? 'text-green-500' : 'text-amber-500'}`} size={18} />
        <div className="text-sm">
          <p className="font-medium">
            {isRtl ? 'أبعاد الصورة:' : 'Image dimensions:'} 
            <span className="font-bold"> {dimensions.width} × {dimensions.height} </span>
            {isRtl ? 'بكسل' : 'pixels'}
          </p>
          {!isOptimal && (
            <p className="text-amber-600 mt-1">
              {isRtl 
                ? 'هذه الصورة أصغر من الحجم الموصى به أو لها نسبة مختلفة. قد لا تظهر بالشكل الأمثل.'
                : 'This image is smaller than recommended or has a different aspect ratio. It may not display optimally.'}
            </p>
          )}
          {isOptimal && (
            <p className="text-green-600 mt-1">
              {isRtl 
                ? 'مقاس الصورة مناسب وستظهر بشكل جيد!'
                : 'Image size is suitable and will display well!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDimensionsInfo;
