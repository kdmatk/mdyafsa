
import React, { useEffect, useRef, useState } from 'react';

// Define the global Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        MapTypeId: {
          ROADMAP: string;
        };
      };
    };
    initMap?: () => void;
  }
}

const UAEMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  
  useEffect(() => {
    // التحقق مما إذا كانت هناك حاجة لتحميل واجهة برمجة التطبيقات لخرائط Google
    if (typeof window.google === 'undefined' && !window.initMap && !mapError) {
      // محاولة تحميل خرائط Google مع مفتاح API من متغيرات البيئة إذا كان متاحًا
      const loadGoogleMapsScript = () => {
        // استخدم مفتاح API افتراضي أو من متغيرات البيئة إذا كان متاحًا
        const apiKey = mapApiKey || '';
        
        if (!apiKey) {
          console.warn("Google Maps API key is missing");
          setMapError(true);
          return;
        }
        
        window.initMap = () => {
          console.log("Google Maps API loaded successfully");
          initializeMap();
        };
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error("Failed to load Google Maps API");
          setMapError(true);
        };
        document.head.appendChild(script);
      };
      
      // محاولة تحميل خرائط Google إذا كان لدينا مفتاح
      if (mapApiKey) {
        loadGoogleMapsScript();
      } else {
        setMapError(true);
      }
    } else if (typeof window.google !== 'undefined' && window.google.maps) {
      // إذا كانت خرائط Google محملة بالفعل، فقم بتهيئة الخريطة
      initializeMap();
    }
  }, [mapApiKey]);
  
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 24.4539, lng: 54.3773 }, // إحداثيات أبوظبي
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });
      setMapLoaded(true);
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setMapError(true);
    }
  };

  // إضافة محدد مفتاح API إذا لم يكن محددًا بعد
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapApiKey(e.target.value);
  };

  if (mapError) {
    return (
      <div className="w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-gray-500 text-center p-6">
          <p className="text-xl font-semibold mb-2">خريطة الإمارات العربية المتحدة</p>
          <p className="text-sm mb-4">يتعذر تحميل الخريطة حاليًا</p>
          
          {!mapApiKey && (
            <div className="mt-4 w-full max-w-md">
              <div className="text-sm mb-2 text-gray-600">أدخل مفتاح API لخرائط Google للعرض:</div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="أدخل مفتاح API لخرائط Google"
                value={mapApiKey}
                onChange={handleApiKeyChange}
              />
              <p className="text-xs mt-2 text-gray-500">
                ملاحظة: قم بإضافة المفتاح كمتغير بيئي VITE_GOOGLE_MAPS_API_KEY في إعدادات Netlify الخاصة بك لاستخدامه في الإنتاج.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-md"
      aria-label="خريطة الإمارات العربية المتحدة"
    />
  );
};

export default UAEMap;
