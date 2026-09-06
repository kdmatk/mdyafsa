
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface SubMenuItem {
  name: string;
  path: string;
}

interface DropdownMenuProps {
  item: {
    name: string;
    path: string;
    submenu?: SubMenuItem[];
  };
  isRtl: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, isRtl }) => {
  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer text-gray-600 hover:text-mdyafae px-3 py-2 rounded-md transition-colors">
        <span>{item.name}</span>
        <ChevronDown size={16} className={`${isRtl ? "mr-1" : "ml-1"}`} />
      </div>
      
      {item.submenu && (
        <div className="absolute rtl:right-0 ltr:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          {item.submenu.map((subitem, subindex) => (
            <Link 
              key={subindex} 
              to={subitem.path} 
              className="block px-4 py-2 text-gray-700 hover:bg-mdyafae/10 hover:text-mdyafae transition-colors"
            >
              {subitem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
