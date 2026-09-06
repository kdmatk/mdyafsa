
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map, Navigation, Star } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

const OrderSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAppLinks, setShowAppLinks] = useState(false);
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById('order-section')?.offsetTop || 0;
      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="order-section" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
            }`}
          >
            <div className="flex justify-start">
              <img 
                src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
                alt="MDYAF مضياف" 
                className="h-24 w-auto mb-4" 
              />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-mdyafae/10">
              <span className="text-mdyafae font-semibold text-sm">{t('fastDeliveryTitle')}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {t('orderWithEase')}
            </h2>
            
            <p className="text-gray-600">
              {t('appDescription')}
            </p>
            
            <ul className="space-y-3">
              {[
                { text: t('deliveryAllUAE') },
                { text: t('trackOrder') },
                { text: t('multiplePayment') },
                { text: t('support24') }
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className={`w-5 h-5 rounded-full bg-mdyafae/20 flex items-center justify-center ${isRtl ? 'ml-2' : 'mr-2'}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-mdyafae" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 relative">
              <Button
                className="bg-mdyafae hover:bg-mdyafae-dark text-white transition-all duration-300 text-lg p-6 flex items-center gap-2"
                size="lg"
                onClick={() => setShowAppLinks(prev => !prev)}
              >
                <span>{t('downloadApp')}</span>
                <ArrowLeft size={18} />
              </Button>
              
              {showAppLinks && (
                <div className="absolute top-full mt-2 bg-white p-4 rounded-lg shadow-lg flex gap-4 z-10">
                  <a href="https://play.google.com/store/apps/details?id=com.ofook.mdyaf" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play" 
                      className="h-10"
                    />
                  </a>
                  <a href="https://apps.apple.com/us/app/%D9%85%D8%B6%D9%8A%D8%A7%D9%81-mdyaf/id6470273216" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="App Store" 
                      className="h-10"
                    />
                  </a>
                </div>
              )}
              
              <Button
                variant="outline"
                className="border-mdyafae text-mdyafae hover:bg-mdyafae hover:text-white transition-all duration-300 text-lg p-6 flex items-center gap-2"
                size="lg"
              >
                <Map size={18} />
                <span>{t('trackYourOrder')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
