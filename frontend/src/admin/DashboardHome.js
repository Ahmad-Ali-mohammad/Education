import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../components/Icon';
import { useContent } from '../context/ContentContext';
import { analyticsAPI } from '../api';

const DashboardHome = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    analyticsAPI.get()
      .then(res => setAnalytics(res.data))
      .catch(console.error);
  }, []);
  
  const statsCards = [
    { 
      title: 'إجمالي الزوار', 
      value: analytics?.visitors?.total || 0, 
      icon: 'BarChart3', 
      color: 'blue' 
    },
    { 
      title: 'المشاريع', 
      value: analytics?.content_stats?.projects || content.projects?.length || 0, 
      icon: 'Briefcase', 
      color: 'green' 
    },
    { 
      title: 'المقالات', 
      value: analytics?.content_stats?.articles || content.articles?.length || 0, 
      icon: 'Newspaper', 
      color: 'purple' 
    },
    { 
      title: 'التبرعات', 
      value: `$${(content.donation?.current || 0).toLocaleString()}`, 
      icon: 'Heart', 
      color: 'red' 
    }
  ];
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-500',
    green: 'bg-green-100 text-green-500',
    purple: 'bg-purple-100 text-purple-500',
    red: 'bg-red-100 text-red-500'
  };
  
  return (
    <div className="p-4 md:p-8 space-y-8">
      <h2 className="text-3xl font-bold text-slate-800">{t('dashboard')}</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map(card => (
          <div key={card.title} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
            <div className={`p-4 rounded-full ${colorClasses[card.color]}`}>
              <Icon name={card.icon} size={28} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold">{card.title}</p>
              <p className="text-3xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-right">
              <Icon name="Plus" className="text-blue-500 mb-2" />
              <p className="font-medium">مقال جديد</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-right">
              <Icon name="FolderPlus" className="text-green-500 mb-2" />
              <p className="font-medium">مشروع جديد</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-right">
              <Icon name="UserPlus" className="text-purple-500 mb-2" />
              <p className="font-medium">عضو فريق</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition text-right">
              <Icon name="Image" className="text-yellow-500 mb-2" />
              <p className="font-medium">رفع صورة</p>
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-xl mb-4">حالة النظام</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-green-50 rounded-lg text-green-700">
              <div className="flex items-center gap-3">
                <Icon name="Server" />
                <span>{t('systemStatus')}</span>
              </div>
              <span className="font-bold">{t('systemRunning')}</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="Users" className="text-blue-500" />
                <span>أعضاء الفريق</span>
              </div>
              <span className="font-bold">{content.team?.length || 0}</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="FileText" className="text-purple-500" />
                <span>الصفحات</span>
              </div>
              <span className="font-bold">{content.pages?.length || 0}</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="Image" className="text-yellow-500" />
                <span>الوسائط</span>
              </div>
              <span className="font-bold">{content.mediaLibrary?.length || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
