import { useEffect, useState } from 'react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import ServicesToolbar from '@/components/admin/ServicesToolbar';
import ServicesTable from '@/components/admin/ServicesTable';
import { initialServices, type Service } from '@/data/initialServices';
import {
  loadServices,
  removeService,
  resetServices,
  updateServiceStatus,
  type ServicesDataSource,
} from '@/data/servicesRepository';

const AdminServices = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [dataSource, setDataSource] = useState<ServicesDataSource>('localStorage');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const fetchServices = async () => {
      setIsLoading(true);

      try {
        const result = await loadServices();
        if (!mounted) return;

        setServices(result.services);
        setFilteredServices(result.services);
        setDataSource(result.source);
      } catch (error) {
        console.error('[AdminServices] Failed to load services:', error);
        if (!mounted) return;

        setServices(initialServices);
        setFilteredServices(initialServices);
        setDataSource('localStorage');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void fetchServices();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (services.length === 0) {
      setFilteredServices([]);
      return;
    }

    if (searchTerm.trim() === '') {
      setFilteredServices(services);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    setFilteredServices(
      services.filter((service) =>
        service.title_ar?.toLowerCase().includes(searchLower) ||
        service.title_en?.toLowerCase().includes(searchLower) ||
        service.description_ar?.toLowerCase().includes(searchLower) ||
        service.description_en?.toLowerCase().includes(searchLower),
      ),
    );
  }, [services, searchTerm]);

  const toggleServiceStatus = async (id: number) => {
    const current = services.find((service) => service.id === id);
    if (!current) return;

    const nextActive = !current.active;
    const nextServices = services.map((service) =>
      service.id === id ? { ...service, active: nextActive } : service,
    );

    setServices(nextServices);
    const source = await updateServiceStatus(services, id, nextActive);
    setDataSource(source);

    toast({
      title: language === 'ar' ? 'تم تحديث الحالة' : 'Status Updated',
      description:
        language === 'ar'
          ? source === 'supabase'
            ? 'تم حفظ حالة الخدمة في قاعدة البيانات'
            : 'تم حفظ الحالة محليًا مؤقتًا حتى يكتمل اتصال قاعدة البيانات'
          : source === 'supabase'
            ? 'Service status saved to the database'
            : 'Status saved locally until the database connection is available',
    });
  };

  const deleteService = async (id: number) => {
    const confirmed = window.confirm(
      language === 'ar'
        ? 'هل أنت متأكد من حذف هذه الخدمة؟'
        : 'Are you sure you want to delete this service?',
    );

    if (!confirmed) return;

    const source = await removeService(services, id);
    setServices((current) => current.filter((service) => service.id !== id));
    setDataSource(source);

    toast({
      title: language === 'ar' ? 'تم الحذف' : 'Deleted',
      description:
        language === 'ar'
          ? source === 'supabase'
            ? 'تم حذف الخدمة من قاعدة البيانات'
            : 'تم حذف الخدمة محليًا مؤقتًا'
          : source === 'supabase'
            ? 'Service deleted from the database'
            : 'Service deleted locally for now',
    });
  };

  const resetToInitialServices = async () => {
    setIsLoading(true);

    try {
      const source = await resetServices();
      setServices(initialServices);
      setFilteredServices(initialServices);
      setDataSource(source);

      toast({
        title: language === 'ar' ? 'تم إعادة التعيين' : 'Reset Completed',
        description:
          language === 'ar'
            ? source === 'supabase'
              ? 'تمت إعادة الخدمات الافتراضية في قاعدة البيانات'
              : 'تمت إعادة الخدمات محليًا مؤقتًا'
            : source === 'supabase'
              ? 'Default services restored in the database'
              : 'Default services restored locally for now',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-3 text-xs text-gray-500">
        {language === 'ar' ? 'مصدر البيانات: ' : 'Data source: '}
        <span className="font-medium">
          {dataSource === 'supabase' ? 'Supabase' : 'Local fallback'}
        </span>
      </div>

      <ServicesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="rounded-md bg-gray-100 p-4 text-center">
            <p className="text-gray-600">
              {language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...'}
            </p>
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-4 rounded-md">
          <p className="text-yellow-700">
            {language === 'ar'
              ? 'لم يتم العثور على خدمات.'
              : 'No services found.'}
          </p>
          <button
            onClick={() => void resetToInitialServices()}
            className="mt-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-1 px-3 rounded text-sm"
          >
            {language === 'ar' ? 'إعادة تعيين الخدمات' : 'Reset Services'}
          </button>
        </div>
      ) : null}

      <ServicesTable
        services={filteredServices}
        onDeleteService={(id) => void deleteService(id)}
        onToggleStatus={(id) => void toggleServiceStatus(id)}
      />

      {!isLoading && filteredServices.length === 0 && services.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          {language === 'ar'
            ? 'لا توجد خدمات تطابق كلمة البحث'
            : 'No services match your search term'}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => void resetToInitialServices()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm"
        >
          {language === 'ar'
            ? 'إعادة تعيين البيانات للحالة الافتراضية'
            : 'Reset to default data'}
        </button>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminServices;
