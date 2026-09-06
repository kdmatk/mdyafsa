
import Layout from '@/components/Layout';
import ServiceHeader from '@/components/services/ServiceHeader';
import ContactSection from '@/components/services/ContactSection';
import { useLanguage } from '@/hooks/useLanguage';

const OurServices = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-24">
        <ServiceHeader />
        <ContactSection language={language} />
      </div>
    </Layout>
  );
};

export default OurServices;
