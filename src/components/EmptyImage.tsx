
import React from 'react';

interface EmptyImageProps {
  className?: string;
  alt?: string;
  height?: string;
  width?: string;
}

const EmptyImage: React.FC<EmptyImageProps> = ({ 
  className = "", 
  alt = "الصورة غير متوفرة", 
  height = "h-full",
  width = "w-full"
}) => {
  return (
    <div 
      className={`flex items-center justify-center bg-gray-100 rounded-md ${height} ${width} ${className}`}
    >
      <div className="text-gray-400 text-xs text-center p-2">
        {alt}
      </div>
    </div>
  );
};

export default EmptyImage;
