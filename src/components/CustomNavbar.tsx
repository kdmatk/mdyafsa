
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/utils/translations';
import { useLanguage } from '@/hooks/useLanguage';

// المكونات الجديدة
import DesktopNavMenu from './navbar/DesktopNavMenu';
import MobileMenu from './navbar/MobileMenu';
import NavbarIcons from './navbar/NavbarIcons';
import SearchOverlay from './navbar/SearchOverlay';

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const isRtl = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // تأكد من تحميل العناصر مرة واحدة فقط
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { 
      name: t('services'), 
      path: '/services', 
      submenu: [
        { name: t('hospitality'), path: '/services/hospitality' },
        { name: t('events'), path: '/services/events' },
        { name: t('catering'), path: '/services/catering' }
      ]
    },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
              alt="MDYAF مضياف" 
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavMenu navItems={navItems} isRtl={isRtl} />

          {/* Right icons for desktop */}
          <div className="hidden md:block">
            <NavbarIcons 
              toggleSearch={toggleSearch}
              toggleLanguage={toggleLanguage}
              language={language}
              isRtl={isRtl}
            />
          </div>

          {/* Mobile menu button and icons */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <NavbarIcons 
              toggleSearch={toggleSearch}
              toggleLanguage={toggleLanguage}
              language={language}
              isRtl={isRtl}
              isMobile={true}
            />
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-mdyafae p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        navItems={navItems} 
        isRtl={isRtl}
        toggleLanguage={toggleLanguage}
        language={language}
      />
      
      {/* Search overlay */}
      <SearchOverlay 
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
      />
    </nav>
  );
};

export default CustomNavbar;
