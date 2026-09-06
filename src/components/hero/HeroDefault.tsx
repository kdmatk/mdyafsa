
import { useTranslation } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';

const HeroDefault = () => {
  const { language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <div className="relative">
      <div 
        className="bg-cover bg-center h-[75vh] flex items-center relative"
        style={{ 
          backgroundImage: 'url(https://mdyaf.ae/wp-content/uploads/2023/10/Main-header-with-logo-01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-xl ${isRtl ? 'text-right mr-auto' : 'text-left ml-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow animate-fade-in">
              {isRtl ? 'مضياف للضيافة والتموين الغذائي' : 'MDYAF Food Catering Services'}
            </h1>
            <p className="text-xl text-white mb-8 text-shadow animate-slide-up">
              {isRtl 
                ? 'نقدم خدمات الضيافة والتموين الغذائي بأعلى معايير الجودة والاحترافية في كافة أنحاء الإمارات'
                : 'Providing premium catering services with the highest quality standards across UAE'}
            </p>
            <div className="flex gap-4 mt-6 animate-zoom-in" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Button 
                className="bg-mdyafae hover:bg-mdyafae-dark text-white px-6 py-3 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isRtl ? 'استكشف خدماتنا' : 'Explore Our Services'}
                {isRtl ? <ArrowLeftIcon className="mr-2" /> : <ArrowRightIcon className="ml-2" />}
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-mdyafae px-6 py-3 text-lg font-medium transition-all duration-300"
              >
                {isRtl ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDefault;
