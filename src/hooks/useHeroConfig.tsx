
import { useConfigLoader } from './useConfigLoader';
import { useImageError } from './useImageError';
import { ensureAbsoluteUrl } from '@/utils/imageUtils';

export const useHeroConfig = () => {
  const { heroConfig } = useConfigLoader();
  const { imageLoadError, handleImageError } = useImageError();

  return { 
    heroConfig, 
    imageLoadError, 
    handleImageError,
    ensureAbsoluteUrl // تصدير وظيفة معالجة الروابط للاستخدام في مكونات أخرى
  };
};

// تصدير وظيفة معالجة الروابط بشكل منفصل للاستخدام المباشر
export { ensureAbsoluteUrl } from '@/utils/imageUtils';
