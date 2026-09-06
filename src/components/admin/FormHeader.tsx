
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface FormHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
  language: string;
}

const FormHeader = ({ title, subtitle, onBack, language }: FormHeaderProps) => {
  return (
    <div className="mb-8 flex items-center">
      <Button variant="ghost" onClick={onBack} className="mr-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'العودة' : 'Back'}
      </Button>
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default FormHeader;
