
import { HeroImage } from "@/types/heroSlider";

/**
 * يقوم بإنشاء حدث تحديث للإعلام بتغيير إعدادات السلايدر
 */
export const notifyConfigUpdated = (config: any) => {
  try {
    const storageEvent = new StorageEvent('storage', {
      key: 'heroSliderConfig',
      newValue: JSON.stringify(config),
      url: window.location.href
    });
    window.dispatchEvent(storageEvent);
    
    window.dispatchEvent(new Event('heroConfigUpdated'));
    console.log("تم إصدار حدث heroConfigUpdated");
  } catch (error) {
    console.error("خطأ في إصدار الحدث:", error);
  }
};

/**
 * يقوم بإنشاء صورة جديدة فارغة
 */
export const createEmptyImage = (): HeroImage => ({
  id: Date.now().toString(),
  imageUrl: '',
  title: { ar: '', en: '' },
  subtitle: { ar: '', en: '' },
  dimensions: { width: 0, height: 0 }
});
