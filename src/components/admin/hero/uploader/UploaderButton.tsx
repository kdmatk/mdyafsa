
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploaderButtonProps {
  handleUploadClick: () => void;
  language: string;
}

const UploaderButton = ({ handleUploadClick, language }: UploaderButtonProps) => {
  const isRtl = language === 'ar';
  
  return (
    <Button 
      onClick={handleUploadClick}
      variant="outline"
      className="bg-mdyafae/10 hover:bg-mdyafae/20 text-mdyafae"
    >
      <Camera className={`${isRtl ? 'ml-2' : 'mr-2'}`} size={16} />
      {isRtl ? 'رفع صورة جديدة' : 'Upload new image'}
    </Button>
  );
};

export default UploaderButton;
