import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BriefcaseBusiness, Building2, Headphones, ShoppingBag, Plus, RefreshCw } from 'lucide-react';

type Mode = 'projects' | 'clients' | 'tickets' | 'orders';
type Row = Record<string, any>;
const config = {
  projects: { table: 'tech_projects', title: 'المشاريع التقنية', icon: BriefcaseBusiness },
  clients: { table: 'clients', title: 'العملاء', icon: Building2 },
  tickets: { table: 'support_tickets', title: 'تذاكر الدعم الفني', icon: Headphones },
  orders: { table: 'service_orders', title: 'الطلبات والخدمات', icon: ShoppingBag },
} as const;

const statusLabels: Record<string,string> = {
  planning:'تخطيط', design:'تصميم', development:'تطوير', testing:'اختبار', live:'منشور', maintenance:'صيانة', paused:'متوقف',
  lead:'عميل محتمل', active:'نشط', completed:'مكتمل',
  open:'مفتوحة', in_progress:'قيد المعالجة', resolved:'تم الحل', closed:'مغلقة',
  new:'جديد', quoted:'تم التسعير', approved:'معتمد', delivered:'تم التسليم', cancelled:'ملغي',
};

export default function TechOperations({ mode }: { mode: Mode }) {
  const meta = config[mode];
  const Icon = meta.icon;
  const [rows,setRows]=useState<Row[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState('');
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState<Row>({});
  const [saving,setSaving]=useState(false);

  const load=async()=>{ setLoading(true); const {data,error}=await supabase.from(meta.table).select('*').order('created_at',{ascending:false}); if(!error)setRows(data||[]); setLoading(false); };
  useEffect(()=>{void load();},[mode]);

  const filtered=useMemo(()=>rows.filter(r=>JSON.stringify(r).toLowerCase().includes(search.toLowerCase())),[rows,search]);

  const updateStatus=async(id:string,status:string)=>{ await supabase.from(meta.table).update({status,updated_at:new Date().toISOString()}).eq('id',id); await load(); };

  const add=async()=>{
    setSaving(true);
    let payload:Row={};
    if(mode==='clients') payload={name:form.name,company:form.company||'',email:form.email||'',phone:form.phone||'',status:'active'};
    if(mode==='projects') payload={name:form.name,type:form.type||'website',status:'planning',priority:form.priority||'medium',progress:0,project_url:form.project_url||'',repository_url:form.repository_url||''};
    if(mode==='tickets') payload={name:form.name||'إدارة مضياف',email:form.email||'admin@mdyaf.sa',subject:form.subject,description:form.description||'',priority:form.priority||'medium',category:'technical',status:'open'};
    if(mode==='orders') payload={title:form.title,service_type:form.service_type||'development',amount:Number(form.amount||0),status:'new'};
    const {error}=await supabase.from(meta.table).insert(payload);
    setSaving(false);
    if(!error){setShowAdd(false);setForm({});await load();}
  };

  const statuses = mode==='projects' ? ['planning','design','development','testing','live','maintenance','paused']
    : mode==='clients' ? ['lead','active','paused','completed']
    : mode==='tickets' ? ['open','in_progress','resolved','closed']
    : ['new','quoted','approved','in_progress','delivered','cancelled'];

  const primary=(r:Row)=> mode==='tickets'?r.subject:(mode==='orders'?r.title:(r.name||r.company));
  const secondary=(r:Row)=> mode==='clients'?(r.company||r.email):mode==='projects'?(r.type||r.project_url):mode==='tickets'?((r.company||r.email)+' • '+(r.priority||'')):(r.service_type+' • '+Number(r.amount||0).toLocaleString('ar-SA')+' ر.س');

  return <div className="space-y-6" dir="rtl">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div><div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-slate-900 text-white"><Icon size={22}/></div><h1 className="text-2xl font-bold text-slate-900">{meta.title}</h1></div><p className="text-slate-500 mt-2">إدارة ومتابعة بيانات مضياف التشغيلية من مكان واحد.</p></div>
      <div className="flex gap-2"><Button variant="outline" onClick={load}><RefreshCw size={16} className="ml-2"/>تحديث</Button><Button onClick={()=>setShowAdd(!showAdd)} className="bg-slate-900 hover:bg-slate-800"><Plus size={16} className="ml-2"/>إضافة جديد</Button></div>
    </div>

    {showAdd && <Card className="border-slate-200"><CardHeader><CardTitle className="text-lg">إضافة {meta.title}</CardTitle></CardHeader><CardContent className="grid md:grid-cols-2 gap-3">
      {mode==='clients' && <><Input placeholder="اسم العميل *" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})}/><Input placeholder="الشركة" value={form.company||''} onChange={e=>setForm({...form,company:e.target.value})}/><Input placeholder="البريد الإلكتروني" value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})}/><Input placeholder="الجوال" value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})}/></>}
      {mode==='projects' && <><Input placeholder="اسم المشروع *" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})}/><Input placeholder="النوع: موقع / تطبيق / منصة" value={form.type||''} onChange={e=>setForm({...form,type:e.target.value})}/><Input placeholder="رابط المشروع" value={form.project_url||''} onChange={e=>setForm({...form,project_url:e.target.value})}/><Input placeholder="رابط GitHub" value={form.repository_url||''} onChange={e=>setForm({...form,repository_url:e.target.value})}/></>}
      {mode==='tickets' && <><Input placeholder="عنوان التذكرة *" value={form.subject||''} onChange={e=>setForm({...form,subject:e.target.value})}/><Input placeholder="اسم مقدم الطلب" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})}/><Input className="md:col-span-2" placeholder="وصف المشكلة" value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})}/></>}
      {mode==='orders' && <><Input placeholder="عنوان الطلب *" value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})}/><Input placeholder="نوع الخدمة" value={form.service_type||''} onChange={e=>setForm({...form,service_type:e.target.value})}/><Input type="number" placeholder="القيمة بالريال" value={form.amount||''} onChange={e=>setForm({...form,amount:e.target.value})}/></>}
      <div className="md:col-span-2 flex gap-2"><Button onClick={add} disabled={saving} className="bg-slate-900">{saving?'جارٍ الحفظ...':'حفظ'}</Button><Button variant="ghost" onClick={()=>setShowAdd(false)}>إلغاء</Button></div>
    </CardContent></Card>}

    <Card><CardContent className="pt-6"><Input placeholder="بحث..." value={search} onChange={e=>setSearch(e.target.value)} className="mb-5 max-w-md"/>
      {loading?<div className="py-12 text-center text-slate-500">جارٍ تحميل البيانات...</div>:filtered.length===0?<div className="py-12 text-center text-slate-500">لا توجد بيانات بعد.</div>:
      <div className="space-y-3">{filtered.map(r=><div key={r.id} className="p-4 rounded-xl border bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0"><div className="font-semibold text-slate-900 truncate">{primary(r)}</div><div className="text-sm text-slate-500 mt-1">{secondary(r)}</div>{mode==='projects'&&<div className="mt-2 w-48 bg-slate-100 rounded-full h-2"><div className="h-2 rounded-full bg-slate-800" style={{width:`${r.progress||0}%`}}/></div>}</div>
        <div className="flex flex-wrap items-center gap-2"><Badge variant="secondary">{statusLabels[r.status]||r.status}</Badge><select className="h-9 rounded-md border px-2 text-sm bg-white" value={r.status||statuses[0]} onChange={e=>updateStatus(r.id,e.target.value)}>{statuses.map(s=><option key={s} value={s}>{statusLabels[s]||s}</option>)}</select></div>
      </div>)}</div>}
    </CardContent></Card>
  </div>;
}
