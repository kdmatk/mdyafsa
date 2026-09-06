
import { useHeroConfig } from '@/hooks/useHeroConfig';
import HeroDefault from '@/components/hero/HeroDefault';
import HeroSingle from '@/components/hero/HeroSingle';
import HeroSlider from '@/components/hero/HeroSlider';

const Hero = () => {
  const { heroConfig, imageLoadError, handleImageError } = useHeroConfig();

  // إذا لم تكن هناك صور مكونة بعد، عرض صورة افتراضية
  if (heroConfig.images.length === 0) {
    return <HeroDefault />;
  }

  console.log("عرض الصور المكونة. نوع العرض:", heroConfig.useSlider ? "سلايدر" : "صورة مفردة");

  // لوضع العرض الشريطي
  if (heroConfig.useSlider && heroConfig.images.length > 0) {
    return <HeroSlider 
      images={heroConfig.images} 
      handleImageError={handleImageError} 
      imageLoadError={imageLoadError} 
    />;
  }

  // لوضع الصورة المفردة
  return <HeroSingle 
    image={heroConfig.images[0]} 
    handleImageError={handleImageError} 
    imageLoadError={imageLoadError} 
  />;
};

export default Hero;
