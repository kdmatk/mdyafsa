
// البيانات الأولية للخدمات
export const initialServices = [
  {
    id: 1,
    title_ar: "توصيل الطعام",
    title_en: "Food Delivery",
    description_ar: "خدمة توصيل سريعة وموثوقة لجميع طلبات الطعام في أنحاء الإمارات",
    description_en: "Fast and reliable delivery service for all food orders across the UAE",
    image: "/lovable-uploads/0a9b6bbf-7102-49f0-9306-1a6fa2363617.png",
    active: true,
    category_id: 2
  },
  {
    id: 2,
    title_ar: "تنظيم المناسبات",
    title_en: "Event Organization",
    description_ar: "خدمات متكاملة لتنظيم المناسبات والحفلات بمختلف أنواعها وأحجامها",
    description_en: "Comprehensive services for organizing events and parties of all types and sizes",
    image: "/lovable-uploads/caed902d-5798-4634-ad3a-6fa71ea8f54b.png",
    active: true,
    category_id: 3
  },
  {
    id: 3,
    title_ar: "خدمات الضيافة",
    title_en: "Hospitality Services",
    description_ar: "خدمات ضيافة احترافية لجميع المناسبات والاجتماعات",
    description_en: "Professional hospitality services for all events and meetings",
    image: "/lovable-uploads/df88d9e0-595c-42ad-8a5c-c5ea09b548a2.png",
    active: true,
    category_id: 1
  },
  {
    id: 4,
    title_ar: "خدمات التنظيف",
    title_en: "Cleaning Services",
    description_ar: "خدمات تنظيف احترافية للمنازل والمكاتب والشركات",
    description_en: "Professional cleaning services for homes, offices and companies",
    image: "/lovable-uploads/6579cc70-c80f-404a-8e94-1800d7b724fa.png",
    active: true,
    category_id: 5
  },
  {
    id: 5,
    title_ar: "خدمات النقل",
    title_en: "Transportation Services",
    description_ar: "خدمات نقل آمنة وموثوقة للأفراد والمجموعات",
    description_en: "Safe and reliable transportation services for individuals and groups",
    image: "/lovable-uploads/a9305bb5-8145-4626-8218-e153e768239d.png",
    active: true,
    category_id: 2
  },
  {
    id: 6,
    title_ar: "خدمات المؤتمرات",
    title_en: "Conference Services",
    description_ar: "تنظيم وإدارة المؤتمرات والاجتماعات الكبيرة",
    description_en: "Organization and management of conferences and large meetings",
    image: "/lovable-uploads/bb186c9a-b065-4e4b-b472-51f4eaf87311.png",
    active: true,
    category_id: 3
  },
  {
    id: 7,
    title_ar: "باقات الورود",
    title_en: "Flower Bouquets",
    description_ar: "تشكيلة متنوعة من أجمل باقات الورود الطبيعية للمناسبات والهدايا",
    description_en: "A variety of the most beautiful natural flower bouquets for occasions and gifts",
    image: "/lovable-uploads/ba6940ee-d70d-4359-8e02-7becb6e5784d.png",
    active: true,
    category_id: 4
  },
  {
    id: 8,
    title_ar: "الهدايا المميزة",
    title_en: "Special Gifts",
    description_ar: "مجموعة فاخرة من الهدايا المميزة والفريدة لجميع المناسبات",
    description_en: "A luxury collection of special and unique gifts for all occasions",
    image: "/lovable-uploads/1a02044e-4620-4b63-9e3f-11eab0115e9a.png",
    active: true,
    category_id: 4
  }
];

// تحديد نوع Service
export interface Service {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  active: boolean;
  category_id: number;
}
