
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

const CustomFooter = () => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mdyafae text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
                alt="MDYAF مضياف" 
                className="h-32 w-auto mb-4" 
              />
            </Link>
            <p className="text-gray-200 mb-4">
              {isRtl ? 
                'شركة رائدة في مجال الضيافة وتوصيل الطعام في الإمارات العربية المتحدة، نقدم خدمات عالية الجودة لعملائنا الكرام.' :
                'A leading company in the hospitality and food delivery industry in the UAE, providing high-quality services to our valued customers.'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { name: t('home'), path: '/' },
                { name: t('about'), path: '/about' },
                { name: t('services'), path: '/services' },
                { name: t('contact'), path: '/contact' },
                { name: t('blog'), path: '/blog' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('ourServices')}</h3>
            <ul className="space-y-2">
              {[
                { name: t('hospitality'), path: '/services/hospitality' },
                { name: t('events'), path: '/services/events' },
                { name: t('catering'), path: '/services/catering' },
                { name: t('foodDelivery'), path: '/services/delivery' },
                { name: t('corporateServices'), path: '/services/corporate' },
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className={`${isRtl ? "ml-2" : "mr-2"} mt-1 flex-shrink-0`} />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className={`${isRtl ? "ml-2" : "mr-2"} flex-shrink-0`} />
                <span>+971 50 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className={`${isRtl ? "ml-2" : "mr-2"} flex-shrink-0`} />
                <span>info@mdyaf.ae</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              &copy; {year} MDYAF. {t('rightsReserved')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                {t('termsConditions')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
