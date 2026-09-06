
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, ChefHat, Utensils, Users } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

// محاكاة لاستخدام framer-motion للتأثيرات
const MotionDiv = ({ children, delay, ...props }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay || 0);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return (
    <div 
      {...props} 
      className={`transition-all duration-700 ${props.className || ''} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

const EventSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById('event-section')?.offsetTop || 0;
      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="event-section" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <MotionDiv delay={100}>
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-mdyafae-gold/20">
              <span className="text-mdyafae-gold font-semibold text-sm">{t('planYourEvent')}</span>
            </div>
          </MotionDiv>
          
          <MotionDiv delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('makeEventsSpecial')}</h2>
          </MotionDiv>
          
          <MotionDiv delay={300}>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('eventServicesDesc')}
            </p>
          </MotionDiv>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* تحسين الصور بنفس الحجم والشكل */}
              <div className="flex flex-col gap-4">
                <div className="h-64 overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/lovable-uploads/df88d9e0-595c-42ad-8a5c-c5ea09b548a2.png" 
                    alt="حفلات" 
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1080/1350', objectPosition: 'center' }}
                  />
                </div>
                <div className="h-64 overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/lovable-uploads/caed902d-5798-4634-ad3a-6fa71ea8f54b.png" 
                    alt="تنظيم المناسبات" 
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1080/1350', objectPosition: 'center' }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-64 overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/lovable-uploads/6579cc70-c80f-404a-8e94-1800d7b724fa.png" 
                    alt="ضيافة" 
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1080/1350', objectPosition: 'center' }}
                  />
                </div>
                <div className="h-64 overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/lovable-uploads/1a02044e-4620-4b63-9e3f-11eab0115e9a.png" 
                    alt="ترتيب الطعام" 
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1080/1350', objectPosition: 'center' }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">{t('whyChooseUs')}</h3>
              <p className="text-gray-600">
                {t('whyChooseUsDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: <ChefHat size={24} className="text-mdyafae" />,
                  title: t('professionalChefs'),
                  description: t('professionalChefsDesc')
                },
                {
                  icon: <Calendar size={24} className="text-mdyafae" />,
                  title: t('comprehensivePlanning'),
                  description: t('comprehensivePlanningDesc')
                },
                {
                  icon: <Utensils size={24} className="text-mdyafae" />,
                  title: t('diverseMenu'),
                  description: t('diverseMenuDesc')
                },
                {
                  icon: <Users size={24} className="text-mdyafae" />,
                  title: t('fullServiceTeam'),
                  description: t('fullServiceTeamDesc')
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="mb-2">{item.icon}</div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Button
              className="bg-mdyafae-gold hover:bg-mdyafae text-white transition-all duration-300 font-bold text-lg p-6 w-full sm:w-auto"
              size="lg"
            >
              {t('bookEventService')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
