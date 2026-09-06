
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ContactSectionProps {
  language: string;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-bold mb-4">
        {language === 'ar' ? 'هل تحتاج إلى مزيد من المعلومات؟' : 'Need more information?'}
      </h3>
      <p className="text-gray-600 mb-6">
        {language === 'ar' 
          ? 'فريقنا مستعد للرد على استفساراتك وتقديم كافة المعلومات التي تحتاجها' 
          : 'Our team is ready to answer your inquiries and provide all the information you need'}
      </p>
      <Button
        className="bg-mdyafae-gold hover:bg-mdyafae text-white transition-all duration-300 px-8 py-6 text-lg rounded-xl"
        onClick={() => navigate('/contact')}
      >
        {language === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
      </Button>
    </div>
  );
};

export default ContactSection;
