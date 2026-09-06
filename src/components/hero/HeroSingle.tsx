
import { useTranslation } from '@/utils/translations';

interface HeroImage {
  id: string;
  imageUrl: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  dimensions?: { width: number; height: number };
}

interface HeroSingleProps {
  image: HeroImage;
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  imageLoadError: Record<string, boolean>;
}

const HeroSingle = ({ image, handleImageError, imageLoadError }: HeroSingleProps) => {
  const { language } = useTranslation();
  const isRtl = language === 'ar';
  const hasError = imageLoadError[image.id];
  
  console.log("عرض صورة مفردة");
  console.log("مسار الصورة المفردة:", image.imageUrl);
  
  return (
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
            id={`hero-image-${image.id}`}
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
          <div className="container mx-auto px-4">
            <div className="text-center p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-mdyafae mb-4">
                {isRtl ? image.title.ar : image.title.en}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {isRtl ? image.subtitle.ar : image.subtitle.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSingle;
