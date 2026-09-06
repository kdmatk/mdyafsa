
/**
 * التأكد من أن مسار الصورة هو مسار مطلق صالح
 */
export const ensureAbsoluteUrl = (url: string): string => {
  if (!url) return "";
  
  try {
    // إذا كان المسار يبدأ بـ data:image فهو بالفعل مسار كامل للصورة
    if (url.startsWith('data:image')) {
      return url;
    }
    
    // التعامل مع الدومين الجديد والقديم
    if (url.includes('mdyaf.ae') || url.includes('mdyafae.com')) {
      // للتأكد من وجود https:// في بداية الرابط
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://mdyaf.ae/${url.replace(/^\/+/, '')}`;
      }
      
      // تحويل الدومين القديم إلى الجديد إذا كان مطلوبًا
      if (url.includes('mdyafae.com')) {
        return url.replace('mdyafae.com', 'mdyaf.ae');
      }
      
      // إذا كان الرابط يبدأ بـ http:// أو https:// أعده كما هو
      return url;
    }
    
    // إذا كان المسار مطلقًا بالفعل مع http أو https، أعده كما هو
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // حذف أي سلاشات زائدة في البداية للتأكد من عدم تكرارها
    const cleanUrl = url.replace(/^\/+/, '');
    
    // إذا كان المسار نسبيًا، أضف عنوان الموقع الرئيسي
    const baseUrl = window.location.origin;
    return `${baseUrl}/${cleanUrl}`;
  } catch (error) {
    console.error("خطأ في معالجة مسار الصورة:", error, "المسار الأصلي:", url);
    return url;
  }
};
