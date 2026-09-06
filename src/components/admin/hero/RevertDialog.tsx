
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RevertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRevert: () => void;
  language: string;
}

const RevertDialog = ({ open, onOpenChange, onRevert, language }: RevertDialogProps) => {
  const isRtl = language === 'ar';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isRtl ? 'تأكيد العودة للإعدادات السابقة' : 'Confirm Revert to Previous Settings'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isRtl 
              ? 'هل أنت متأكد أنك تريد العودة إلى الإعدادات السابقة؟ سيتم حفظ الإعدادات الحالية كنسخة احتياطية.' 
              : 'Are you sure you want to revert to the previous settings? Your current settings will be saved as a backup.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {isRtl ? 'إلغاء' : 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onRevert} className="bg-amber-500 hover:bg-amber-600">
            {isRtl ? 'نعم، العودة للإعدادات السابقة' : 'Yes, Revert'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RevertDialog;
