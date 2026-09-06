
import { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Printer, 
  Mail, 
  Phone, 
  MessageSquare, 
  Share, 
  Download,
  Clock,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminBookings = () => {
  const [language, setLanguage] = useState('ar');
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<null | any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [bookingsData, setBookingsData] = useState<any[]>([]);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isDriverDialogOpen, setIsDriverDialogOpen] = useState(false);
  const [isServiceProviderDialogOpen, setIsServiceProviderDialogOpen] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (language === 'ar') {
      setBookingsData([
        { 
          id: 1001, 
          customer: 'أحمد محمد', 
          event: 'حفل زفاف', 
          date: '2023-08-15', 
          status: 'قيد الانتظار',
          location: 'قاعة الفرسان، دبي',
          time: '18:00',
          phone: '+971 50 123 4567',
          email: 'ahmed@example.com',
          notes: 'يحتاج إلى ترتيب خاص للطاولات',
          driver: {
            name: 'محمد علي',
            phone: '+971 54 987 6543',
            vehicle: 'مرسيدس S-Class أبيض'
          },
          serviceProvider: {
            name: 'شركة نور للضيافة',
            contact: 'سعيد خالد',
            phone: '+971 55 555 1234',
            email: 'info@noorhost.ae'
          }
        },
        { 
          id: 1002, 
          customer: 'فاطمة علي', 
          event: 'حفل تخرج', 
          date: '2023-08-20', 
          status: 'مؤكد',
          location: 'جامعة زايد، أبوظبي',
          time: '16:30',
          phone: '+971 50 765 4321',
          email: 'fatima@example.com',
          notes: 'مع خدمة تصوير',
          driver: {
            name: 'خالد عمر',
            phone: '+971 54 123 9876',
            vehicle: 'لكزس ES أسود'
          },
          serviceProvider: {
            name: 'شركة السعادة للمناسبات',
            contact: 'نورة أحمد',
            phone: '+971 55 444 5678',
            email: 'info@saadaevents.ae'
          }
        },
        { 
          id: 1003, 
          customer: 'خالد عبدالله', 
          event: 'اجتماع شركة', 
          date: '2023-08-22', 
          status: 'مؤكد',
          location: 'فندق أرماني، برج خليفة',
          time: '10:00',
          phone: '+971 52 333 9876',
          email: 'khalid@example.com',
          notes: 'اجتماع لمدة 4 ساعات مع استراحة قهوة',
          driver: {
            name: 'عمر سالم',
            phone: '+971 56 789 0123',
            vehicle: 'بي ام دبليو 7-Series رمادي'
          },
          serviceProvider: {
            name: 'مجموعة الفجر للمؤتمرات',
            contact: 'راشد سعيد',
            phone: '+971 50 222 3333',
            email: 'events@fajrgroup.ae'
          }
        },
        { 
          id: 1004, 
          customer: 'مريم أحمد', 
          event: 'عشاء عمل', 
          date: '2023-08-25', 
          status: 'قيد الانتظار',
          location: 'مطعم النافورة، فندق العنوان',
          time: '20:00',
          phone: '+971 56 000 1234',
          email: 'mariam@example.com',
          notes: 'طاولة لـ 8 أشخاص',
          driver: {
            name: 'أحمد يوسف',
            phone: '+971 50 555 7777',
            vehicle: 'أودي A8 أسود'
          },
          serviceProvider: {
            name: 'مطعم النافورة',
            contact: 'فيصل خالد',
            phone: '+971 4 888 9999',
            email: 'reservations@fountain.ae'
          }
        },
        { 
          id: 1005, 
          customer: 'عمر حسن', 
          event: 'حفلة عيد ميلاد', 
          date: '2023-08-30', 
          status: 'ملغي',
          location: 'منتجع باب الشمس الصحراوي',
          time: '17:00',
          phone: '+971 54 444 6666',
          email: 'omar@example.com',
          notes: 'مع كيك عيد ميلاد وتزيين',
          driver: {
            name: 'سالم ناصر',
            phone: '+971 52 111 2222',
            vehicle: 'تويوتا لاندكروزر أبيض'
          },
          serviceProvider: {
            name: 'شركة الفرح للحفلات',
            contact: 'عائشة محمد',
            phone: '+971 55 777 8888',
            email: 'events@farahco.ae'
          }
        },
      ]);
    } else {
      setBookingsData([
        { 
          id: 1001, 
          customer: 'Ahmed Mohammed', 
          event: 'Wedding', 
          date: '2023-08-15', 
          status: 'Pending',
          location: 'Al Fursan Hall, Dubai',
          time: '18:00',
          phone: '+971 50 123 4567',
          email: 'ahmed@example.com',
          notes: 'Special table arrangement needed',
          driver: {
            name: 'Mohammed Ali',
            phone: '+971 54 987 6543',
            vehicle: 'White Mercedes S-Class'
          },
          serviceProvider: {
            name: 'Noor Hospitality',
            contact: 'Saeed Khalid',
            phone: '+971 55 555 1234',
            email: 'info@noorhost.ae'
          }
        },
        { 
          id: 1002, 
          customer: 'Fatima Ali', 
          event: 'Graduation Party', 
          date: '2023-08-20', 
          status: 'Confirmed',
          location: 'Zayed University, Abu Dhabi',
          time: '16:30',
          phone: '+971 50 765 4321',
          email: 'fatima@example.com',
          notes: 'With photography service',
          driver: {
            name: 'Khalid Omar',
            phone: '+971 54 123 9876',
            vehicle: 'Black Lexus ES'
          },
          serviceProvider: {
            name: 'Saada Events Company',
            contact: 'Noora Ahmed',
            phone: '+971 55 444 5678',
            email: 'info@saadaevents.ae'
          }
        },
        { 
          id: 1003, 
          customer: 'Khalid Abdullah', 
          event: 'Company Meeting', 
          date: '2023-08-22', 
          status: 'Confirmed',
          location: 'Armani Hotel, Burj Khalifa',
          time: '10:00',
          phone: '+971 52 333 9876',
          email: 'khalid@example.com',
          notes: '4-hour meeting with coffee break',
          driver: {
            name: 'Omar Salem',
            phone: '+971 56 789 0123',
            vehicle: 'Grey BMW 7-Series'
          },
          serviceProvider: {
            name: 'Fajr Conference Group',
            contact: 'Rashid Saeed',
            phone: '+971 50 222 3333',
            email: 'events@fajrgroup.ae'
          }
        },
        { 
          id: 1004, 
          customer: 'Mariam Ahmed', 
          event: 'Business Dinner', 
          date: '2023-08-25', 
          status: 'Pending',
          location: 'The Fountain Restaurant, Address Hotel',
          time: '20:00',
          phone: '+971 56 000 1234',
          email: 'mariam@example.com',
          notes: 'Table for 8 people',
          driver: {
            name: 'Ahmed Youssef',
            phone: '+971 50 555 7777',
            vehicle: 'Black Audi A8'
          },
          serviceProvider: {
            name: 'The Fountain Restaurant',
            contact: 'Faisal Khalid',
            phone: '+971 4 888 9999',
            email: 'reservations@fountain.ae'
          }
        },
        { 
          id: 1005, 
          customer: 'Omar Hassan', 
          event: 'Birthday Party', 
          date: '2023-08-30', 
          status: 'Cancelled',
          location: 'Bab Al Shams Desert Resort',
          time: '17:00',
          phone: '+971 54 444 6666',
          email: 'omar@example.com',
          notes: 'With birthday cake and decoration',
          driver: {
            name: 'Salem Nasser',
            phone: '+971 52 111 2222',
            vehicle: 'White Toyota Land Cruiser'
          },
          serviceProvider: {
            name: 'Farah Party Company',
            contact: 'Aisha Mohammed',
            phone: '+971 55 777 8888',
            email: 'events@farahco.ae'
          }
        },
      ]);
    }
  }, [language]);

  const getStatusClass = (status: string) => {
    if (language === 'ar') {
      switch (status) {
        case 'مؤكد': return 'bg-green-100 text-green-800';
        case 'قيد الانتظار': return 'bg-amber-100 text-amber-800';
        case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
        case 'تم الدفع': return 'bg-purple-100 text-purple-800';
        case 'ملغي': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (status) {
        case 'Confirmed': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-amber-100 text-amber-800';
        case 'In Progress': return 'bg-blue-100 text-blue-800';
        case 'Paid': return 'bg-purple-100 text-purple-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const handleView = (id: number) => {
    const booking = bookingsData.find(b => b.id === id);
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleConfirm = (id: number) => {
    setBookingsData(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === id) {
          const newStatus = language === 'ar' ? 'مؤكد' : 'Confirmed';
          return {
            ...booking,
            status: newStatus
          };
        }
        return booking;
      })
    );
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({
        ...prev,
        status: language === 'ar' ? 'مؤكد' : 'Confirmed'
      }));
    }
    
    toast({
      title: language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking',
      description: language === 'ar' ? 'تم تأكيد الحجز بنجاح' : 'Booking confirmed successfully',
      variant: 'default',
    });
  };

  const handleCancel = (id: number) => {
    setBookingsData(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === id) {
          return {
            ...booking,
            status: language === 'ar' ? 'ملغي' : 'Cancelled'
          };
        }
        return booking;
      })
    );
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({
        ...selectedBooking,
        status: language === 'ar' ? 'ملغي' : 'Cancelled'
      });
    }
    
    toast({
      title: language === 'ar' ? 'إلغاء الحجز' : 'Cancel Booking',
      description: language === 'ar' ? 'تم إلغاء الحجز بنجاح' : 'Booking cancelled successfully',
      variant: 'destructive',
    });
  };

  const handleMarkInProgress = (id: number) => {
    setBookingsData(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === id) {
          const newStatus = language === 'ar' ? 'قيد التنفيذ' : 'In Progress';
          return {
            ...booking,
            status: newStatus
          };
        }
        return booking;
      })
    );
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({
        ...prev,
        status: language === 'ar' ? 'قيد التنفيذ' : 'In Progress'
      }));
    }
    
    toast({
      title: language === 'ar' ? 'تحديث حالة الحجز' : 'Update Booking Status',
      description: language === 'ar' ? 'تم تحديث حالة الحجز إلى قيد التنفيذ' : 'Booking status updated to In Progress',
      variant: 'default',
    });
  };

  const handleMarkPaid = (id: number) => {
    setBookingsData(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === id) {
          const newStatus = language === 'ar' ? 'تم الدفع' : 'Paid';
          return {
            ...booking,
            status: newStatus
          };
        }
        return booking;
      })
    );
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({
        ...prev,
        status: language === 'ar' ? 'تم الدفع' : 'Paid'
      }));
    }
    
    toast({
      title: language === 'ar' ? 'تحديث حالة الدفع' : 'Update Payment Status',
      description: language === 'ar' ? 'تم تحديث حالة الحجز إلى تم الدفع' : 'Booking status updated to Paid',
      variant: 'default',
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !selectedBooking) return;

    const isAr = language === 'ar';
    
    printWindow.document.write(`
      <html dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <title>${isAr ? 'تفاصيل الحجز' : 'Booking Details'}</title>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            direction: ${isAr ? 'rtl' : 'ltr'};
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 10px;
          }
          h1 {
            color: #724f2f;
            margin-bottom: 20px;
          }
          .booking-info {
            border: 1px solid #ccc;
            padding: 20px;
            margin-bottom: 20px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-label {
            font-weight: bold;
            width: 30%;
          }
          .detail-value {
            width: 70%;
          }
          .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
          }
          .status-confirmed {
            background-color: #e6f4ea;
            color: #137333;
          }
          .status-pending {
            background-color: #fff7e6;
            color: #b06000;
          }
          .status-cancelled {
            background-color: #fce8e6;
            color: #c5221f;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #724f2f;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/lovable-uploads/3ffac020-93b6-44d9-8ee0-c12273fd3bc0.png" alt="MDYAF مضياف">
          <h1>${isAr ? 'تفاصيل الحجز' : 'Booking Details'}</h1>
        </div>
        
        <div class="booking-info">
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'رقم الحجز' : 'Booking ID'}:</div>
            <div class="detail-value">#${selectedBooking.id}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'العميل' : 'Customer'}:</div>
            <div class="detail-value">${selectedBooking.customer}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'المناسبة' : 'Event'}:</div>
            <div class="detail-value">${selectedBooking.event}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'التاريخ' : 'Date'}:</div>
            <div class="detail-value">${selectedBooking.date}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'الوقت' : 'Time'}:</div>
            <div class="detail-value">${selectedBooking.time}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'الموقع' : 'Location'}:</div>
            <div class="detail-value">${selectedBooking.location}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'الحالة' : 'Status'}:</div>
            <div class="detail-value">
              <span class="status ${
                selectedBooking.status === (isAr ? 'مؤكد' : 'Confirmed') ? 'status-confirmed' : 
                selectedBooking.status === (isAr ? 'قيد الانتظار' : 'Pending') ? 'status-pending' : 'status-cancelled'
              }">
                ${selectedBooking.status}
              </span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'رقم الهاتف' : 'Phone'}:</div>
            <div class="detail-value">${selectedBooking.phone}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'البريد الإلكتروني' : 'Email'}:</div>
            <div class="detail-value">${selectedBooking.email}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'ملاحظات' : 'Notes'}:</div>
            <div class="detail-value">${selectedBooking.notes}</div>
          </div>
        </div>
        
        <div class="section-title">${isAr ? 'معلومات السائق' : 'Driver Information'}</div>
        <div class="booking-info">
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'الاسم' : 'Name'}:</div>
            <div class="detail-value">${selectedBooking.driver.name}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'رقم الهاتف' : 'Phone'}:</div>
            <div class="detail-value">${selectedBooking.driver.phone}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'المركبة' : 'Vehicle'}:</div>
            <div class="detail-value">${selectedBooking.driver.vehicle}</div>
          </div>
        </div>
        
        <div class="section-title">${isAr ? 'معلومات مقدم الخدمة' : 'Service Provider Information'}</div>
        <div class="booking-info">
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'الاسم' : 'Name'}:</div>
            <div class="detail-value">${selectedBooking.serviceProvider.name}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'جهة الاتصال' : 'Contact Person'}:</div>
            <div class="detail-value">${selectedBooking.serviceProvider.contact}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'رقم الهاتف' : 'Phone'}:</div>
            <div class="detail-value">${selectedBooking.serviceProvider.phone}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${isAr ? 'البريد الإلكتروني' : 'Email'}:</div>
            <div class="detail-value">${selectedBooking.serviceProvider.email}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${isAr ? 'مضياف - جميع الحقوق محفوظة' : 'MDYAF - All Rights Reserved'}</p>
          <p>${isAr ? 'تم إنشاء هذا التقرير في' : 'This report was generated on'} ${new Date().toLocaleString(isAr ? 'ar-AE' : 'en-US')}</p>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleContactCustomer = (booking: any) => {
    setSelectedBooking(booking);
    setIsContactDialogOpen(true);
  };

  const handleContactDriver = (booking: any) => {
    setSelectedBooking(booking);
    setIsDriverDialogOpen(true);
  };

  const handleContactServiceProvider = (booking: any) => {
    setSelectedBooking(booking);
    setIsServiceProviderDialogOpen(true);
  };

  const handleDownloadBookingDetails = (booking: any) => {
    if (!booking) return;
    
    const isAr = language === 'ar';
    const statusText = booking.status;
    const fileName = `${isAr ? 'حجز' : 'booking'}_${booking.id}.txt`;
    
    let content = `${isAr ? 'تفاصيل الحجز' : 'Booking Details'}\n`;
    content += `===================\n\n`;
    content += `${isAr ? 'رقم الحجز' : 'Booking ID'}: #${booking.id}\n`;
    content += `${isAr ? 'العميل' : 'Customer'}: ${booking.customer}\n`;
    content += `${isAr ? 'المناسبة' : 'Event'}: ${booking.event}\n`;
    content += `${isAr ? 'التاريخ' : 'Date'}: ${booking.date}\n`;
    content += `${isAr ? 'الوقت' : 'Time'}: ${booking.time}\n`;
    content += `${isAr ? 'الموقع' : 'Location'}: ${booking.location}\n`;
    content += `${isAr ? 'الحالة' : 'Status'}: ${statusText}\n`;
    content += `${isAr ? 'رقم الهاتف' : 'Phone'}: ${booking.phone}\n`;
    content += `${isAr ? 'البريد الإلكتروني' : 'Email'}: ${booking.email}\n`;
    content += `${isAr ? 'ملاحظات' : 'Notes'}: ${booking.notes}\n\n`;
    
    content += `${isAr ? 'معلومات السائق' : 'Driver Information'}\n`;
    content += `===================\n`;
    content += `${isAr ? 'الاسم' : 'Name'}: ${booking.driver.name}\n`;
    content += `${isAr ? 'رقم الهاتف' : 'Phone'}: ${booking.driver.phone}\n`;
    content += `${isAr ? 'المركبة' : 'Vehicle'}: ${booking.driver.vehicle}\n\n`;
    
    content += `${isAr ? 'معلومات مقدم الخدمة' : 'Service Provider Information'}\n`;
    content += `===================\n`;
    content += `${isAr ? 'الاسم' : 'Name'}: ${booking.serviceProvider.name}\n`;
    content += `${isAr ? 'جهة الاتصال' : 'Contact Person'}: ${booking.serviceProvider.contact}\n`;
    content += `${isAr ? 'رقم الهاتف' : 'Phone'}: ${booking.serviceProvider.phone}\n`;
    content += `${isAr ? 'البريد الإلكتروني' : 'Email'}: ${booking.serviceProvider.email}\n\n`;
    
    content += `© ${new Date().getFullYear()} ${isAr ? 'مضياف - جميع الحقوق محفوظة' : 'MDYAF - All Rights Reserved'}\n`;
    content += `${isAr ? 'تم إنشاء هذا التقرير في' : 'This report was generated on'} ${new Date().toLocaleString(isAr ? 'ar-AE' : 'en-US')}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: language === 'ar' ? 'تم التنزيل بنجاح' : 'Download Successful',
      description: language === 'ar' ? 'تم تنزيل تفاصيل الحجز بنجاح' : 'Booking details downloaded successfully',
    });
  };

  const handleShareWithDriver = (booking: any) => {
    if (!booking || !booking.driver || !booking.driver.phone) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'رقم هاتف السائق غير متوفر' : 'Driver phone number is not available',
        variant: 'destructive',
      });
      return;
    }
    
    const text = language === 'ar' 
      ? `مرحبًا ${booking.driver.name}، لديك حجز جديد. التفاصيل: العميل: ${booking.customer}، المناسبة: ${booking.event}، التاريخ: ${booking.date}، الوقت: ${booking.time}، الموقع: ${booking.location}`
      : `Hello ${booking.driver.name}, you have a new booking. Details: Customer: ${booking.customer}, Event: ${booking.event}, Date: ${booking.date}, Time: ${booking.time}, Location: ${booking.location}`;
    
    // استخراج الأرقام فقط من رقم الهاتف
    const phoneNumber = booking.driver.phone.replace(/\D/g, '');
    
    // فتح الواتساب مع الرسالة المحددة
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    
    toast({
      title: language === 'ar' ? 'تمت المشاركة مع السائق' : 'Shared with Driver',
      description: language === 'ar' ? 'تم فتح الواتساب لمشاركة تفاصيل الحجز مع السائق' : 'WhatsApp opened to share booking details with the driver',
    });
  };

  const handleShareWithServiceProvider = (booking: any) => {
    if (!booking || !booking.serviceProvider || !booking.serviceProvider.phone) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'رقم هاتف مقدم الخدمة غير متوفر' : 'Service provider phone number is not available',
        variant: 'destructive',
      });
      return;
    }
    
    const text = language === 'ar' 
      ? `مرحبًا ${booking.serviceProvider.contact}، لديك حجز جديد. التفاصيل: العميل: ${booking.customer}، المناسبة: ${booking.event}، التاريخ: ${booking.date}، الوقت: ${booking.time}، الموقع: ${booking.location}`
      : `Hello ${booking.serviceProvider.contact}, you have a new booking. Details: Customer: ${booking.customer}, Event: ${booking.event}, Date: ${booking.date}, Time: ${booking.time}, Location: ${booking.location}`;
    
    // استخراج الأرقام فقط من رقم الهاتف
    const phoneNumber = booking.serviceProvider.phone.replace(/\D/g, '');
    
    // فتح الواتساب مع الرسالة المحددة
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    
    toast({
      title: language === 'ar' ? 'تمت المشاركة مع مقدم الخدمة' : 'Shared with Service Provider',
      description: language === 'ar' ? 'تم فتح الواتساب لمشاركة تفاصيل الحجز مع مقدم الخدمة' : 'WhatsApp opened to share booking details with the service provider',
    });
  };

  return (
    <AdminDashboardLayout>
      <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">
          {language === 'ar' ? 'إدارة الحجوزات' : 'Bookings Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'عرض وإدارة حجوزات العملاء' 
            : 'View and manage customer bookings'}
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'قائمة الحجوزات' : 'Bookings List'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'رقم الحجز' : 'ID'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'المناسبة' : 'Event'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-500 ${language === 'ar' ? 'text-center' : 'text-center'}`}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className={`p-3 text-sm text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      #{booking.id}
                    </td>
                    <td className={`p-3 text-sm text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {booking.customer}
                    </td>
                    <td className={`p-3 text-sm text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {booking.event}
                    </td>
                    <td className={`p-3 text-sm text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {booking.date}
                    </td>
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleView(booking.id)}
                          className="px-2"
                        >
                          <Eye size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                          {language === 'ar' ? 'عرض' : 'View'}
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="px-2"
                            >
                              {language === 'ar' ? 'إجراءات' : 'Actions'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'}>
                            <DropdownMenuItem 
                              onClick={() => handleConfirm(booking.id)}
                              className="cursor-pointer"
                            >
                              <CheckCircle size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-green-500`} />
                              {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleCancel(booking.id)}
                              className="cursor-pointer"
                            >
                              <XCircle size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-red-500`} />
                              {language === 'ar' ? 'إلغاء الحجز' : 'Cancel Booking'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleMarkInProgress(booking.id)}
                              className="cursor-pointer"
                            >
                              <Clock size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-blue-500`} />
                              {language === 'ar' ? 'قيد التنفيذ' : 'Mark In Progress'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleMarkPaid(booking.id)}
                              className="cursor-pointer"
                            >
                              <CreditCard size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-purple-500`} />
                              {language === 'ar' ? 'تم الدفع' : 'Mark as Paid'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleContactCustomer(booking)}
                              className="cursor-pointer"
                            >
                              <Phone size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-500`} />
                              {language === 'ar' ? 'الاتصال بالعميل' : 'Contact Customer'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleContactDriver(booking)}
                              className="cursor-pointer"
                            >
                              <MessageSquare size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-500`} />
                              {language === 'ar' ? 'الاتصال بالسائق' : 'Contact Driver'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleContactServiceProvider(booking)}
                              className="cursor-pointer"
                            >
                              <Mail size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-500`} />
                              {language === 'ar' ? 'الاتصال بمقدم الخدمة' : 'Contact Provider'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleShareWithDriver(booking)}
                              className="cursor-pointer"
                            >
                              <Share size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-green-500`} />
                              {language === 'ar' ? 'مشاركة مع السائق' : 'Share with Driver'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleShareWithServiceProvider(booking)}
                              className="cursor-pointer"
                            >
                              <Share size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-blue-500`} />
                              {language === 'ar' ? 'مشاركة مع مقدم الخدمة' : 'Share with Provider'}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleDownloadBookingDetails(booking)}
                              className="cursor-pointer"
                            >
                              <Download size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-500`} />
                              {language === 'ar' ? 'تنزيل التفاصيل' : 'Download Details'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={language === 'ar' ? 'text-right' : 'text-left'}>
              {language === 'ar' ? `تفاصيل الحجز #${selectedBooking?.id}` : `Booking Details #${selectedBooking?.id}`}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mdyafae-dark">
                    {language === 'ar' ? 'معلومات الحجز' : 'Booking Information'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'العميل:' : 'Customer:'}
                      </span>
                      <span>{selectedBooking.customer}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'المناسبة:' : 'Event:'}
                      </span>
                      <span>{selectedBooking.event}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'التاريخ:' : 'Date:'}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.date}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الوقت:' : 'Time:'}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الموقع:' : 'Location:'}
                      </span>
                      <span>{selectedBooking.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الحالة:' : 'Status:'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mdyafae-dark">
                    {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الهاتف:' : 'Phone:'}
                      </span>
                      <span className="flex items-center">
                        <Phone size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'البريد:' : 'Email:'}
                      </span>
                      <span className="flex items-center">
                        <Mail size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.email}
                      </span>
                    </div>
                    <div className="flex">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'ملاحظات:' : 'Notes:'}
                      </span>
                      <span>{selectedBooking.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mdyafae-dark">
                    {language === 'ar' ? 'معلومات السائق' : 'Driver Information'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الاسم:' : 'Name:'}
                      </span>
                      <span>{selectedBooking.driver.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الهاتف:' : 'Phone:'}
                      </span>
                      <span className="flex items-center">
                        <Phone size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.driver.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'المركبة:' : 'Vehicle:'}
                      </span>
                      <span>{selectedBooking.driver.vehicle}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mdyafae-dark">
                    {language === 'ar' ? 'معلومات مقدم الخدمة' : 'Provider Information'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الاسم:' : 'Name:'}
                      </span>
                      <span>{selectedBooking.serviceProvider.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'جهة الاتصال:' : 'Contact:'}
                      </span>
                      <span>{selectedBooking.serviceProvider.contact}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'الهاتف:' : 'Phone:'}
                      </span>
                      <span className="flex items-center">
                        <Phone size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.serviceProvider.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium ${language === 'ar' ? 'ml-2' : 'mr-2'} w-28`}>
                        {language === 'ar' ? 'البريد:' : 'Email:'}
                      </span>
                      <span className="flex items-center">
                        <Mail size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'} text-mdyafae`} />
                        {selectedBooking.serviceProvider.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className={`${language === 'ar' ? 'justify-start' : 'justify-end'} flex-wrap gap-2`}>
                <Button 
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
                <Button 
                  variant="success"
                  onClick={() => handleConfirm(selectedBooking.id)}
                >
                  <CheckCircle size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(selectedBooking.id)}
                >
                  <XCircle size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'إلغاء الحجز' : 'Cancel Booking'}
                </Button>
                <Button 
                  variant="info"
                  onClick={() => handleMarkInProgress(selectedBooking.id)}
                >
                  <Clock size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'قيد التنفيذ' : 'Mark In Progress'}
                </Button>
                <Button 
                  variant="payment"
                  onClick={() => handleMarkPaid(selectedBooking.id)}
                >
                  <CreditCard size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'تم الدفع' : 'Mark as Paid'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handlePrint}
                >
                  <Printer size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'طباعة' : 'Print'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Customer Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={language === 'ar' ? 'text-right' : 'text-left'}>
              {language === 'ar' ? 'الاتصال بالعميل' : 'Contact Customer'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <div className="space-y-4 my-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </span>
                  <span className="font-medium">{selectedBooking.customer}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </span>
                  <div className="flex items-center">
                    <span className="font-medium">{selectedBooking.phone}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => window.open(`tel:${selectedBooking.phone.replace(/\s/g, '')}`)}
                      className="ml-2"
                    >
                      <Phone size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const phoneNumber = selectedBooking.phone.replace(/\D/g, '');
                        window.open(`https://wa.me/${phoneNumber}`, '_blank');
                      }}
                      className="ml-2"
                    >
                      <MessageSquare size={16} className="text-green-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </span>
                  <div className="flex items-center">
                    <span className="font-medium">{selectedBooking.email}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => window.open(`mailto:${selectedBooking.email}`)}
                      className="ml-2"
                    >
                      <Mail size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter className={`${language === 'ar' ? 'justify-start' : 'justify-end'} flex-wrap gap-2 pt-2`}>
                <Button 
                  variant="outline"
                  onClick={() => setIsContactDialogOpen(false)}
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Driver Dialog */}
      <Dialog open={isDriverDialogOpen} onOpenChange={setIsDriverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={language === 'ar' ? 'text-right' : 'text-left'}>
              {language === 'ar' ? 'الاتصال بالسائق' : 'Contact Driver'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <div className="space-y-4 my-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'السائق' : 'Driver'}
                  </span>
                  <span className="font-medium">{selectedBooking.driver.name}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </span>
                  <div className="flex items-center">
                    <span className="font-medium">{selectedBooking.driver.phone}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => window.open(`tel:${selectedBooking.driver.phone.replace(/\s/g, '')}`)}
                      className="ml-2"
                    >
                      <Phone size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const phoneNumber = selectedBooking.driver.phone.replace(/\D/g, '');
                        window.open(`https://wa.me/${phoneNumber}`, '_blank');
                      }}
                      className="ml-2"
                    >
                      <MessageSquare size={16} className="text-green-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'المركبة' : 'Vehicle'}
                  </span>
                  <span className="font-medium">{selectedBooking.driver.vehicle}</span>
                </div>
              </div>
              
              <DialogFooter className={`${language === 'ar' ? 'justify-start' : 'justify-end'} flex-wrap gap-2 pt-2`}>
                <Button 
                  variant="outline"
                  onClick={() => setIsDriverDialogOpen(false)}
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
                <Button 
                  onClick={() => handleShareWithDriver(selectedBooking)}
                >
                  <Share size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'مشاركة تفاصيل الحجز' : 'Share Booking Details'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Service Provider Dialog */}
      <Dialog open={isServiceProviderDialogOpen} onOpenChange={setIsServiceProviderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={language === 'ar' ? 'text-right' : 'text-left'}>
              {language === 'ar' ? 'الاتصال بمقدم الخدمة' : 'Contact Service Provider'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <div className="space-y-4 my-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'مقدم الخدمة' : 'Service Provider'}
                  </span>
                  <span className="font-medium">{selectedBooking.serviceProvider.name}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'جهة الاتصال' : 'Contact Person'}
                  </span>
                  <span className="font-medium">{selectedBooking.serviceProvider.contact}</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </span>
                  <div className="flex items-center">
                    <span className="font-medium">{selectedBooking.serviceProvider.phone}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => window.open(`tel:${selectedBooking.serviceProvider.phone.replace(/\s/g, '')}`)}
                      className="ml-2"
                    >
                      <Phone size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const phoneNumber = selectedBooking.serviceProvider.phone.replace(/\D/g, '');
                        window.open(`https://wa.me/${phoneNumber}`, '_blank');
                      }}
                      className="ml-2"
                    >
                      <MessageSquare size={16} className="text-green-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </span>
                  <div className="flex items-center">
                    <span className="font-medium">{selectedBooking.serviceProvider.email}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => window.open(`mailto:${selectedBooking.serviceProvider.email}`)}
                      className="ml-2"
                    >
                      <Mail size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter className={`${language === 'ar' ? 'justify-start' : 'justify-end'} flex-wrap gap-2 pt-2`}>
                <Button 
                  variant="outline"
                  onClick={() => setIsServiceProviderDialogOpen(false)}
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
                <Button 
                  onClick={() => handleShareWithServiceProvider(selectedBooking)}
                >
                  <Share size={16} className={`${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {language === 'ar' ? 'مشاركة تفاصيل الحجز' : 'Share Booking Details'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default AdminBookings;
