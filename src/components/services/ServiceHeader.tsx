
import { useLanguage } from '@/hooks/useLanguage';

const ServiceHeader = () => {
  const { language } = useLanguage();
  
  return (
    <div className="text-center mb-16 animate-on-scroll">
      <div className="inline-block px-3 py-1 mb-3 rounded-full bg-mdyafae/10">
        <span className="text-mdyafae font-semibold text-sm">
          {language === 'ar' ? 'خدماتنا' : 'Our Services'}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {language === 'ar' ? 'خدمات مضياف الإمارات' : 'Mdyafae Emirates Services'}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {language === 'ar' 
          ? 'نقدم مجموعة متكاملة من خدمات الضيافة والتوصيل وتنظيم المناسبات لعملائنا في جميع أنحاء دولة الإمارات العربية المتحدة.' 
          : 'We provide a comprehensive range of hospitality, delivery, and event organization services to our clients throughout the United Arab Emirates.'}
      </p>
    </div>
  );
};

export default ServiceHeader;
