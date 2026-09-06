
import { useState } from 'react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceHeader from '@/components/services/ServiceHeader';
import ServiceCategoryTabs from '@/components/services/ServiceCategoryTabs';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import { useLanguage } from '@/hooks/useLanguage';
import { useServiceData } from '@/hooks/useServiceData';
import { getFilteredServices } from '@/utils/serviceFilters';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { language } = useLanguage();
  const { services, categories, tabLabels, isLoading } = useServiceData(language);

  // تصفية الخدمات بناءً على التبويب النشط
  const filteredServices = getFilteredServices(services, activeTab, language);

  return (
    <Layout>
      <div className="pt-24 bg-gradient-to-b from-mdyafae-light/10 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ServiceHeader />
          
          <ServiceCategoryTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabLabels={tabLabels}
            categories={categories}
            language={language}
            isLoading={isLoading}
          />
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">
                  {language === 'ar' ? 'جاري تحميل الخدمات...' : 'Loading services...'}
                </p>
              </div>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} language={language} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {language === 'ar' ? 'لا توجد خدمات متاحة في هذه الفئة' : 'No services available in this category'}
              </p>
              {services.length === 0 && (
                <div className="inline-block p-4 bg-yellow-50 border border-yellow-200 rounded-md mt-4">
                  <p className="text-yellow-700">
                    {language === 'ar' 
                      ? 'لم يتم العثور على أي خدمات. يرجى التحقق من الإعدادات.' 
                      : 'No services found. Please check settings.'}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <ServiceFAQ language={language} />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
