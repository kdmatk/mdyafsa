
import React from 'react';
import Layout from '@/components/Layout';
import { useTranslation } from '@/utils/translations';
import { Shield } from 'lucide-react';

const Privacy = () => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="h-8 w-8 text-mdyafae" />
            <h1 className="text-3xl font-bold text-mdyafae">
              {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <p className="text-gray-600 mb-6">
              {isRtl 
                ? 'تم تحديث هذه السياسة في: 1 يوليو 2023' 
                : 'Last updated: July 1, 2023'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'مقدمة' : 'Introduction'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'تلتزم شركة مضياف العربية ("نحن" أو "الشركة") بحماية خصوصية المعلومات الشخصية التي نجمعها من عملائنا ومستخدمي موقعنا الإلكتروني. نحن ندرك أهمية خصوصية بياناتك ونتعهد بالحفاظ عليها وفقًا لهذه السياسة.' 
                : 'Mdyaf Arabian Company ("we" or "the Company") is committed to protecting the privacy of personal information collected from our clients and website users. We recognize the importance of your data privacy and pledge to maintain it in accordance with this policy.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'المعلومات التي نجمعها' : 'Information We Collect'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'قد نجمع معلومات شخصية عندما تستخدم موقعنا أو خدماتنا، بما في ذلك: الاسم وتفاصيل الاتصال (مثل رقم الهاتف والبريد الإلكتروني) والعنوان وتفاصيل الدفع وتاريخ المعاملات وأي معلومات أخرى تقدمها طواعية.' 
                : 'We may collect personal information when you use our website or services, including: name, contact details (such as phone number and email), address, payment details, transaction history, and any other information you voluntarily provide.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'كيفية استخدام المعلومات' : 'How We Use Information'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'نستخدم المعلومات التي نجمعها لتوفير خدماتنا وتحسينها، والتواصل معك، ومعالجة المدفوعات، وتلبية الطلبات، والامتثال للالتزامات القانونية، وحماية حقوقنا.' 
                : 'We use the information we collect to provide and improve our services, communicate with you, process payments, fulfill orders, comply with legal obligations, and protect our rights.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'مشاركة المعلومات' : 'Information Sharing'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'لا نبيع معلوماتك الشخصية إلى أطراف ثالثة. قد نشارك معلوماتك مع مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا، أو عندما يكون ذلك ضروريًا للامتثال للقانون أو حماية حقوقنا.' 
                : 'We do not sell your personal information to third parties. We may share your information with service providers who help us operate our business, or when necessary to comply with the law or protect our rights.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'أمان البيانات' : 'Data Security'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'نتخذ تدابير أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الإفصاح عنها. ومع ذلك، لا يمكن ضمان أمان كامل للمعلومات المرسلة عبر الإنترنت.' 
                : 'We take reasonable security measures to protect your personal information from unauthorized access or disclosure. However, no complete security can be guaranteed for information transmitted over the internet.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'حقوقك' : 'Your Rights'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'قد يكون لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية، بما في ذلك الحق في الوصول إلى معلوماتك أو تصحيحها أو حذفها. للاستفسار عن حقوقك أو ممارستها، يرجى الاتصال بنا على المعلومات الواردة أدناه.' 
                : 'You may have certain rights regarding your personal information, including the right to access, correct, or delete your information. To inquire about or exercise your rights, please contact us using the information below.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'تغييرات على سياسة الخصوصية' : 'Changes to the Privacy Policy'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isRtl 
                ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، وقد نخطرك بالتغييرات الهامة عبر البريد الإلكتروني أو إشعار على موقعنا.' 
                : 'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we may notify you of significant changes via email or a notice on our website.'}
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-mdyafae">
              {isRtl ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            <p className="text-gray-700">
              {isRtl 
                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:' 
                : 'If you have any questions about this Privacy Policy, please contact us at:'}
            </p>
            <p className="text-mdyafae font-semibold mt-2">
              <a href="mailto:info@mdyafae.com" className="hover:underline">info@mdyafae.com</a>
            </p>
            <p className="text-mdyafae font-semibold">
              <a href="tel:920033765" className="hover:underline">920033765</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
