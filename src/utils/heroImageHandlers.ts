
import { HeroImage } from "@/types/heroSlider";
import { createEmptyImage } from "./heroSliderUtils";

/**
 * تحديث صورة في وضع السلايدر
 */
export const updateSliderImage = (
  images: HeroImage[],
  id: string,
  field: string,
  value: string,
  lang?: 'ar' | 'en'
): HeroImage[] => {
  return images.map(img => {
    if (img.id === id) {
      if (field === 'imageUrl') {
        return { ...img, imageUrl: value };
      } else if (field === 'title' && lang) {
        return { ...img, title: { ...img.title, [lang]: value }};
      } else if (field === 'subtitle' && lang) {
        return { ...img, subtitle: { ...img.subtitle, [lang]: value }};
      }
    }
    return img;
  });
};

/**
 * إضافة صورة جديدة إلى السلايدر
 */
export const addImageToSlider = (images: HeroImage[]): { 
  updatedImages: HeroImage[],
  newImageId: string
} => {
  const newImage = createEmptyImage();
  const updatedImages = [...images, newImage];
  return {
    updatedImages,
    newImageId: newImage.id
  };
};

/**
 * حذف صورة من السلايدر
 */
export const removeImageFromSlider = (
  images: HeroImage[],
  id: string,
  activeId: string | null
): {
  updatedImages: HeroImage[],
  newActiveId: string | null
} => {
  const updatedImages = images.filter(img => img.id !== id);
  let newActiveId = activeId;
  
  if (id === activeId) {
    newActiveId = updatedImages.length > 0 ? updatedImages[0].id : null;
  }
  
  return { updatedImages, newActiveId };
};

/**
 * تحديث صورة في الوضع المفرد
 */
export const updateSingleImage = (
  currentImage: HeroImage,
  field: string,
  value: string,
  lang?: 'ar' | 'en'
): HeroImage => {
  if (field === 'imageUrl') {
    return { ...currentImage, imageUrl: value };
  } else if (field === 'title' && lang) {
    return { 
      ...currentImage, 
      title: { ...currentImage.title, [lang]: value }
    };
  } else if (field === 'subtitle' && lang) {
    return { 
      ...currentImage, 
      subtitle: { ...currentImage.subtitle, [lang]: value }
    };
  }
  
  return currentImage;
};

/**
 * تحديث صورة بعد الرفع
 */
export const processUploadedImage = (
  useSlider: boolean,
  images: HeroImage[],
  currentImage: HeroImage,
  uploadForId: string | null,
  imageUrl: string,
  dimensions: { width: number; height: number }
): {
  updatedImages: HeroImage[],
  updatedCurrentImage: HeroImage
} => {
  let updatedImages = [...images];
  let updatedCurrentImage = { ...currentImage };
  
  if (useSlider && uploadForId) {
    updatedImages = images.map(img => {
      if (img.id === uploadForId) {
        return {
          ...img,
          imageUrl,
          dimensions
        };
      }
      return img;
    });
  } else {
    updatedCurrentImage = {
      ...currentImage,
      id: currentImage.id || Date.now().toString(),
      imageUrl,
      dimensions
    };
  }
  
  return { updatedImages, updatedCurrentImage };
};
