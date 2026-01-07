import React, { useEffect, useRef } from 'react';
import { SiteContent } from '../types';
import Icon from '../components/Icon';

const DashboardHome = ({ content }: { content: SiteContent }) => {
    const visitorsChartRef = useRef<HTMLCanvasElement>(null);
    const trafficChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<{ visitors?: any; traffic?: any }>({});

    useEffect(() => {
        (window as any).Chart.defaults.font.family = 'Tajawal';
        
        if (visitorsChartRef.current) {
            if (chartInstance.current.visitors) {
                chartInstance.current.visitors.destroy();
            }
            const visitorsCtx = visitorsChartRef.current.getContext('2d');
            if(visitorsCtx) {
                chartInstance.current.visitors = new (window as any).Chart(visitorsCtx, {
                    type: 'line',
                    data: {
                        labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                        datasets: [{
                            label: 'زوار الموقع',
                            data: [150, 230, 224, 218, 135, 147, 260],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4,
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
                });
            }
        }

        if (trafficChartRef.current) {
            if (chartInstance.current.traffic) {
                chartInstance.current.traffic.destroy();
            }
            const trafficCtx = trafficChartRef.current.getContext('2d');
            if(trafficCtx) {
                 chartInstance.current.traffic = new (window as any).Chart(trafficCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['بحث جوجل', 'مباشر', 'وسائل التواصل'],
                        datasets: [{
                            data: [55, 25, 20],
                            backgroundColor: ['#3b82f6', '#22c55e', '#ef4444'],
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
                });
            }
        }
        
        return () => {
             if (chartInstance.current.visitors) chartInstance.current.visitors.destroy();
             if (chartInstance.current.traffic) chartInstance.current.traffic.destroy();
        }
    }, []);
    
    const statsCards = [
        { title: "إجمالي الزوار (محاكاة)", value: "1,362", icon: 'BarChart3', color: "blue" },
        { title: "المشاريع المنجزة", value: content.projects.filter(p => p.status === 'completed').length, icon: 'Briefcase', color: "green" },
        { title: "المقالات المنشورة", value: content.articles.length, icon: 'Newspaper', color: "purple" },
        { title: "إجمالي التبرعات (محاكاة)", value: `$${content.donation.current.toLocaleString()}`, icon: 'Heart', color: "red" }
    ];
    
    const latestActivities = [
        { icon: 'Newspaper', text: `تم نشر مقال جديد: "${content.articles[0]?.title || ''}"`, time: "قبل 5 دقائق" },
        { icon: 'Briefcase', text: `تم تحديث مشروع: "${content.projects[0]?.title || ''}"`, time: "قبل ساعة" },
        { icon: 'Users', text: `تسجيل مستخدم جديد: "علي أحمد" (محاكاة)`, time: "قبل 3 ساعات" },
        { icon: 'MessageSquare', text: `تعليق جديد على مقال (محاكاة)`, time: "أمس" },
    ];

    const pendingTasks = [
        { icon: 'MessageSquare', text: "مراجعة 2 تعليقات جديدة", status: "new" },
        { icon: 'Mail', text: "الرد على رسالة تواصل واحدة", status: "new" },
        { icon: 'Bell', text: "تحديث النظام مطلوب", status: "urgent" },
    ];

    return (
      <div className="p-4 md:p-8 space-y-8">
        <h2 className="text-3xl font-bold text-slate-800">لوحة التحكم الرئيسية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map(card => (
                 <div key={card.title} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
                    <div className={`p-4 rounded-full bg-${card.color}-100 text-${card.color}-500`}>
                       <Icon name={card.icon} size={28}/>
                    </div>
                    <div>
                        <p className="text-slate-500 font-semibold">{card.title}</p>
                        <p className="text-3xl font-bold text-slate-800">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-4">زوار الموقع (آخر 7 أيام)</h3>
                <div className="h-80"><canvas ref={visitorsChartRef}></canvas></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-4">مصادر الزيارات</h3>
                <div className="h-80"><canvas ref={trafficChartRef}></canvas></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-4">آخر النشاطات</h3>
                <ul className="space-y-4">
                    {latestActivities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className="p-3 bg-slate-100 rounded-full text-slate-600"><Icon name={activity.icon} size={20}/></div>
                            <div>
                                <p className="font-medium text-slate-800">{activity.text}</p>
                                <p className="text-sm text-slate-500">{activity.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h3 className="font-bold text-xl mb-4">مهام وتنبيهات</h3>
                 <ul className="space-y-3">
                    {pendingTasks.map((task, i) => (
                        <li key={i} className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Icon name={task.icon} className={task.status === 'urgent' ? 'text-red-500' : 'text-blue-500'}/>
                                <span>{task.text}</span>
                            </div>
                            <button className="text-sm text-blue-500 hover:underline">عرض</button>
                        </li>
                    ))}
                     <li className="flex items-center p-3 bg-green-50 rounded-lg text-green-700 gap-3">
                        <Icon name="Server"/>
                        <span>حالة النظام: <span className="font-bold">يعمل بكفاءة</span></span>
                    </li>
                 </ul>
            </div>
        </div>
      </div>
    );
};

export default DashboardHome;
