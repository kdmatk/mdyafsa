
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
  language: string;
}

const FormActions = ({ onCancel, isEditing, language }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        {language === 'ar' ? 'إلغاء' : 'Cancel'}
      </Button>
      <Button type="submit" className="bg-mdyafae hover:bg-mdyafae-dark text-white">
        {isEditing 
          ? (language === 'ar' ? 'تحديث الخدمة' : 'Update Service') 
          : (language === 'ar' ? 'إضافة الخدمة' : 'Add Service')}
      </Button>
    </div>
  );
};

export default FormActions;
