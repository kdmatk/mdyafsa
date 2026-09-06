
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageSquare, Clock, Check } from 'lucide-react';
import UAEMap from '@/components/UAEMap';

const ContactItem = ({ icon, title, content, link }: any) => (
  <div className="flex items-start">
    <div className="w-12 h-12 rounded-full bg-mdyafae/10 flex items-center justify-center ml-4 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      {link ? (
        <a href={link} className="text-mdyafae hover:underline">
          {content}
        </a>
      ) : (
        <p className="text-gray-600">{content}</p>
      )}
    </div>
  </div>
);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // إعادة النموذج بعد فترة
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="pt-24 bg-gradient-to-b from-mdyafae-light/10 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-mdyafae/10">
              <span className="text-mdyafae font-semibold text-sm">تواصل معنا</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">نحن هنا لمساعدتك</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              يسعدنا التواصل معك والإجابة على جميع استفساراتك. يمكنك الاتصال بنا مباشرة أو إرسال رسالة وسنقوم بالرد عليك في أقرب وقت ممكن.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactItem 
              icon={<Phone size={24} className="text-mdyafae" />}
              title="اتصل بنا"
              content="920033765"
              link="tel:920033765"
            />
            <ContactItem 
              icon={<Mail size={24} className="text-mdyafae" />}
              title="راسلنا"
              content="info@mdyaf.com"
              link="mailto:info@mdyaf.com"
            />
            <ContactItem 
              icon={<Clock size={24} className="text-mdyafae" />}
              title="ساعات العمل"
              content="جميع أيام الأسبوع، 24 ساعة"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare size={24} className="ml-2 text-mdyafae" />
                أرسل لنا رسالة
              </h2>
              
              {isSubmitted ? (
                <div className="bg-mdyafae/10 text-mdyafae p-6 rounded-xl flex items-center animate-zoom-in">
                  <Check size={24} className="ml-3 text-mdyafae" />
                  <div>
                    <h3 className="font-bold mb-1">تم إرسال رسالتك بنجاح!</h3>
                    <p>سنقوم بالرد عليك في أقرب وقت ممكن. شكراً لتواصلك معنا.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-medium">الاسم</label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك"
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-medium">البريد الإلكتروني</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-medium">رقم الهاتف</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="أدخل رقم هاتفك"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block font-medium">الموضوع</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="موضوع الرسالة"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-medium">الرسالة</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full resize-none"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-mdyafae hover:bg-mdyafae-dark text-white transition-all duration-300 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </Button>
                </form>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin size={24} className="ml-2 text-mdyafae" />
                موقعنا
              </h2>
              <div className="bg-white p-4 rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <UAEMap />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold">فروعنا</h3>
                <div className="space-y-4">
                  {[
                    { city: "دبي", address: "شارع الشيخ زايد، أبراج الإمارات، الطابق 10" },
                    { city: "دبي", address: "شارع الخالدية، برج السلام، الطابق 5" },
                    { city: "الشارقة", address: "شارع الوحدة، برج النور، الطابق 3" }
                  ].map((branch, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                      <h4 className="font-bold">{branch.city}</h4>
                      <p className="text-gray-600">{branch.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
