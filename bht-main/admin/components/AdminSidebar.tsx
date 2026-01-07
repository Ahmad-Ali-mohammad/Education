import React from 'react';
import Icon from '../../components/Icon';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: {activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void;}) => {
  const menuItems = [ 
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'لوحة التحكم' }, 
    { id: 'pages', icon: 'File', label: 'إدارة الصفحات' }, 
    { id: 'navigation', icon: 'Menu', label: 'إدارة القوائم' }, 
    { id: 'hero', icon: 'Home', label: 'الواجهة الرئيسية' }, 
    { id: 'about', icon: 'FileText', label: 'من نحن' }, 
    { id: 'projects', icon: 'Briefcase', label: 'المشاريع' }, 
    { id: 'jobs', icon: 'Users', label: 'التوظيف' }, 
    { id: 'services', icon: 'HeartHandshake', label: 'الخدمات' },
    { id: 'beneficiaries', icon: 'Smile', label: 'المستفيدون' },
    { id: 'team', icon: 'Users', label: 'فريق العمل' }, 
    { id: 'articles', icon: 'Newspaper', label: 'المقالات' }, 
    { id: 'tags-categories', icon: 'Tag', label: 'الفئات والوسوم' }, 
    { id: 'events', icon: 'CalendarDays', label: 'الأحداث' }, 
    { id: 'donations', icon: 'Heart', label: 'إدارة التبرعات' }, 
    { id: 'media', icon: 'Image', label: 'مكتبة الوسائط' }, 
    { id: 'settings', icon: 'Settings', label: 'الإعدادات' }, 
  ];
  return ( 
    <div className="w-64 bg-slate-800 text-white h-screen fixed right-0 top-0 flex flex-col shadow-xl z-[60]"> 
      <div className="p-6 border-b border-slate-700"> 
        <h2 className="text-2xl font-bold flex items-center gap-2"> <Icon name="Settings" className="text-blue-400" /> SMC Admin </h2> 
        <p className="text-xs text-slate-400 mt-2">نظام إدارة المحتوى</p> 
      </div> 
      <nav className="flex-1 overflow-y-auto py-4"> 
        <ul className="space-y-1"> {menuItems.map(item => {
          return (
          <li key={item.id}> 
            <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 transition ${ activeTab === item.id ? 'bg-blue-500 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-white/10' }`}> 
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span> 
            </button> 
          </li> 
          );
        })} </ul> 
      </nav> 
      <div className="p-4 border-t border-slate-700"> 
        <button onClick={onLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2 transition"> 
          <Icon name="LogOut" size={20} /> 
          <span>تسجيل خروج</span> 
        </button> 
      </div> 
    </div> 
  );
};

export default AdminSidebar;