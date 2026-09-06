
import React from 'react';

const FooterCopyright = () => {
  return (
    <div className="pt-8 mt-8 border-t border-gray-800 text-center">
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لـ شركة مضياف العربية (الإمارات العربية المتحدة) - mdyaf.ae
      </p>
    </div>
  );
};

export default FooterCopyright;
