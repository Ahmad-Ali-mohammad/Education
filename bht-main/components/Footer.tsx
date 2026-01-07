import React, { useState } from 'react';
import Icon from './Icon';
import { SiteContent } from '../types';

export const Footer = ({ data }: { data: SiteContent['contact'] }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return(
    <footer id="contact" className="bg-slate-800 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12 text-right">
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold mb-6">BHT</h3>
                    <p className="text-slate-300 leading-relaxed mb-6"> مؤسسة أمل أفضل للطبقة هي منظمة إنسانية تلتزم بتقديم المساعدة وبناء القدرات للمجتمعات المحلية. </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-6 text-blue-400">معلومات التواصل</h4>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-center gap-3"> <Icon name="MapPin" className="text-blue-400 shrink-0" size={20} /> <span>{data.address}</span> </li>
                        <li className="flex items-center gap-3"> <Icon name="Phone" className="text-blue-400 shrink-0" size={20} /> <span dir="ltr">{data.phone}</span> </li>
                        <li className="flex items-center gap-3"> <Icon name="Mail" className="text-blue-400 shrink-0" size={20} /> <span>{data.email}</span> </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-6 text-blue-400">النشرة البريدية</h4>
                    <p className="text-slate-300 mb-4">اشترك ليصلك آخر أخبارنا ومشاريعنا.</p>
                    <form onSubmit={handleSubscribe}>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" className="w-full p-2 rounded-md bg-slate-700 border-slate-600 text-white placeholder-slate-400" required/>
                        <button type="submit" className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">اشتراك</button>
                        {subscribed && <p className="text-green-400 text-sm mt-2">شكراً لاشتراكك!</p>}
                    </form>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-6 text-blue-400">روابط سريعة</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
                        <li><a href="#" className="hover:text-white transition">شروط الاستخدام</a></li>
                    </ul>
                    <div className="flex gap-4 mt-6">
                        <a href={`https://${data.facebook}`} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-500 transition"> <Icon name="Facebook" size={20} /> </a>
                        <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-500 transition"> <Icon name="Globe" size={20} /> </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} مؤسسة أمل أفضل للطبقة. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>
  );
};