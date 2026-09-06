
import { useTranslation } from '@/utils/translations';
import { MapPin, Phone, Mail } from 'lucide-react';

const FooterContact = () => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <div>
      <h3 className="text-lg font-bold mb-6 text-mdyafae-gold">{t('contactInfo')}</h3>
      <ul className="space-y-6">
        <li className="group flex items-start">
          <div className="bg-gray-800 p-2 rounded mt-1 group-hover:bg-mdyafae-gold/20">
            <MapPin size={16} className="text-mdyafae-gold" />
          </div>
          <a href="https://maps.app.goo.gl/UdRsZGCaKHGSEYBt9" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm leading-relaxed ml-3 hover:text-mdyafae-gold transition-colors">
            {t('dubai')}
          </a>
        </li>
        <li className="group flex items-center">
          <div className="bg-gray-800 p-2 rounded group-hover:bg-mdyafae-gold/20">
            <Phone size={16} className="text-mdyafae-gold" />
          </div>
          <a href="tel:920033765" className="text-gray-400 text-sm ml-3 direction-ltr hover:text-mdyafae-gold transition-colors">920033765</a>
        </li>
        <li className="group flex items-center">
          <div className="bg-gray-800 p-2 rounded group-hover:bg-mdyafae-gold/20">
            <Mail size={16} className="text-mdyafae-gold" />
          </div>
          <a href="mailto:info@mdyafae.com" className="text-gray-400 text-sm ml-3 hover:text-mdyafae-gold transition-colors">info@mdyafae.com</a>
        </li>
      </ul>
      
      <div className="mt-8">
        <h4 className="text-sm font-bold mb-4 text-mdyafae-gold">{t('downloadAppFooter')}</h4>
        <div className={`flex space-x-3 ${isRtl ? 'space-x-reverse' : ''}`}>
          <a 
            href="https://play.google.com/store/apps/details?id=com.ofook.mdyaf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play" 
              className="h-10"
            />
          </a>
          <a 
            href="https://apps.apple.com/us/app/%D9%85%D8%B6%D9%8A%D8%A7%D9%81-mdyaf/id6470273216" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store" 
              className="h-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
