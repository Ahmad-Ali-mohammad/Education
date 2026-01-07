import React, { useState } from 'react';
import { PageContent, SiteContent } from '../types';
import Icon from '../components/Icon';

const ContactPage = ({ pageData, contact }: { pageData: PageContent, contact: SiteContent['contact'] }) => {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 1500);
    };
    return (
        <div className="py-20 bg-white min-h-screen">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                    <p className="text-slate-600">{pageData.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 bg-slate-50 p-8 rounded-2xl shadow-lg">
                    <div className="space-y-8 my-auto">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">معلومات التواصل</h3>
                        {[
                            { icon: 'MapPin', title: 'العنوان', value: contact.address },
                            { icon: 'Phone', title: 'الهاتف', value: contact.phone, dir: 'ltr' as const },
                            { icon: 'Mail', title: 'البريد الإلكتروني', value: contact.email }
                        ].map(item => (
                            <div key={item.title} className="flex items-start gap-4">
                                <Icon name={item.icon} className="text-blue-500 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-bold">{item.title}</h4>
                                    <p className="text-slate-600" dir={item.dir}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                        <div className="h-48 bg-slate-200 rounded-lg overflow-hidden">
                            <a href={`https://www.google.com/maps?q=${contact.lat},${contact.lng}`} target="_blank" rel="noopener noreferrer">
                                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${contact.lat},${contact.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${contact.lat},${contact.lng}&key=NO_API_KEY_NEEDED_FOR_STATIC`} alt="Map" className="w-full h-full object-cover" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div> <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label> <input type="text" className="w-full p-3 border rounded-lg" placeholder="اسمك" required /> </div>
                            <div> <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label> <input type="email" className="w-full p-3 border rounded-lg" placeholder="email@example.com" required /> </div>
                            <div> <label className="block text-sm font-medium text-slate-700 mb-1">رسالتك</label> <textarea rows={5} className="w-full p-3 border rounded-lg" placeholder="كيف يمكننا مساعدتك؟" required></textarea> </div>
                            <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-slate-400"> {formStatus === 'sending' ? 'جار الإرسال...' : 'إرسال الرسالة'} </button>
                            {formStatus === 'success' && <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 text-green-700"><Icon name="CheckCircle" size={20} /> <span>تم إرسال رسالتك بنجاح!</span></div>}
                            {formStatus === 'error' && <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 text-red-700"><Icon name="XCircle" size={20} /> <span>حدث خطأ. يرجى المحاولة مرة أخرى.</span></div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;