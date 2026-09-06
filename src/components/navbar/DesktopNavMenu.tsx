
import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

interface NavMenuItem {
  name: string;
  path: string;
  submenu?: Array<{
    name: string;
    path: string;
  }>;
}

interface DesktopNavMenuProps {
  navItems: NavMenuItem[];
  isRtl: boolean;
}

const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({ navItems, isRtl }) => {
  return (
    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
      {navItems.map((item, index) => (
        item.submenu ? (
          <DropdownMenu key={index} item={item} isRtl={isRtl} />
        ) : (
          <Link 
            key={index}
            to={item.path} 
            className="text-gray-600 hover:text-mdyafae px-3 py-2 rounded-md transition-colors"
          >
            {item.name}
          </Link>
        )
      ))}
    </div>
  );
};

export default DesktopNavMenu;
