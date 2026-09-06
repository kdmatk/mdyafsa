
import { Link } from 'react-router-dom';
import { useTranslation } from '@/utils/translations';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const FooterLogo = () => {
  const { language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <div className="space-y-6">
      <div>
        <Link to="/" className="block">
          <img 
            src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
            alt="MDYAF مضياف" 
            className="h-24 w-auto transform hover:scale-105 transition-transform duration-300" 
          />
        </Link>
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed">
        {isRtl ? 
          'مضياف الإمارات، خدمات الضيافة وتوصيل الطعام وتنظيم المناسبات في جميع أنحاء دولة الإمارات العربية المتحدة.' : 
          'MDYAF UAE, hospitality services, food delivery, and event organization throughout the United Arab Emirates.'}
      </p>
      
      <div className="flex gap-4">
        <a href="https://www.facebook.com/mdyafae" target="_blank" rel="noopener noreferrer" className="group">
          <div className="bg-gray-800 p-2 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-mdyafae-gold">
            <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </a>
        <a href="https://www.instagram.com/mdyafae/" target="_blank" rel="noopener noreferrer" className="group">
          <div className="bg-gray-800 p-2 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-mdyafae-gold">
            <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </a>
        <a href="https://twitter.com/mdyafae" target="_blank" rel="noopener noreferrer" className="group">
          <div className="bg-gray-800 p-2 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-mdyafae-gold">
            <Twitter size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </a>
        <a href="https://www.linkedin.com/company/mdyafae" target="_blank" rel="noopener noreferrer" className="group">
          <div className="bg-gray-800 p-2 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-mdyafae-gold">
            <Linkedin size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default FooterLogo;
