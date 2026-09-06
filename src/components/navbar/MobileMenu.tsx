
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Moon } from 'lucide-react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  navItems: Array<{
    name: string;
    path: string;
    submenu?: Array<{
      name: string;
      path: string;
    }>;
  }>;
  isRtl: boolean;
  toggleLanguage: () => void;
  language: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMenuOpen, 
  navItems, 
  isRtl, 
  toggleLanguage, 
  language 
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg border-t">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            {item.submenu ? (
              <div className="block px-3 py-2 text-gray-700 font-medium">
                <span>{item.name}</span>
                <ChevronDown size={16} className={`${isRtl ? "mr-1" : "ml-1"} inline`} />
                
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200">
                  {item.submenu.map((subitem, subindex) => (
                    <Link 
                      key={subindex} 
                      to={subitem.path} 
                      className="block px-3 py-2 text-gray-600 hover:text-mdyafae transition-colors"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                to={item.path} 
                className="block px-3 py-2 text-gray-700 font-medium hover:text-mdyafae hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
        
        <div className="pt-4 pb-2 border-t border-gray-200">
          <div className="flex items-center justify-between px-3">
            <button 
              onClick={toggleLanguage}
              className="text-gray-600 hover:text-mdyafae px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button className="text-gray-600 hover:text-mdyafae p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Moon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
