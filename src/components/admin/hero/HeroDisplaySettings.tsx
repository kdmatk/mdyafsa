
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroDisplaySettingsProps {
  useSlider: boolean;
  setUseSlider: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
}

const HeroDisplaySettings = ({ useSlider, setUseSlider, language }: HeroDisplaySettingsProps) => {
  const isRtl = language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRtl ? 'إعدادات العرض' : 'Display Settings'}</CardTitle>
        <CardDescription>
          {isRtl 
            ? 'اختر طريقة عرض صورة الواجهة (صورة واحدة أو سلايدر متعدد الصور)' 
            : 'Choose how to display the hero image (single image or multi-image slider)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
          <Switch
            id="slider-mode"
            checked={useSlider}
            onCheckedChange={setUseSlider}
          />
          <Label htmlFor="slider-mode">
            {isRtl ? 'استخدام سلايدر متعدد الصور' : 'Use multi-image slider'}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroDisplaySettings;
