import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BriefcaseBusiness, Building2, Headphones, ShoppingBag, AlertTriangle, ArrowLeft, Activity } from 'lucide-react';

type Stats={projects:number;clients:number;tickets:number;orders:number;urgent:number};
type Ticket={id:string;subject:string;status:string;priority:string;name:string;created_at:string};

export default function AdminDashboard(){
 const [stats,setStats]=useState<Stats>({projects:0,clients:0,tickets:0,orders:0,urgent:0});
 const [tickets,setTickets]=useState<Ticket[]>([]);
 const [projects,setProjects]=useState<any[]>([]);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{
  const [p,c,t,o,rt,rp]=await Promise.all([
   supabase.from('tech_projects').select('*',{count:'exact',head:true}),
   supabase.from('clients').select('*',{count:'exact',head:true}),
   supabase.from('support_tickets').select('*',{count:'exact',head:true}).in('status',['open','in_progress']),
   supabase.from('service_orders').select('*',{count:'exact',head:true}).in('status',['new','quoted','approved','in_progress']),
   supabase.from('support_tickets').select('id,subject,status,priority,name,created_at').order('created_at',{ascending:false}).limit(6),
   supabase.from('tech_projects').select('id,name,status,priority,progress,due_date').order('updated_at',{ascending:false}).limit(6)
  ]);
  const urgent=(rt.data||[]).filter((x:any)=>x.priority==='critical'||x.priority==='high').length;
  setStats({projects:p.count||0,clients:c.count||0,tickets:t.count||0,orders:o.count||0,urgent});
  setTickets((rt.data||[]) as Ticket[]); setProjects(rp.data||[]); setLoading(false);
 })()},[]);
 const cards=[
  {title:'المشاريع التقنية',value:stats.projects,icon:BriefcaseBusiness,to:'/mdyafae/projects',hint:'إدارة التطوير والتسليم'},
  {title:'العملاء',value:stats.clients,icon:Building2,to:'/mdyafae/clients',hint:'ملفات العملاء والمتابعة'},
  {title:'التذاكر المفتوحة',value:stats.tickets,icon:Headphones,to:'/mdyafae/tickets',hint:'الدعم الفني والتقني'},
  {title:'الطلبات النشطة',value:stats.orders,icon:ShoppingBag,to:'/mdyafae/orders',hint:'طلبات الخدمات والتنفيذ'},
 ];
 const label=(s:string)=>({planning:'تخطيط',design:'تصميم',development:'تطوير',testing:'اختبار',live:'منشور',maintenance:'صيانة',paused:'متوقف',open:'مفتوحة',in_progress:'قيد المعالجة',resolved:'تم الحل',closed:'مغلقة'} as any)[s]||s;
 return <div className="space-y-7" dir="rtl">
  <div className="rounded-2xl bg-slate-950 text-white p-6 md:p-8 overflow-hidden relative">
   <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-white/5"/>
   <div className="relative"><div className="flex items-center gap-2 text-slate-300 text-sm mb-2"><Activity size={16}/> مركز عمليات مضياف التقنية</div><h1 className="text-2xl md:text-3xl font-bold">إدارة الشركة من لوحة واحدة</h1><p className="text-slate-300 mt-2 max-w-2xl">تابع المشاريع والعملاء وطلبات الخدمات وتذاكر الدعم الفني، مع رؤية تشغيلية واضحة لحالة العمل.</p></div>
  </div>
  {stats.urgent>0&&<div className="border border-amber-200 bg-amber-50 rounded-xl p-4 flex items-center gap-3"><AlertTriangle className="text-amber-600"/><div><b>{stats.urgent} تذكرة بأولوية مرتفعة</b><p className="text-sm text-amber-800">تحتاج إلى مراجعة سريعة من فريق الدعم.</p></div></div>}
  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{cards.map(x=><Link to={x.to} key={x.to}><Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5"><CardContent className="p-5"><div className="flex justify-between items-start"><div className="p-2.5 rounded-xl bg-slate-100"><x.icon size={22} className="text-slate-800"/></div><ArrowLeft size={18} className="text-slate-400"/></div><div className="text-3xl font-bold mt-5">{loading?'—':x.value}</div><div className="font-semibold mt-1">{x.title}</div><div className="text-xs text-slate-500 mt-1">{x.hint}</div></CardContent></Card></Link>)}</div>
  <div className="grid xl:grid-cols-2 gap-5">
   <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>المشاريع الأخيرة</CardTitle><Link className="text-sm text-slate-600" to="/mdyafae/projects">عرض الكل</Link></CardHeader><CardContent className="space-y-4">{projects.length===0?<p className="text-slate-500 py-8 text-center">أضف أول مشروع تقني لبدء المتابعة.</p>:projects.map(p=><div key={p.id} className="border-b last:border-0 pb-4 last:pb-0"><div className="flex justify-between gap-3"><div><div className="font-semibold">{p.name}</div><div className="text-xs text-slate-500 mt-1">{label(p.status)} • {p.priority}</div></div><b>{p.progress||0}%</b></div><div className="h-2 bg-slate-100 rounded-full mt-3"><div className="h-2 bg-slate-900 rounded-full" style={{width:`${p.progress||0}%`}}/></div></div>)}</CardContent></Card>
   <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>آخر تذاكر الدعم</CardTitle><Link className="text-sm text-slate-600" to="/mdyafae/tickets">عرض الكل</Link></CardHeader><CardContent className="space-y-3">{tickets.length===0?<p className="text-slate-500 py-8 text-center">لا توجد تذاكر دعم حاليًا.</p>:tickets.map(t=><div key={t.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between gap-3"><div className="min-w-0"><div className="font-medium truncate">{t.subject}</div><div className="text-xs text-slate-500 mt-1">{t.name}</div></div><div className="flex gap-2"><Badge variant="secondary">{label(t.status)}</Badge>{(t.priority==='high'||t.priority==='critical')&&<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">عاجل</Badge>}</div></div>)}</CardContent></Card>
  </div>
 </div>
}
