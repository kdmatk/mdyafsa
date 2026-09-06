
import { HeroConfig } from "@/types/heroSlider";
import { notifyConfigUpdated } from "./heroSliderUtils";

/**
 * يقوم بتحميل إعدادات السلايدر من التخزين المحلي
 */
export const loadHeroConfig = (): HeroConfig | null => {
  const savedConfig = localStorage.getItem('heroSliderConfig');
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig);
      console.log("تم تحميل الإعدادات من localStorage:", config);
      return config;
    } catch (error) {
      console.error("خطأ في تحليل إعدادات الصور:", error);
      return null;
    }
  }
  return null;
};

/**
 * يقوم بتحميل الإعدادات السابقة من التخزين المحلي
 */
export const loadPreviousConfig = (): HeroConfig | null => {
  const previousConfig = localStorage.getItem('previousHeroSliderConfig');
  if (previousConfig) {
    try {
      return JSON.parse(previousConfig);
    } catch (error) {
      console.error("خطأ في تحليل الإعدادات السابقة:", error);
      return null;
    }
  }
  return null;
};

/**
 * يقوم بحفظ إعدادات السلايدر في التخزين المحلي
 */
export const saveHeroConfig = (config: HeroConfig, updatePrevious: boolean = true): boolean => {
  try {
    if (updatePrevious) {
      const oldConfig = localStorage.getItem('heroSliderConfig');
      if (oldConfig) {
        localStorage.setItem('previousHeroSliderConfig', oldConfig);
      }
    }
    
    localStorage.setItem('heroSliderConfig', JSON.stringify(config));
    notifyConfigUpdated(config);
    return true;
  } catch (error) {
    console.error("خطأ في حفظ الإعدادات:", error);
    return false;
  }
};
