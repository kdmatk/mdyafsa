
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export interface Feature {
  id: number;
  title: string;
  description: string;
}

export const useFeatures = (language: string) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);
  const { toast } = useToast();

  // Load features from localStorage or use defaults
  useEffect(() => {
    const loadFeatures = () => {
      const defaultFeatures = getDefaultFeatures(language);
      
      // Try to load from localStorage first
      const savedFeatures = localStorage.getItem(`adminFeatures_${language}`);
      if (savedFeatures) {
        try {
          const parsedFeatures = JSON.parse(savedFeatures);
          setFeatures(parsedFeatures);
          setIsLocalStorageLoaded(true);
        } catch (error) {
          console.error('فشل في تحميل الميزات من التخزين المحلي:', error);
          setFeatures(defaultFeatures);
        }
      } else if (isLocalStorageLoaded) {
        // If we've loaded from localStorage before but don't have data for this language, 
        // use the default features but don't overwrite existing data from other language
        setFeatures(defaultFeatures);
      } else {
        // First load and no localStorage data
        setFeatures(defaultFeatures);
        // Save default features to localStorage
        localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(defaultFeatures));
      }
    };
    
    loadFeatures();
  }, [language, isLocalStorageLoaded]);

  // Get default features based on language
  const getDefaultFeatures = (lang: string): Feature[] => {
    return lang === 'ar' 
      ? [
          { id: 1, title: 'ضيافة عربية أصيلة', description: 'تقديم خدمات الضيافة العربية الأصيلة بأعلى مستويات الجودة' },
          { id: 2, title: 'تصميم مناسبات', description: 'تصميم المناسبات والاحتفالات بطريقة مبتكرة تناسب متطلبات العميل' },
          { id: 3, title: 'خدمة على مدار الساعة', description: 'تقديم خدمات الضيافة على مدار الساعة وفي أي وقت' },
          { id: 4, title: 'طاقم متميز', description: 'طاقم عمل محترف ومدرب على أعلى مستوى' },
        ]
      : [
          { id: 1, title: 'Authentic Arabic Hospitality', description: 'Providing authentic Arabic hospitality services with the highest quality standards' },
          { id: 2, title: 'Event Design', description: 'Designing events and celebrations in an innovative way that suits customer requirements' },
          { id: 3, title: '24/7 Service', description: 'Providing hospitality services around the clock and at any time' },
          { id: 4, title: 'Distinguished Staff', description: 'Professional staff trained to the highest level' },
        ];
  };

  // Add a new feature
  const addFeature = (title: string, description: string) => {
    const newId = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;
    const newFeatures = [...features, { id: newId, title, description }];
    
    setFeatures(newFeatures);
    localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(newFeatures));
    
    toast({
      title: language === 'ar' ? 'تمت الإضافة بنجاح' : 'Added Successfully',
      description: language === 'ar' ? 'تمت إضافة الميزة بنجاح' : 'The feature has been added successfully',
    });
    
    return newFeatures;
  };

  // Update an existing feature
  const updateFeature = (id: number, title: string, description: string) => {
    const updatedFeatures = features.map(feature => 
      feature.id === id 
        ? { ...feature, title, description } 
        : feature
    );
    
    setFeatures(updatedFeatures);
    localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(updatedFeatures));
    
    toast({
      title: language === 'ar' ? 'تم التعديل بنجاح' : 'Updated Successfully',
      description: language === 'ar' ? 'تم تعديل الميزة بنجاح' : 'The feature has been updated successfully',
    });
    
    return updatedFeatures;
  };

  // Delete a feature
  const deleteFeature = (id: number) => {
    const filteredFeatures = features.filter(feature => feature.id !== id);
    
    setFeatures(filteredFeatures);
    localStorage.setItem(`adminFeatures_${language}`, JSON.stringify(filteredFeatures));
    
    toast({
      title: language === 'ar' ? 'تم الحذف بنجاح' : 'Deleted Successfully',
      description: language === 'ar' ? 'تم حذف الميزة بنجاح' : 'The feature has been deleted successfully',
    });
    
    return filteredFeatures;
  };

  return {
    features,
    addFeature,
    updateFeature,
    deleteFeature
  };
};
