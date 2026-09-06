
import { useEffect, useState } from 'react';
import { Truck, Users, Clock, Award, ShoppingBag, Calendar, Music, Shield } from 'lucide-react';
import EventBookingForm from './EventBookingForm';
import { useTranslation } from '@/utils/translations';

const FeatureItem = ({ icon, title, description, delay, image }: { icon: React.ReactNode, title: string, description: string, delay: number, image?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div 
      className={`flex flex-col items-center text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="mb-4 p-4 bg-mdyafae text-white rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ourServices')}</h2>
          <p className="text-mdyafae-dark max-w-xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FeatureItem 
            icon={<Truck size={24} />} 
            title={t('fastDelivery')}
            description={t('fastDeliveryDesc')}
            delay={100}
          />
          <FeatureItem 
            icon={<Users size={24} />} 
            title={t('professionalTeam')}
            description={t('professionalTeamDesc')}
            delay={200}
          />
          <FeatureItem 
            icon={<Calendar size={24} />} 
            title={t('eventOrganizing')}
            description={t('eventOrganizingDesc')}
            delay={300}
          />
          <FeatureItem 
            icon={<ShoppingBag size={24} />} 
            title={t('diverseProducts')}
            description={t('diverseProductsDesc')}
            delay={400}
          />
          <FeatureItem 
            icon={<Clock size={24} />} 
            title={t('hourService')}
            description={t('hourServiceDesc')}
            delay={500}
          />
          <FeatureItem 
            icon={<Music size={24} />} 
            title={t('djService')}
            description={t('djServiceDesc')}
            delay={550}
          />
          <FeatureItem 
            icon={<Award size={24} />} 
            title={t('guaranteedQuality')}
            description={t('guaranteedQualityDesc')}
            delay={600}
          />
          <FeatureItem 
            icon={<Shield size={24} />} 
            title={t('securityService')}
            description={t('securityServiceDesc')}
            delay={650}
          />
        </div>
        <div className="mt-20">
          <EventBookingForm />
        </div>
      </div>
    </section>
  );
};

export default Features;
