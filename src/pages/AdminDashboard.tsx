import { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Calendar, Users, ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react';
import { initialServices } from '@/data/initialServices';

const AdminDashboard = () => {
  const [language, setLanguage] = useState('ar');
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const generateFakeBookings = () => {
    const bookings = [];
    for (let i = 0; i < 100; i++) {
      const hoursAgo = Math.floor(Math.random() * 72) + 1;
      bookings.push({
        id: 1000 + i,
        hoursAgo,
        status: Math.random() > 0.3 ? 'new' : 'processing',
      });
    }
    return bookings.sort((a, b) => a.hoursAgo - b.hoursAgo);
  };

  const allBookings = generateFakeBookings();

  const indexOfLastBooking = bookingsPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = allBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const generateServiceStats = () => {
    return initialServices.map(service => {
      const percentage = Math.floor(Math.random() * 35) + 5;
      return {
        name_ar: service.title_ar,
        name_en: service.title_en,
        percentage
      };
    })
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
  };

  const serviceStats = generateServiceStats();

  const getStats = () => {
    if (language === 'ar') {
      return [
        { title: 'إجمالي الخدمات', value: initialServices.length.toString(), icon: <Package className="h-8 w-8 text-mdyafae" />, color: 'bg-blue-50' },
        { title: 'الحجوزات الجديدة', value: allBookings.filter(b => b.status === 'new').length.toString(), icon: <Calendar className="h-8 w-8 text-mdyafae" />, color: 'bg-amber-50' },
        { title: 'المستخدمين النشطين', value: '153', icon: <Users className="h-8 w-8 text-mdyafae" />, color: 'bg-green-50' },
        { title: 'الطلبات اليومية', value: allBookings.filter(b => b.hoursAgo <= 24).length.toString(), icon: <ShoppingCart className="h-8 w-8 text-mdyafae" />, color: 'bg-purple-50' },
      ];
    } else {
      return [
        { title: 'Total Services', value: initialServices.length.toString(), icon: <Package className="h-8 w-8 text-mdyafae" />, color: 'bg-blue-50' },
        { title: 'New Bookings', value: allBookings.filter(b => b.status === 'new').length.toString(), icon: <Calendar className="h-8 w-8 text-mdyafae" />, color: 'bg-amber-50' },
        { title: 'Active Users', value: '153', icon: <Users className="h-8 w-8 text-mdyafae" />, color: 'bg-green-50' },
        { title: 'Daily Orders', value: allBookings.filter(b => b.hoursAgo <= 24).length.toString(), icon: <ShoppingCart className="h-8 w-8 text-mdyafae" />, color: 'bg-purple-50' },
      ];
    }
  };

  const stats = getStats();

  const handleNextPage = () => {
    if (bookingsPage < Math.ceil(allBookings.length / bookingsPerPage)) {
      setBookingsPage(bookingsPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (bookingsPage > 1) {
      setBookingsPage(bookingsPage - 1);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae">
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'مرحبًا بك في لوحة تحكم مضياف الإمارات' 
            : 'Welcome to Mdyafae Emirates Admin Dashboard'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className={`flex flex-row items-center justify-between pb-2 ${stat.color} rounded-t-lg`}>
              <CardTitle className="text-lg font-medium text-gray-700">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'الحجوزات الأخيرة' : 'Recent Bookings'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={bookingsPage === 1}
                className="p-1 rounded-full bg-gray-100 disabled:opacity-50"
              >
                {language === 'ar' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <span className="text-sm text-gray-500">
                {bookingsPage} / {Math.ceil(allBookings.length / bookingsPerPage)}
              </span>
              <button 
                onClick={handleNextPage}
                disabled={bookingsPage === Math.ceil(allBookings.length / bookingsPerPage)}
                className="p-1 rounded-full bg-gray-100 disabled:opacity-50"
              >
                {language === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBookings.map((booking, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className="font-medium">
                      {language === 'ar' 
                        ? `حجز مناسبة #${booking.id}` 
                        : `Event Booking #${booking.id}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' 
                        ? `قبل ${booking.hoursAgo} ${booking.hoursAgo === 1 ? 'ساعة' : 'ساعات'}` 
                        : `${booking.hoursAgo} hour${booking.hoursAgo > 1 ? 's' : ''} ago`}
                    </p>
                  </div>
                  <div className={`flex items-center ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'new' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {language === 'ar' 
                        ? (booking.status === 'new' ? 'جديد' : 'قيد المعالجة') 
                        : (booking.status === 'new' ? 'New' : 'Processing')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'الخدمات الأكثر طلبًا' : 'Most Requested Services'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.map((service, index) => (
                <div key={index} className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      {language === 'ar' ? service.name_ar : service.name_en}
                    </span>
                    <span>{service.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-mdyafae h-2 rounded-full" 
                      style={{ width: `${service.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
