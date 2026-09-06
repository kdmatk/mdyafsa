
import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '@/utils/translations';

interface SearchOverlayProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isSearchOpen, toggleSearch }) => {
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';

  if (!isSearchOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white shadow-lg p-4 z-50 overflow-hidden">
      <div className="relative max-w-4xl mx-auto mt-16">
        <input 
          type="text" 
          placeholder={t('searchPlaceholder')}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdyafae focus:border-transparent"
          autoFocus
        />
        <button 
          onClick={toggleSearch}
          className="absolute right-3 top-3 text-gray-500 hover:text-mdyafae"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchOverlay;
