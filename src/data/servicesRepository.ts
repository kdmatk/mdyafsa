import { supabase } from '@/lib/supabase';
import { initialServices, type Service } from '@/data/initialServices';
import {
  getServicesFromStorage,
  saveServicesToStorage,
} from '@/utils/serviceFilters';

const SERVICES_TABLE = 'services';

export type ServicesDataSource = 'supabase' | 'localStorage';

export interface ServicesLoadResult {
  services: Service[];
  source: ServicesDataSource;
}

const getLocalFallback = (): Service[] => {
  const stored = getServicesFromStorage();
  if (stored.length > 0) return stored;

  saveServicesToStorage(initialServices);
  return initialServices;
};

export const loadServices = async (): Promise<ServicesLoadResult> => {
  try {
    const { data, error } = await supabase
      .from(SERVICES_TABLE)
      .select('id,title_ar,title_en,description_ar,description_en,image,active,category_id')
      .order('id', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const services = data as Service[];
      saveServicesToStorage(services);
      return { services, source: 'supabase' };
    }

    if (error) {
      console.warn('[servicesRepository] Supabase unavailable, using local fallback:', error.message);
    }
  } catch (error) {
    console.warn('[servicesRepository] Failed to load from Supabase, using local fallback:', error);
  }

  return { services: getLocalFallback(), source: 'localStorage' };
};

export const updateServiceStatus = async (
  services: Service[],
  id: number,
  active: boolean,
): Promise<ServicesDataSource> => {
  try {
    const { error } = await supabase
      .from(SERVICES_TABLE)
      .update({ active })
      .eq('id', id);

    if (!error) return 'supabase';

    console.warn('[servicesRepository] Supabase status update failed, using local fallback:', error.message);
  } catch (error) {
    console.warn('[servicesRepository] Supabase status update failed, using local fallback:', error);
  }

  saveServicesToStorage(
    services.map((service) => (service.id === id ? { ...service, active } : service)),
  );
  return 'localStorage';
};

export const removeService = async (
  services: Service[],
  id: number,
): Promise<ServicesDataSource> => {
  try {
    const { error } = await supabase
      .from(SERVICES_TABLE)
      .delete()
      .eq('id', id);

    if (!error) return 'supabase';

    console.warn('[servicesRepository] Supabase delete failed, using local fallback:', error.message);
  } catch (error) {
    console.warn('[servicesRepository] Supabase delete failed, using local fallback:', error);
  }

  saveServicesToStorage(services.filter((service) => service.id !== id));
  return 'localStorage';
};

export const resetServices = async (): Promise<ServicesDataSource> => {
  try {
    const { error } = await supabase
      .from(SERVICES_TABLE)
      .upsert(initialServices, { onConflict: 'id' });

    if (!error) {
      saveServicesToStorage(initialServices);
      return 'supabase';
    }

    console.warn('[servicesRepository] Supabase reset failed, using local fallback:', error.message);
  } catch (error) {
    console.warn('[servicesRepository] Supabase reset failed, using local fallback:', error);
  }

  saveServicesToStorage(initialServices);
  return 'localStorage';
};
