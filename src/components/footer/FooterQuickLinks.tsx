
import { Link } from 'react-router-dom';
import { useTranslation } from '@/utils/translations';
import { Home, Users, Package, MessageSquare, Shield } from 'lucide-react';

const FooterQuickLinks = () => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <div>
      <h3 className="text-lg font-bold mb-6 text-mdyafae-gold">{t('quickLinks')}</h3>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Home size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('home')}</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Users size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('aboutUs')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Package size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('services')}</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <MessageSquare size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('contactUs')}</span>
          </Link>
        </li>
        <li>
          <Link to="/privacy" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Shield size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
          </Link>
        </li>
        <li>
          <Link to="/faq" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <MessageSquare size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('faq')}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
