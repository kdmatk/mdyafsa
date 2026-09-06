
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  language: string;
}

export const ServiceFAQ = ({ language }: ServiceFAQProps) => {
  const navigate = useNavigate();
  
  const getFaqItems = (): FAQItem[] => {
    if (language === 'ar') {
      return [
        { 
          question: "ماهي الخدمات المقدمة من تطبيق مضياف؟", 
          answer: "يقدم تطبيق مضياف العديد من الخدمات منها: الورود، الهدايا، الطعام الشعبي، الذبايح، تنسيق الجلسات، العطور والبخور والعود، الفود ترك المتحرك، ستيشن الطعام، تقديم الطعام والبوفيهات وتنسيقها." 
        },
        { 
          question: "ماهي الامارات التي يغطيها تطبيق مضياف؟", 
          answer: "يغطي تطبيق مضياف جميع إمارات الدولة السبع: أبوظبي، دبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة." 
        },
        { 
          question: "هل يقدم مضياف خدمة الضيافة بمكان العميل؟", 
          answer: "نعم، يقدم مضياف خدمات الضيافة المتكاملة في موقع العميل حسب احتياجاته وطلباته الخاصة." 
        },
        { 
          question: "هل بامكان تطبيق مضياف توفير خدمات ضيافة مخصصة؟", 
          answer: "نعم، يمكن لمضياف توفير خدمات ضيافة مخصصة بالكامل حسب متطلبات العميل، بدءًا من نوع الطعام ووصولاً إلى طريقة التقديم والديكور." 
        },
        { 
          question: "كيف يمكنني طلب خدمة من مضياف الإمارات؟", 
          answer: "يمكنك طلب خدماتنا من خلال تطبيق مضياف الإمارات، أو الاتصال بنا مباشرة، أو عبر موقعنا الإلكتروني." 
        },
        { 
          question: "ما هي مناطق التغطية لخدمات التوصيل؟", 
          answer: "نقدم خدمات التوصيل في جميع إمارات الدولة، ويختلف وقت التوصيل حسب المنطقة." 
        },
        { 
          question: "هل يمكنني تخصيص قائمة الطعام للمناسبات؟", 
          answer: "نعم، نوفر خيارات مخصصة لقوائم الطعام حسب رغباتك واحتياجاتك." 
        },
        { 
          question: "كم تستغرق عملية حجز خدمة تنظيم مناسبة؟", 
          answer: "ننصح بالحجز قبل المناسبة بفترة لا تقل عن أسبوعين، وكلما كان الحجز مبكراً كان أفضل." 
        }
      ];
    } else {
      return [
        { 
          question: "What services are provided by the Mdyafae app?", 
          answer: "Mdyafae app offers many services including: flowers, gifts, traditional food, livestock, session arrangements, perfumes, incense, mobile food trucks, food stations, food service, buffets and their arrangement." 
        },
        { 
          question: "Which emirates does the Mdyafae app cover?", 
          answer: "Mdyafae app covers all seven emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah." 
        },
        { 
          question: "Does Mdyafae provide hospitality service at the client's location?", 
          answer: "Yes, Mdyafae provides integrated hospitality services at the client's location according to their needs and special requests." 
        },
        { 
          question: "Can the Mdyafae app provide customized hospitality services?", 
          answer: "Yes, Mdyafae can provide fully customized hospitality services as per client requirements, from the type of food to the presentation method and decoration." 
        },
        { 
          question: "How can I request a service from Mdyafae Emirates?", 
          answer: "You can request our services through the Mdyafae Emirates app, by contacting us directly, or through our website." 
        },
        { 
          question: "What are the coverage areas for delivery services?", 
          answer: "We provide delivery services in all emirates, and delivery time varies depending on the region." 
        },
        { 
          question: "Can I customize the food menu for events?", 
          answer: "Yes, we provide customized options for food menus according to your wishes and needs." 
        },
        { 
          question: "How long does it take to book an event organization service?", 
          answer: "We recommend booking at least two weeks before the event, and the earlier the booking, the better." 
        }
      ];
    }
  };

  const faqItems = getFaqItems();

  return (
    <div className="mt-20 pt-16 border-t border-gray-200 animate-on-scroll">
      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-mdyafae/10">
          <span className="text-mdyafae font-semibold text-sm">
            {language === 'ar' ? 'دليل المساعدة' : 'Help Guide'}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          {language === 'ar' 
            ? 'إجابات لأكثر الأسئلة شيوعاً حول خدمات مضياف الإمارات' 
            : 'Answers to the most common questions about Mdyafae Emirates services'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {faqItems.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`flex items-start mb-3 ${language === 'ar' ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full bg-mdyafae/10 flex items-center justify-center ${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
                <HelpCircle size={20} className="text-mdyafae" />
              </div>
              <h3 className="text-lg font-bold">{faq.question}</h3>
            </div>
            <p className={`text-gray-600 ${language === 'ar' ? 'mr-11' : 'ml-11'}`}>{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          {language === 'ar' 
            ? 'لم تجد إجابة لسؤالك؟ تواصل معنا مباشرة' 
            : "Didn't find an answer to your question? Contact us directly"}
        </p>
        <Button
          className="bg-mdyafae-gold hover:bg-mdyafae text-white transition-all duration-300 px-8 py-6 text-lg rounded-xl"
          onClick={() => navigate('/contact')}
        >
          {language === 'ar' ? 'تواصل مع فريق الدعم' : 'Contact Support Team'}
        </Button>
      </div>
    </div>
  );
};

export default ServiceFAQ;
