
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Moon } from 'lucide-react';

interface NavbarIconsProps {
  toggleSearch: () => void;
  toggleLanguage: () => void;
  language: string;
  isRtl: boolean;
  isMobile?: boolean;
  toggleMenu?: () => void;
}

const NavbarIcons: React.FC<NavbarIconsProps> = ({ 
  toggleSearch, 
  toggleLanguage, 
  language, 
  isRtl,
  isMobile = false,
  toggleMenu
}) => {
  return (
    <div className={`flex items-center space-x-4 rtl:space-x-reverse`}>
      <button 
        onClick={toggleSearch}
        className="text-gray-600 hover:text-mdyafae p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Search size={20} />
      </button>
      <Link 
        to="/cart" 
        className="text-gray-600 hover:text-mdyafae p-2 rounded-full hover:bg-gray-100 transition-colors relative"
      >
        <ShoppingCart size={20} />
        <span className="absolute -top-1 -right-1 bg-mdyafae text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
      </Link>
      {!isMobile && (
        <>
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-mdyafae px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button className="text-gray-600 hover:text-mdyafae p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Moon size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default NavbarIcons;
