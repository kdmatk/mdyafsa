
import { useTranslation } from '@/utils/translations';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface HeroImage {
  id: string;
  imageUrl: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  dimensions?: { width: number; height: number };
}

interface HeroSliderProps {
  images: HeroImage[];
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  imageLoadError: Record<string, boolean>;
}

const HeroSlider = ({ images, handleImageError, imageLoadError }: HeroSliderProps) => {
  const { language } = useTranslation();
  const isRtl = language === 'ar';
  
  console.log("تجهيز عرض سلايدر الصور، عدد الصور:", images.length);
  
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => {
          const hasError = imageLoadError[image.id];
          console.log(`الصورة ${index + 1}:`, image.imageUrl);
          
          return (
            <CarouselItem key={image.id || index}>
              <div className="relative">
                {!hasError ? (
                  <div 
                    className="bg-cover bg-center h-[70vh] flex items-center"
                    style={{ 
                      backgroundImage: `url(${image.imageUrl})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <img 
                      src={image.imageUrl}
                      alt=""
                      className="hidden"
                      onError={handleImageError}
                      id={`hero-slider-image-${image.id}`}
                    />
                    <div className="container mx-auto px-4">
                      <div 
                        className={`max-w-xl p-6 rounded-lg ${
                          isRtl ? 'text-right mr-auto' : 'text-left ml-0'
                        }`}
                      >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
                          {isRtl ? image.title.ar : image.title.en}
                        </h1>
                        <p className="text-xl text-white mb-8 text-shadow">
                          {isRtl ? image.subtitle.ar : image.subtitle.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[70vh] flex items-center justify-center bg-gray-100">
                    <div className="text-center p-6">
                      <h1 className="text-4xl md:text-5xl font-bold text-mdyafae mb-4">
                        {isRtl ? image.title.ar : image.title.en}
                      </h1>
                      <p className="text-xl text-gray-600 mb-8">
                        {isRtl ? image.subtitle.ar : image.subtitle.en}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default HeroSlider;
