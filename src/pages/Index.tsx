
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import OrderSection from '@/components/OrderSection';
import EventSection from '@/components/EventSection';
import UAEMapSection from '@/components/UAEMapSection';
import HotelClients from '@/components/HotelClients';
import NewsTicker from '@/components/NewsTicker';
import { initialServices } from '@/data/initialServices';

const Index = () => {
  // التأكد من وجود البيانات الأولية عند تحميل الصفحة الرئيسية
  useEffect(() => {
    try {
      // تهيئة الخدمات الافتراضية إذا لم تكن موجودة
      const savedServices = localStorage.getItem('adminServices');
      if (!savedServices) {
        localStorage.setItem('adminServices', JSON.stringify(initialServices));
        console.log('تم تهيئة البيانات الافتراضية للخدمات');
      }

      // تهيئة فئات الخدمات الافتراضية إذا لم تكن موجودة
      const savedCategories = localStorage.getItem('serviceCategories');
      if (!savedCategories) {
        const defaultCategories = [
          { id: 1, name_ar: 'توصيل', name_en: 'Delivery' },
          { id: 2, name_ar: 'ضيافة', name_en: 'Hospitality' },
          { id: 3, name_ar: 'مناسبات', name_en: 'Events' },
          { id: 4, name_ar: 'هدايا', name_en: 'Gifts' },
          { id: 5, name_ar: 'أخرى', name_en: 'Others' }
        ];
        localStorage.setItem('serviceCategories', JSON.stringify(defaultCategories));
        console.log('تم تهيئة البيانات الافتراضية للفئات');
      }
    } catch (error) {
      console.error('خطأ في تهيئة البيانات:', error);
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <NewsTicker />
      <Features />
      <UAEMapSection />
      <OrderSection />
      <EventSection />
      <HotelClients />
    </Layout>
  );
};

export default Index;
