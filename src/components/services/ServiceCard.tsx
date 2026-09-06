import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Truck, Calendar, Utensils, Coffee, CakeSlice, Music, ChefHat, Users, Gift, Flower, Heart, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useImageError } from '@/hooks/useImageError';

interface Service {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  active: boolean;
  category_id?: number;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  language: string;
}

const ServiceCard = ({ service, index, language }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleImageError } = useImageError();
  
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  const getServiceIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('توصيل') || titleLower.includes('delivery')) {
      return <Truck size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('مناسبات') || titleLower.includes('event')) {
      return <Calendar size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('ضيافة') || titleLower.includes('hospitality')) {
      return <Utensils size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('عربية') || titleLower.includes('arabic')) {
      return <Coffee size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('شوكولاتة') || titleLower.includes('chocolate')) {
      return <CakeSlice size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('ديجي') || titleLower.includes('dj')) {
      return <Music size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('طهي') || titleLower.includes('cooking')) {
      return <ChefHat size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('شركات') || titleLower.includes('corporate')) {
      return <Users size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('هدايا') || titleLower.includes('gift')) {
      return <Gift size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('ورود') || titleLower.includes('flower')) {
      return <Flower size={20} className="text-mdyafae" />;
    } else if (titleLower.includes('خاصة') || titleLower.includes('special')) {
      return <Heart size={20} className="text-mdyafae" />;
    } else {
      return <PlusCircle size={20} className="text-mdyafae" />;
    }
  };

  const getDummyFeatures = (language: string) => {
    if (language === 'ar') {
      return [
        "خدمة احترافية ومتميزة",
        "فريق متخصص ومدرب",
        "أسعار تنافسية",
        "خدمة سريعة وموثوقة"
      ];
    } else {
      return [
        "Professional and distinguished service",
        "Specialized and trained team",
        "Competitive prices",
        "Fast and reliable service"
      ];
    }
  };

  const handleRequestService = () => {
    try {
      console.log('طلب الخدمة:', service);
      localStorage.setItem('selectedService', JSON.stringify(service));
      
      toast({
        title: language === 'ar' ? 'تم اختيار الخدمة' : 'Service Selected',
        description: language === 'ar' 
          ? `تم اختيار "${service.title_ar}". سيتم توجيهك لملء نموذج الطلب.` 
          : `"${service.title_en}" selected. You will be redirected to the request form.`,
      });
      
      setTimeout(() => {
        navigate(`/contact?service=${service.id}`);
      }, 1000);
    } catch (error) {
      console.error('خطأ في طلب الخدمة:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' 
          ? 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' 
          : 'An error occurred while processing your request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.warn(`[تحذير]: مسار الصورة غير صالح للخدمة رقم ${service.id} - ${language}`);
      return '/placeholder.svg';
    }
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('data:image/')) {
      return imageUrl;
    }
    
    if (!imageUrl.startsWith('/')) {
      return `/${imageUrl}`;
    }
    
    return imageUrl;
  };

  const title = language === 'ar' ? service.title_ar : service.title_en;
  const description = language === 'ar' ? service.description_ar : service.description_en;
  const features = getDummyFeatures(language);
  const icon = getServiceIcon(title);
  const imageUrl = getImageUrl(service.image);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="h-[400px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          style={{ aspectRatio: '1080/1350', objectPosition: 'center' }}
          onError={handleImageError}
          id={`service-image-${service.id}`}
        />
      </div>
      <div className="p-6">
        <div className={`flex items-center mb-4 ${language === 'ar' ? '' : 'flex-row-reverse justify-end'}`}>
          <div className={`w-10 h-10 rounded-full bg-mdyafae/10 flex items-center justify-center ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className={`flex items-start ${language === 'ar' ? '' : 'flex-row-reverse'}`}>
              <div className={`w-5 h-5 rounded-full bg-mdyafae/10 flex items-center justify-center ${language === 'ar' ? 'ml-2 mt-1' : 'mr-2 mt-1'}`}>
                <div className="w-2 h-2 rounded-full bg-mdyafae"></div>
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full bg-mdyafae hover:bg-mdyafae-dark text-white transition-all duration-300"
          onClick={handleRequestService}
        >
          {language === 'ar' ? 'اطلب الخدمة الآن' : 'Request Service Now'}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
