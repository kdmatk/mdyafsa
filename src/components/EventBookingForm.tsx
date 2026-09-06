
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { useTranslation } from '@/utils/translations';

const EventBookingForm = () => {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const isRtl = language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    location: '',
    date: '',
    time: '',
    guests: '',
    notes: ''
  });
  
  // Available event types - Bi-lingual versions
  const eventTypes = isRtl ? [
    'حفل زفاف',
    'حفل خطوبة',
    'عيد ميلاد',
    'اجتماع عمل',
    'مؤتمر',
    'معرض',
    'حفل تخرج',
    'مناسبة خاصة أخرى'
  ] : [
    'Wedding',
    'Engagement Party',
    'Birthday',
    'Business Meeting',
    'Conference',
    'Exhibition',
    'Graduation Party',
    'Other Special Occasion'
  ];
  
  // Available locations - Bi-lingual versions
  const locations = isRtl ? [
    'أبو ظبي',
    'دبي',
    'الشارقة',
    'عجمان',
    'رأس الخيمة',
    'الفجيرة',
    'أم القيوين'
  ] : [
    'Abu Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain'
  ];

  // Available time slots
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];

  // Available dates (next 30 days)
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const displayDate = format(date, 'dd/MM/yyyy');
      
      options.push({
        value: formattedDate,
        label: displayDate
      });
    }
    
    return options;
  };
  
  const dateOptions = generateDateOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const message = isRtl ? 
      `طلب حجز مناسبة جديد:
الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
نوع المناسبة: ${formData.eventType}
عدد الضيوف: ${formData.guests}
التاريخ: ${formData.date}
الوقت: ${formData.time}
الموقع: ${formData.location}
ملاحظات: ${formData.notes}` :
      `New Event Booking Request:
Name: ${formData.name}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Number of Guests: ${formData.guests}
Date: ${formData.date}
Time: ${formData.time}
Location: ${formData.location}
Notes: ${formData.notes}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/971564656166?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: isRtl ? "تم إرسال طلبك بنجاح" : "Your request has been sent successfully",
      description: isRtl ? "سيتم تحويلك إلى واتساب للتواصل المباشر مع فريقنا" : "You will be redirected to WhatsApp for direct communication with our team",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-mdyafae to-mdyafae-dark p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">{t('bookYourEvent')}</h3>
        <p className="opacity-90">{t('makeItSpecial')}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-3 md:col-span-2 mb-2">
            <Users className="text-mdyafae" />
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Input
              type="text"
              placeholder={t('fullName')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20"
              required
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Input
              type="tel"
              placeholder={t('phoneNumber')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-3 md:col-span-2 mb-2">
            <Clock className="text-mdyafae" />
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Select
              value={formData.eventType}
              onValueChange={(value) => setFormData({ ...formData, eventType: value })}
            >
              <SelectTrigger className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20">
                <SelectValue placeholder={t('eventType')} />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Input
              type="number"
              placeholder={t('numberOfGuests')}
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-3 md:col-span-2 mb-2">
            <Clock className="text-mdyafae" />
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Select
              value={formData.date}
              onValueChange={(value) => setFormData({ ...formData, date: value })}
            >
              <SelectTrigger className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20">
                <SelectValue placeholder={t('eventDate')} />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Select
              value={formData.time}
              onValueChange={(value) => setFormData({ ...formData, time: value })}
            >
              <SelectTrigger className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20">
                <SelectValue placeholder={t('eventTime')} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <MapPin className="text-mdyafae" />
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <Select
            value={formData.location}
            onValueChange={(value) => setFormData({ ...formData, location: value })}
          >
            <SelectTrigger className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20">
              <SelectValue placeholder={t('eventLocation')} />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder={t('additionalNotes')}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-mdyafae/20 min-h-[100px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <Button
            type="submit"
            className="bg-gradient-to-r from-mdyafae to-mdyafae-dark hover:from-mdyafae-dark hover:to-mdyafae text-white px-8 py-6 text-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Send className={isRtl ? "ml-2 -mr-1" : "mr-2 -ml-1"} />
            {t('contactOnWhatsapp')}
          </Button>
          
          <div className="text-sm text-gray-500 text-center max-w-2xl">
            <p>{t('bookingNotes')}</p>
            <p>{t('confirmationNote')}</p>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default EventBookingForm;
