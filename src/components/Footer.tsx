
import { useTranslation } from '@/utils/translations';
import FooterLogo from './footer/FooterLogo';
import FooterQuickLinks from './footer/FooterQuickLinks';
import FooterServices from './footer/FooterServices';
import FooterContact from './footer/FooterContact';
import FooterCopyright from './footer/FooterCopyright';

const Footer = () => {
  const { language } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <FooterLogo />
          <FooterQuickLinks />
          <FooterServices />
          <FooterContact />
        </div>
        
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
