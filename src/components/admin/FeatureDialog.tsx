
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Feature } from '@/hooks/useFeatures';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FeatureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingFeature: Feature | null;
  language: string;
  onSave: (title: string, description: string) => void;
}

const FeatureDialog = ({ isOpen, onOpenChange, editingFeature, language, onSave }: FeatureDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  // Update form when editing feature changes
  useEffect(() => {
    if (editingFeature) {
      setTitle(editingFeature.title);
      setDescription(editingFeature.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingFeature, isOpen]);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: language === 'ar' ? 'البيانات غير مكتملة' : 'Incomplete Data',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    onSave(title, description);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={language === 'ar' ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>
            {editingFeature 
              ? (language === 'ar' ? 'تعديل الميزة' : 'Edit Feature') 
              : (language === 'ar' ? 'إضافة ميزة جديدة' : 'Add New Feature')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'ar' ? 'عنوان الميزة' : 'Feature Title'}
            </label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان الميزة' : 'Enter feature title'}
              className={language === 'ar' ? 'text-right' : 'text-left'}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'ar' ? 'وصف الميزة' : 'Feature Description'}
            </label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل وصف الميزة' : 'Enter feature description'}
              className={`${language === 'ar' ? 'text-right' : 'text-left'}`}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter className={language === 'ar' ? 'justify-start flex-row-reverse' : 'justify-end'}>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button 
            className="bg-mdyafae hover:bg-mdyafae-dark" 
            onClick={handleSave}
          >
            {language === 'ar' ? 'حفظ' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDialog;
