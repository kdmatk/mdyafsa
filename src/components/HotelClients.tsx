
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import EmptyImage from './EmptyImage';

const HotelClients = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // تتبع حالة تحميل الصور
  const [imagesStatus, setImagesStatus] = useState<{[key: number]: 'loading' | 'loaded' | 'error'}>({});
  // إضافة طابع زمني لتجنب مشاكل التخزين المؤقت
  const [timestamp, setTimestamp] = useState(Date.now());
  
  // استدعاء بيانات العملاء بطريقة محسنة
  const fetchClientData = useCallback(() => {
    setIsLoading(true);
    console.log('بدء تحميل بيانات العملاء...');
    
    try {
      // استدعاء بيانات العملاء من localStorage
      const savedClients = localStorage.getItem('clientLogos');
      
      if (savedClients) {
        const parsedClients = JSON.parse(savedClients);
        
        if (Array.isArray(parsedClients) && parsedClients.length > 0) {
          console.log('تم تحميل بيانات العملاء من التخزين المحلي:', parsedClients.length, 'عميل');
          
          // تهيئة حالة الصور
          const initialStatus: {[key: number]: 'loading' | 'loaded' | 'error'} = {};
          parsedClients.forEach(hotel => {
            initialStatus[hotel.id] = 'loading';
          });
          
          setImagesStatus(initialStatus);
          setHotels(parsedClients);
        } else {
          console.log('لا توجد بيانات عملاء في التخزين المحلي، استخدام البيانات الافتراضية');
          // إذا كانت البيانات فارغة، نستخدم البيانات الافتراضية
          setDefaultHotels();
        }
      } else {
        console.log('لا توجد بيانات عملاء في التخزين المحلي، استخدام البيانات الافتراضية');
        // إذا لم تكن هناك بيانات في localStorage، استخدم البيانات الافتراضية
        setDefaultHotels();
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات العملاء:', error);
      toast.error('حدث خطأ في تحميل بيانات العملاء');
      
      // في حالة الخطأ، نستخدم البيانات الافتراضية
      setDefaultHotels();
    } finally {
      setIsLoading(false);
      // تحديث الطابع الزمني لتجنب مشاكل التخزين المؤقت
      setTimestamp(Date.now());
    }
  }, []);
  
  // تعيين البيانات الافتراضية
  const setDefaultHotels = useCallback(() => {
    const defaultHotels = [
      { id: 1, name: 'فندق حياة', logo: '/placeholder.svg' },
      { id: 2, name: 'فندق ماريوت', logo: '/placeholder.svg' },
      { id: 3, name: 'فندق هيلتون', logo: '/placeholder.svg' },
      { id: 4, name: 'فندق كراون بلازا', logo: '/placeholder.svg' },
      { id: 5, name: 'فندق موفنبيك', logo: '/placeholder.svg' },
      { id: 6, name: 'فندق ميلينيوم', logo: '/placeholder.svg' },
      { id: 7, name: 'فيراري وورلد أبوظبي', logo: '/placeholder.svg' },
    ];
    
    setHotels(defaultHotels);
    
    // تهيئة حالة الصور للبيانات الافتراضية
    const initialStatus: {[key: number]: 'loading' | 'loaded' | 'error'} = {};
    defaultHotels.forEach(hotel => {
      initialStatus[hotel.id] = 'loading';
    });
    setImagesStatus(initialStatus);
  }, []);
  
  useEffect(() => {
    fetchClientData();
    
    // إضافة مستمع للتغييرات في localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'clientLogos') {
        console.log('تم تغيير بيانات العملاء في التخزين المحلي، إعادة تحميل البيانات');
        // إضافة تأخير بسيط لضمان اكتمال التغييرات
        setTimeout(() => {
          fetchClientData();
        }, 100);
      }
    };
    
    // إضافة مستمع مخصص للتحديثات المباشرة
    const handleCustomUpdate = () => {
      console.log('تم استلام حدث تحديث مخصص للعملاء');
      fetchClientData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clientLogosUpdated', handleCustomUpdate);
    
    // تنفيذ تحديث دوري كل دقيقة للتحقق من التغييرات
    const intervalId = setInterval(() => {
      console.log('تحديث دوري لبيانات العملاء');
      fetchClientData();
    }, 60000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clientLogosUpdated', handleCustomUpdate);
      clearInterval(intervalId);
    };
  }, [fetchClientData]);

  // معالجة نجاح تحميل الصورة
  const handleImageLoad = (id: number) => {
    console.log(`تم تحميل صورة الفندق بنجاح: ${id}`);
    setImagesStatus(prev => ({...prev, [id]: 'loaded'}));
  };

  // معالجة فشل تحميل الصورة
  const handleImageError = (id: number) => {
    console.error(`خطأ في تحميل صورة الفندق رقم ${id}`);
    setImagesStatus(prev => ({...prev, [id]: 'error'}));
  };

  // تعريف تأثيرات الحركة للعناصر
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // يتم استخدامها لفك ترميز صور Data URL
  const isDataUrl = (url: string): boolean => {
    return Boolean(url && url.startsWith('data:'));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">عملاؤنا المميزون</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نفتخر بالتعاون مع أفخم الفنادق العالمية في دبي والإمارات العربية المتحدة
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-mdyafae rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">عملاؤنا المميزون</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نفتخر بالتعاون مع أفخم الفنادق العالمية في دبي والإمارات العربية المتحدة
          </p>
        </div>

        {hotels.length === 0 ? (
          <div className="text-center text-gray-500">
            لا توجد شعارات عملاء لعرضها
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-8">
            {hotels.map((hotel, index) => (
              <motion.div
                key={`${hotel.id}-${timestamp}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative h-20 w-24 flex items-center justify-center">
                    {imagesStatus[hotel.id] === 'loading' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {imagesStatus[hotel.id] === 'error' ? (
                      <EmptyImage alt={hotel.name} className="h-20 w-24" />
                    ) : (
                      <img 
                        src={hotel.logo || '/placeholder.svg'}
                        alt={hotel.name}
                        className={`h-20 w-24 object-contain mx-auto hover:scale-105 transition-all duration-300 ${
                          imagesStatus[hotel.id] === 'loading' ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => handleImageLoad(hotel.id)}
                        onError={() => handleImageError(hotel.id)}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center font-medium">{hotel.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelClients;
