
import { Link } from 'react-router-dom';
import { useTranslation } from '@/utils/translations';
import { Utensils, Calendar, Users, ShoppingBag, Package } from 'lucide-react';

const FooterServices = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-bold mb-6 text-mdyafae-gold">{t('ourServicesFooter')}</h3>
      <ul className="space-y-4">
        <li>
          <Link to="/services/food-delivery" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Utensils size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('foodDelivery')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services/event-planning" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Calendar size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('eventPlanning')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services/hospitality" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Users size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('hospitalityServices')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services/corporate-events" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <ShoppingBag size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('corporateEvents')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services/special-events" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Package size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('specialEvents')}</span>
          </Link>
        </li>
        <li>
          <Link to="/services/weddings" className="group flex items-center text-gray-400 hover:text-mdyafae-gold transition-all duration-300">
            <div className="bg-gray-800 p-1.5 rounded mr-3 group-hover:bg-mdyafae-gold/20">
              <Calendar size={14} className="text-mdyafae-gold" />
            </div>
            <span className="text-sm">{t('weddingsAndParties')}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterServices;
