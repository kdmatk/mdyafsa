
import { useState } from 'react';
import { History, Save } from 'lucide-react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Button } from '@/components/ui/button';
import { useHeroSlider } from '@/hooks/useHeroSlider';
import { useTranslation } from '@/utils/translations';
import HeroRecommendedDimensions from '@/components/admin/hero/HeroRecommendedDimensions';
import HeroDisplaySettings from '@/components/admin/hero/HeroDisplaySettings';
import HeroImagePreview from '@/components/admin/hero/HeroImagePreview';
import SingleImageEditor from '@/components/admin/hero/SingleImageEditor';
import SliderImagesEditor from '@/components/admin/hero/SliderImagesEditor';
import RevertDialog from '@/components/admin/hero/RevertDialog';

const AdminHeroSlider = () => {
  const { language } = useTranslation();
  const isRtl = language === 'ar';
  
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  const {
    useSlider,
    setUseSlider,
    images,
    currentImage,
    activeImageId,
    setActiveImageId,
    previousConfig,
    showRevertDialog,
    setShowRevertDialog,
    recommendedDimensions,
    activeImage,
    handleSaveConfig,
    handleRevertConfig,
    handleAddImage,
    handleRemoveImage,
    handleImageChange,
    handleSingleImageChange,
    handleUploadClick,
    handleImageUploaded
  } = useHeroSlider();

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
            {isRtl ? 'إدارة صورة الواجهة' : 'Manage Hero Image'}
          </h1>
          <div className="flex space-x-2">
            {previousConfig && (
              <Button 
                onClick={() => setShowRevertDialog(true)}
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50"
              >
                <History className={`${isRtl ? 'ml-2' : 'mr-2'}`} size={16} />
                {isRtl ? 'العودة للإعدادات السابقة' : 'Revert to Previous Settings'}
              </Button>
            )}
            <Button 
              onClick={handleSaveConfig}
              className="bg-mdyafae hover:bg-mdyafae-dark"
            >
              <Save className={`${isRtl ? 'ml-2' : 'mr-2'}`} size={16} />
              {isRtl ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <RevertDialog 
          open={showRevertDialog} 
          onOpenChange={setShowRevertDialog}
          onRevert={handleRevertConfig}
          language={language}
        />

        <HeroRecommendedDimensions 
          recommendedDimensions={recommendedDimensions}
          language={language}
        />

        <HeroDisplaySettings 
          useSlider={useSlider}
          setUseSlider={setUseSlider}
          language={language}
        />

        {activeImage && activeImage.imageUrl && (
          <HeroImagePreview 
            image={activeImage}
            language={language}
          />
        )}

        {useSlider ? (
          <SliderImagesEditor 
            images={images}
            activeImageId={activeImageId}
            setActiveImageId={setActiveImageId}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            handleImageChange={handleImageChange}
            handleUploadClick={handleUploadClick}
            language={language}
          />
        ) : (
          <SingleImageEditor 
            currentImage={currentImage}
            handleSingleImageChange={handleSingleImageChange}
            onImageUploaded={handleImageUploaded}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            imageDimensions={imageDimensions}
            setImageDimensions={setImageDimensions}
            recommendedDimensions={recommendedDimensions}
            language={language}
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminHeroSlider;
