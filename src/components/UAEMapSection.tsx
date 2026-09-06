
import React, { useEffect, useState } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

const UAEMapSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById('uae-map-section')?.offsetTop || 0;
      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Emirates list with proper translation support
  const emirates = [
    { name: isRtl ? "أبوظبي" : "Abu Dhabi", position: "bottom-10 right-40", delay: "0s" },
    { name: isRtl ? "دبي" : "Dubai", position: "bottom-32 right-24", delay: "0.5s" },
    { name: isRtl ? "الشارقة" : "Sharjah", position: "bottom-44 right-20", delay: "1s" },
    { name: isRtl ? "عجمان" : "Ajman", position: "bottom-56 right-28", delay: "1.5s" },
    { name: isRtl ? "أم القيوين" : "Umm Al Quwain", position: "bottom-68 right-36", delay: "2s" },
    { name: isRtl ? "رأس الخيمة" : "Ras Al Khaimah", position: "top-24 right-28", delay: "2.5s" },
    { name: isRtl ? "الفجيرة" : "Fujairah", position: "top-48 right-12", delay: "3s" },
  ];

  return (
    <section id="uae-map-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-mdyafae/10 mb-3">
            <span className="text-mdyafae font-semibold text-sm">
              {isRtl ? "تغطية شاملة" : "Comprehensive Coverage"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            {isRtl ? (
              <>نصل إليك في <span className="text-mdyafae">جميع أنحاء الإمارات</span></>
            ) : (
              <>We reach you <span className="text-mdyafae">across all UAE</span></>
            )}
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {isRtl 
              ? "خدمة توصيل سريعة وموثوقة تغطي جميع إمارات الدولة السبع. أينما كنت في الإمارات، نحن نصل إليك."
              : "Fast and reliable delivery service covering all seven emirates. Wherever you are in the UAE, we'll reach you."}
          </p>
        </div>

        <div className="relative h-[550px] max-w-4xl mx-auto">
          <div 
            className={`absolute inset-0 transition-all duration-2000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Map background */}
            <div className="absolute inset-0 bg-gradient-to-r from-mdyafae/5 to-mdyafae-gold/5 rounded-3xl overflow-hidden shadow-xl">
              {/* Approximate map shape */}
              <div className="absolute inset-0 m-8 border-4 border-dashed border-mdyafae/20 rounded-2xl"></div>
              
              {/* Arabian Gulf coastline */}
              <div className="absolute top-10 bottom-10 left-10 right-28 border-2 border-mdyafae/30 rounded-r-full"></div>
              
              {/* Internal borders (simplified) */}
              <div className="absolute w-1 h-32 bg-mdyafae/20 rounded-full top-32 right-48 rotate-45"></div>
              <div className="absolute w-1 h-24 bg-mdyafae/20 rounded-full top-52 right-36 rotate-12"></div>
              <div className="absolute w-1 h-20 bg-mdyafae/20 rounded-full top-40 right-24 -rotate-45"></div>
            </div>
            
            {/* Order delivery person image */}
            <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 animate-float">
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-full shadow-lg overflow-hidden border-2 border-mdyafae/20 flex items-center justify-center p-1">
                  <img
                    src="/lovable-uploads/5bab6289-5ec8-45ef-a1d0-ac3ee7157e25.png"
                    alt={isRtl ? "موصل طلبات مضياف" : "Mdyafae delivery person"}
                    className="w-full h-auto object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-mdyafae rounded-full flex items-center justify-center text-white shadow-lg">
                  <Truck size={24} />
                </div>
              </div>
            </div>
            
            {/* Delivery path lines */}
            {emirates.map((emirate, index) => (
              <div 
                key={index}
                className="absolute left-1/2 top-1/2 w-1 origin-bottom bg-mdyafae-gold/40"
                style={{
                  height: `${100 + (index * 15)}px`,
                  transform: `rotate(${(index * 51) - 180}deg)`,
                  animation: `grow 2.5s ${emirates[index].delay} forwards`,
                  opacity: 0
                }}
              />
            ))}
            
            {/* Seven Emirates with improved positions */}
            {emirates.map((emirate, index) => (
              <div 
                key={index}
                className={`absolute ${emirate.position} animate-fade-in opacity-0`}
                style={{ 
                  animationDelay: emirate.delay, 
                  animationFillMode: 'forwards',
                  animationDuration: '1.5s'
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-mdyafae rounded-full shadow-lg text-white mb-2">
                    <MapPin size={18} />
                  </div>
                  <div className="glass px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-md">
                    {emirate.name}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Decorative animated points - improved Mdyafae word visibility */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-3 h-3 bg-mdyafae rounded-full opacity-0 flex items-center justify-center"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  right: `${20 + Math.random() * 60}%`,
                  animation: `pulse 5s ${i * 0.8}s infinite`
                }}
              >
                <span 
                  className="absolute text-[10px] font-bold text-white whitespace-nowrap bg-mdyafae-dark/70 px-2 py-0.5 rounded-full -mt-6"
                  style={{ 
                    animation: `pulse 5s ${i * 0.8}s infinite`,
                    textShadow: '0 0 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {isRtl ? "مضياف" : "MDYAFAE"}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="flex justify-center flex-wrap gap-4">
            {emirates.map((emirate, index) => (
              <div 
                key={index} 
                className="px-4 py-2 bg-white shadow-md rounded-full flex items-center gap-2 animate-fade-in"
                style={{ 
                  animationDelay: `${1.5 + index * 0.4}s`,
                  animationDuration: '1.2s'
                }}
              >
                <span className="w-3 h-3 rounded-full bg-mdyafae"></span>
                <span className="font-medium">{emirate.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UAEMapSection;
