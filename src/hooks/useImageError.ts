
import { useState } from 'react';

/**
 * هوك للتعامل مع أخطاء تحميل الصور
 */
export const useImageError = () => {
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});

  // معالجة خطأ تحميل الصورة - الآن تقبل كائن الحدث React بدلاً من معرف الصورة مباشرة
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    const imgSrc = imgElement.src || 'unknown-image';
    const imgId = imgElement.id || imgSrc.split('/').pop() || 'unknown-id';
    
    console.log(`خطأ في تحميل الصورة: ${imgId}`);
    setImageLoadError(prev => ({ ...prev, [imgId]: true }));
    
    // استبدال الصورة بصورة بديلة
    imgElement.src = '/placeholder.svg';
  };

  return { imageLoadError, handleImageError };
};
