
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/utils/translations';
import { HeroImage, HeroConfig } from '@/types/heroSlider';
import { createEmptyImage, notifyConfigUpdated } from '@/utils/heroSliderUtils';
import { loadHeroConfig, loadPreviousConfig, saveHeroConfig } from '@/utils/heroSliderStorage';
import { 
  updateSliderImage, 
  addImageToSlider, 
  removeImageFromSlider, 
  updateSingleImage,
  processUploadedImage
} from '@/utils/heroImageHandlers';

export const useHeroSlider = () => {
  const { toast } = useToast();
  const { language } = useTranslation();
  const isRtl = language === 'ar';
  
  // حالة الوضع والصور
  const [useSlider, setUseSlider] = useState(false);
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentImage, setCurrentImage] = useState<HeroImage>(createEmptyImage());
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  
  // حالة رفع الصور
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadForId, setUploadForId] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // حالة الإعدادات السابقة وحوار العودة
  const [previousConfig, setPreviousConfig] = useState<HeroConfig | null>(null);
  const [showRevertDialog, setShowRevertDialog] = useState(false);

  // أبعاد الصورة الموصى بها
  const recommendedDimensions = {
    width: 1920,
    height: 1080
  };

  // تحميل الإعدادات عند بدء التشغيل
  useEffect(() => {
    const config = loadHeroConfig();
    if (config) {
      setUseSlider(config.useSlider);
      setImages(config.images || []);
      
      if (!config.useSlider && config.images && config.images.length > 0) {
        setCurrentImage(config.images[0]);
      }
      
      if (config.images && config.images.length > 0) {
        setActiveImageId(config.images[0].id);
      }
    }

    const prevConfig = loadPreviousConfig();
    if (prevConfig) {
      setPreviousConfig(prevConfig);
    }
  }, []);

  // حفظ الإعدادات
  const handleSaveConfig = () => {
    if (images.length === 0 && !currentImage.imageUrl) {
      toast({
        title: isRtl ? "خطأ" : "Error",
        description: isRtl ? "يجب إضافة صورة واحدة على الأقل" : "You must add at least one image",
        variant: "destructive",
      });
      return;
    }

    const config = {
      useSlider,
      images: useSlider ? images : currentImage.imageUrl ? [currentImage] : [],
    };
    
    if (saveHeroConfig(config)) {
      toast({
        title: isRtl ? "تم الحفظ بنجاح" : "Saved Successfully",
        description: isRtl ? "تم حفظ إعدادات صورة الواجهة بنجاح" : "Hero image settings saved successfully",
      });
    }
  };

  // العودة للإعدادات السابقة
  const handleRevertConfig = () => {
    if (!previousConfig) {
      toast({
        title: isRtl ? "تنبيه" : "Note",
        description: isRtl ? "لا توجد إعدادات سابقة للعودة إليها" : "No previous settings to revert to",
      });
      return;
    }

    setShowRevertDialog(false);

    const currentConfig = {
      useSlider,
      images: useSlider ? images : currentImage.imageUrl ? [currentImage] : [],
    };
    localStorage.setItem('previousHeroSliderConfig', JSON.stringify(currentConfig));

    setUseSlider(previousConfig.useSlider);
    setImages(previousConfig.images || []);
    
    if (!previousConfig.useSlider && previousConfig.images && previousConfig.images.length > 0) {
      setCurrentImage(previousConfig.images[0]);
    } else {
      setCurrentImage(createEmptyImage());
    }
    
    if (previousConfig.images && previousConfig.images.length > 0) {
      setActiveImageId(previousConfig.images[0].id);
    } else {
      setActiveImageId(null);
    }

    saveHeroConfig(previousConfig, false);
    
    toast({
      title: isRtl ? "تمت العودة بنجاح" : "Reverted Successfully",
      description: isRtl ? "تمت العودة إلى الإعدادات السابقة بنجاح" : "Successfully reverted to previous settings",
    });
  };

  // إضافة صورة جديدة
  const handleAddImage = () => {
    const { updatedImages, newImageId } = addImageToSlider(images);
    setImages(updatedImages);
    setActiveImageId(newImageId);
  };

  // حذف صورة
  const handleRemoveImage = (id: string) => {
    const { updatedImages, newActiveId } = removeImageFromSlider(images, id, activeImageId);
    setImages(updatedImages);
    setActiveImageId(newActiveId);
  };

  // تغيير بيانات صورة في وضع السلايدر
  const handleImageChange = (id: string, field: string, value: string, lang?: 'ar' | 'en') => {
    const updatedImages = updateSliderImage(images, id, field, value, lang);
    setImages(updatedImages);
  };

  // تغيير بيانات الصورة في الوضع المفرد
  const handleSingleImageChange = (field: string, value: string, lang?: 'ar' | 'en') => {
    const updatedImage = updateSingleImage(currentImage, field, value, lang);
    setCurrentImage(updatedImage);
  };

  // فتح نافذة رفع الصور
  const handleUploadClick = (id?: string) => {
    console.log("فتح مربع حوار اختيار الملف لمعرف:", id || "الصورة المفردة");
    setUploadForId(id || null);
  };

  // معالجة الصورة بعد رفعها
  const handleImageUploaded = (imageUrl: string, dimensions: { width: number; height: number }) => {
    const { updatedImages, updatedCurrentImage } = processUploadedImage(
      useSlider,
      images,
      currentImage,
      uploadForId,
      imageUrl,
      dimensions
    );
    
    setImages(updatedImages);
    setCurrentImage(updatedCurrentImage);
    
    const config = {
      useSlider,
      images: useSlider ? updatedImages : [updatedCurrentImage],
    };
    
    saveHeroConfig(config);
    setUploadForId(null);
  };
  
  // الحصول على الصورة النشطة حالياً
  const getActiveImage = () => {
    if (useSlider) {
      return images.find(img => img.id === activeImageId) || null;
    }
    return currentImage;
  };
  
  const activeImage = getActiveImage();

  return {
    useSlider,
    setUseSlider,
    images,
    currentImage,
    activeImageId,
    setActiveImageId,
    selectedFile,
    setSelectedFile,
    previewUrl,
    setPreviewUrl,
    imageDimensions,
    setImageDimensions,
    previousConfig,
    showRevertDialog,
    setShowRevertDialog,
    recommendedDimensions,
    activeImage,
    handleSaveConfig,
    handleRevertConfig,
    handleAddImage,
    handleRemoveImage,
    handleImageChange,
    handleSingleImageChange,
    handleUploadClick,
    handleImageUploaded
  };
};
