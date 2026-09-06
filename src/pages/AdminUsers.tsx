
import { useState, useEffect } from 'react';
import AdminDashboardLayout from '@/components/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Edit, Trash, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const [language, setLanguage] = useState('ar');
  const { toast } = useToast();

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Mock data for users
  const users = language === 'ar' 
    ? [
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+971 50 123 4567', role: 'عميل' },
        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', phone: '+971 55 234 5678', role: 'عميل' },
        { id: 3, name: 'محمد خالد', email: 'mohammed@example.com', phone: '+971 52 345 6789', role: 'مدير' },
        { id: 4, name: 'نورة عبدالله', email: 'noura@example.com', phone: '+971 54 456 7890', role: 'عميل' },
        { id: 5, name: 'عمر سالم', email: 'omar@example.com', phone: '+971 56 567 8901', role: 'عميل' },
      ]
    : [
        { id: 1, name: 'Ahmed Mohammed', email: 'ahmed@example.com', phone: '+971 50 123 4567', role: 'Customer' },
        { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', phone: '+971 55 234 5678', role: 'Customer' },
        { id: 3, name: 'Mohammed Khalid', email: 'mohammed@example.com', phone: '+971 52 345 6789', role: 'Admin' },
        { id: 4, name: 'Noura Abdullah', email: 'noura@example.com', phone: '+971 54 456 7890', role: 'Customer' },
        { id: 5, name: 'Omar Salem', email: 'omar@example.com', phone: '+971 56 567 8901', role: 'Customer' },
      ];

  const handleAdd = () => {
    toast({
      title: language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User',
      description: language === 'ar' ? 'هذه الوظيفة قيد التطوير' : 'This functionality is under development',
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: language === 'ar' ? 'تعديل المستخدم' : 'Edit User',
      description: language === 'ar' ? 'هذه الوظيفة قيد التطوير' : 'This functionality is under development',
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: language === 'ar' ? 'حذف المستخدم' : 'Delete User',
      description: language === 'ar' ? 'هذه الوظيفة قيد التطوير' : 'This functionality is under development',
      variant: 'destructive',
    });
  };

  return (
    <AdminDashboardLayout>
      <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-mdyafae-dark">
          {language === 'ar' ? 'إدارة المستخدمين' : 'Users Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'عرض وإدارة مستخدمي النظام والعملاء' 
            : 'View and manage system users and customers'}
        </p>
      </div>

      <div className="flex justify-between mb-6">
        <Button 
          onClick={handleAdd} 
          className="bg-mdyafae hover:bg-mdyafae-dark"
        >
          <UserPlus size={18} />
          <span>{language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}</span>
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'قائمة المستخدمين' : 'Users List'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'المعرف' : 'ID'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'الدور' : 'Role'}
                  </th>
                  <th className={`p-3 text-sm font-medium text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      #{user.id}
                    </td>
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center">
                        <User size={16} className={`text-mdyafae ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {user.name}
                      </div>
                    </td>
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center">
                        <Mail size={16} className={`text-mdyafae ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {user.email}
                      </div>
                    </td>
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center">
                        <Phone size={16} className={`text-mdyafae ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                        {user.phone}
                      </div>
                    </td>
                    <td className={`p-3 text-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'مدير' || user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className={`flex gap-2 ${language === 'ar' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user.id)}
                          className="text-amber-600 border-amber-600 hover:bg-amber-50"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminDashboardLayout>
  );
};

export default AdminUsers;
