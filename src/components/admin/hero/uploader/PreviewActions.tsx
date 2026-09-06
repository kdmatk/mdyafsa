
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface PreviewActionsProps {
  onCancel: () => void;
  onUpload: () => void;
  language: string;
}

const PreviewActions = ({ onCancel, onUpload, language }: PreviewActionsProps) => {
  const isRtl = language === 'ar';
  
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={onCancel}
      >
        {isRtl ? 'إلغاء' : 'Cancel'}
      </Button>
      <Button
        className="bg-mdyafae hover:bg-mdyafae-dark"
        onClick={onUpload}
      >
        <Upload className={`${isRtl ? 'ml-2' : 'mr-2'}`} size={16} />
        {isRtl ? 'استخدام هذه الصورة' : 'Use This Image'}
      </Button>
    </div>
  );
};

export default PreviewActions;
