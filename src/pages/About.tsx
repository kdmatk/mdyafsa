
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Users, Award, Clock, Globe } from 'lucide-react';

const statsData = [
  { value: '10+', label: 'سنوات الخبرة', icon: <Clock className="text-mdyafae-gold" size={24} /> },
  { value: '5000+', label: 'عميل', icon: <Users className="text-mdyafae-gold" size={24} /> },
  { value: '100+', label: 'موظف محترف', icon: <Award className="text-mdyafae-gold" size={24} /> },
  { value: '7', label: 'إمارات', icon: <Globe className="text-mdyafae-gold" size={24} /> }
];

const AnimatedStat = ({ value, label, icon, delay }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div 
      className={`flex flex-col items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-2">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1 text-mdyafae">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const About = () => {
  return (
    <Layout>
      <div className="pt-24 bg-gradient-to-b from-mdyafae-light/10 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-mdyafae/10">
              <span className="text-mdyafae font-semibold text-sm">من نحن</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تعرف على مضياف الإمارات</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نحن شركة رائدة في مجال الضيافة وتوصيل الطعام وتنظيم المناسبات في دولة الإمارات العربية المتحدة. 
              نسعى لتقديم خدمات متميزة بأعلى معايير الجودة لإرضاء عملائنا.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-mdyafae/10 rounded-3xl blur-lg"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="/lovable-uploads/df88d9e0-595c-42ad-8a5c-c5ea09b548a2.png"
                  alt="فريق مضياف" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">قصتنا</h2>
              <p className="text-gray-600">
                تأسست مضياف الإمارات بهدف تقديم خدمات ضيافة متميزة تعكس الكرم والأصالة الإماراتية. 
                منذ بداياتنا، كان هدفنا هو إحداث تغيير إيجابي في تجربة الضيافة وتقديم الطعام وتنظيم المناسبات 
                في دولة الإمارات.
              </p>
              <p className="text-gray-600">
                نفتخر بفريقنا المحترف المكون من خبراء في مجال الضيافة والطهي وتنظيم الفعاليات، 
                حيث يعملون بشغف لتقديم خدمات تفوق توقعات عملائنا.
              </p>
              <p className="text-gray-600">
                اليوم، أصبحت مضياف الإمارات علامة رائدة في مجال الضيافة، ونستمر في التوسع 
                لتغطية جميع إمارات الدولة مع الحفاظ على مستوى الجودة العالي الذي نشتهر به.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {statsData.map((stat, index) => (
              <AnimatedStat 
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={index * 100}
              />
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-mdyafae p-10 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">رؤيتنا</h2>
                <p className="mb-4">
                  أن نكون الاختيار الأول في مجال خدمات الضيافة وتوصيل الطعام وتنظيم المناسبات
                  في دولة الإمارات العربية المتحدة، وأن نقدم تجربة استثنائية تجمع بين الأصالة الإماراتية
                  والمعايير العالمية.
                </p>
              </div>
              <div className="p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-mdyafae mb-6">رسالتنا</h2>
                <p className="text-gray-600 mb-4">
                  تقديم خدمات ضيافة متميزة تعكس الكرم والضيافة الإماراتية الأصيلة، 
                  باستخدام أفضل المنتجات والمكونات وبأيدي فريق محترف، 
                  مع التركيز على الجودة والاهتمام بأدق التفاصيل لضمان تجربة لا تُنسى لعملائنا.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">قيمنا</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "الجودة", description: "نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا ومنتجاتنا" },
                { title: "الابتكار", description: "نسعى دائماً لتقديم حلول مبتكرة وتجارب فريدة لعملائنا" },
                { title: "النزاهة", description: "نعمل بأمانة وشفافية في جميع تعاملاتنا مع العملاء والموردين" },
                { title: "الإتقان", description: "نهتم بأدق التفاصيل لضمان تجربة متكاملة ومتميزة" },
                { title: "التعاون", description: "نؤمن بأهمية العمل الجماعي والتعاون لتحقيق أفضل النتائج" },
                { title: "المسؤولية", description: "نلتزم بمسؤوليتنا تجاه عملائنا ومجتمعنا والبيئة" }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-mdyafae mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
