
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Home, Users, Package, Phone, UserPlus } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleNavigation = () => {
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
    }
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  const getNavLinks = () => {
    if (language === 'ar') {
      return [
        { to: "/", text: "الرئيسية", icon: <Home size={16} /> },
        { to: "/about", text: "من نحن", icon: <Users size={16} /> },
        { to: "/services", text: "خدماتنا", icon: <Package size={16} /> },
        { to: "/contact", text: "تواصل معنا", icon: <Phone size={16} /> },
      ];
    } else {
      return [
        { to: "/", text: "Home", icon: <Home size={16} /> },
        { to: "/about", text: "About Us", icon: <Users size={16} /> },
        { to: "/services", text: "Our Services", icon: <Package size={16} /> },
        { to: "/contact", text: "Contact Us", icon: <Phone size={16} /> },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - reduced size */}
          <Link to="/" className="flex items-center" onClick={handleNavigation}>
            <img 
              src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" 
              alt="MDYAF مضياف" 
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-1 space-x-reverse' : 'space-x-1'}`}>
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.to} 
                className={`px-3 py-2 text-md font-medium text-mdyafae-dark hover:text-mdyafae transition-colors flex items-center ${language === 'ar' ? '' : 'flex-row-reverse'}`}
                onClick={handleNavigation}
              >
                <span className={language === 'ar' ? "ml-1" : "mr-1"}>{link.icon}</span>
                {link.text}
              </Link>
            ))}
            <a 
              href="https://mdyaf.ae/%d8%b5%d9%81%d8%ad%d8%a9-%d8%a7%d9%86%d8%b6%d9%85-%d8%a7%d9%84%d9%8a%d9%86%d8%a7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-3 py-2 text-md font-medium text-mdyafae-gold hover:text-mdyafae-dark transition-colors flex items-center ${language === 'ar' ? '' : 'flex-row-reverse'}`}
            >
              <span className={language === 'ar' ? "ml-1" : "mr-1"}><UserPlus size={16} /></span>
              {language === 'ar' ? 'انضم الينا كمقدم خدمة' : 'Join as Service Provider'}
            </a>
            <button
              onClick={toggleLanguage}
              className="ml-4 p-2 rounded-full bg-mdyafae/10 hover:bg-mdyafae/20 transition-colors duration-300 flex items-center"
              aria-label={language === 'ar' ? 'تغيير اللغة' : 'Change Language'}
            >
              <Globe size={18} className="text-mdyafae" />
              <span className={`${language === 'ar' ? 'mr-1' : 'ml-1'} text-xs font-medium`}>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-mdyafae hover:bg-mdyafae/10 transition-colors duration-300"
              aria-label={language === 'ar' ? 'القائمة' : 'Menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full right-0 left-0 bg-white shadow-md animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.to} 
                  className={`block px-3 py-2 rounded-md text-base font-medium text-mdyafae-dark hover:bg-mdyafae/10 hover:text-mdyafae transition-colors duration-300 flex items-center ${language === 'ar' ? '' : 'flex-row-reverse'}`}
                  onClick={handleNavigation}
                >
                  <span className={language === 'ar' ? "ml-2" : "mr-2"}>{link.icon}</span>
                  {link.text}
                </Link>
              ))}
              <a 
                href="https://mdyaf.ae/%d8%b5%d9%81%d8%ad%d8%a9-%d8%a7%d9%86%d8%b6%d9%85-%d8%a7%d9%84%d9%8a%d9%86%d8%a7/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`block px-3 py-2 rounded-md text-base font-medium text-mdyafae-gold hover:bg-mdyafae/10 hover:text-mdyafae transition-colors duration-300 flex items-center ${language === 'ar' ? '' : 'flex-row-reverse'}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={language === 'ar' ? "ml-2" : "mr-2"}><UserPlus size={16} /></span>
                {language === 'ar' ? 'انضم الينا كمقدم خدمة' : 'Join as Service Provider'}
              </a>
              <button
                onClick={toggleLanguage}
                className="w-full text-right px-3 py-2 rounded-md text-base font-medium text-mdyafae-dark hover:bg-mdyafae/10 hover:text-mdyafae transition-colors duration-300 flex items-center"
              >
                <Globe size={18} className={language === 'ar' ? "ml-2" : "mr-2"} />
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
