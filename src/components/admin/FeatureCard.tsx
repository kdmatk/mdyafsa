
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Feature } from '@/hooks/useFeatures';

interface FeatureCardProps {
  feature: Feature;
  language: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const FeatureCard = ({ feature, language, onEdit, onDelete }: FeatureCardProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {feature.description}
        </p>
        <div className={`flex gap-2 ${language === 'ar' ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(feature.id)}
            className="text-amber-600 border-amber-600 hover:bg-amber-50"
          >
            <Edit size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
            {language === 'ar' ? 'تعديل' : 'Edit'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(feature.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
            {language === 'ar' ? 'حذف' : 'Delete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
