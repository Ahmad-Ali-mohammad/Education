import React, { useState } from 'react';
import { SiteContent, HistoryEntry } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';

const SettingsEditor = ({ data, seo, history, onSave, onRestore }: { data: SiteContent['contact'], seo: SiteContent['seo'], history: HistoryEntry[], onSave: (d: {contact: any, seo: any}) => void, onRestore: (version: HistoryEntry) => void }) => { 
  const [contactData, setContactData] = useState(data); 
  const [seoData, setSeoData] = useState(seo); 
  const [showConfirm, setShowConfirm] = useState<HistoryEntry | null>(null);
  
  const handleSave = () => { onSave({ contact: contactData, seo: seoData }); }; 

  const handleRestoreClick = (version: HistoryEntry) => {
    setShowConfirm(version);
  };
  
  const confirmRestore = () => {
    if (showConfirm) {
      onRestore(showConfirm);
      setShowConfirm(null);
    }
  };

  return ( 
    <div className="p-6 max-w-4xl"> 
      <ConfirmDialog 
        isOpen={!!showConfirm}
        title="تأكيد الاستعادة"
        message="هل أنت متأكد من استعادة هذا الإصدار؟ سيتم نشر هذا المحتوى مباشرة وسيتم تجاهل أي تغييرات غير منشورة."
        onConfirm={confirmRestore}
        onCancel={() => setShowConfirm(null)}
      />
      <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2> 
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6"> 
        <div> 
          <h3 className="font-bold text-lg mb-4 text-slate-800">معلومات التواصل</h3> 
          <div className="grid md:grid-cols-2 gap-4"> 
            <div><label className="block text-sm font-bold mb-1">البريد الإلكتروني</label><input value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">الهاتف</label><input value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div className="md:col-span-2"><label className="block text-sm font-bold mb-1">العنوان</label><input value={contactData.address} onChange={e => setContactData({...contactData, address: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">فيسبوك</label><input value={contactData.facebook} onChange={e => setContactData({...contactData, facebook: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">الموقع الإلكتروني</label><input value={contactData.website} onChange={e => setContactData({...contactData, website: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">خط العرض (Lat)</label><input type="number" value={contactData.lat} onChange={e => setContactData({...contactData, lat: parseFloat(e.target.value)})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">خط الطول (Lng)</label><input type="number" value={contactData.lng} onChange={e => setContactData({...contactData, lng: parseFloat(e.target.value)})} className="w-full border p-2 rounded" /></div> 
          </div> 
        </div> 
        <div> 
          <h3 className="font-bold text-lg mb-4 text-slate-800">إعدادات SEO</h3> 
          <div className="space-y-4"> 
            <div><label className="block text-sm font-bold mb-1">وصف الموقع (Meta Description)</label><textarea rows={3} value={seoData.metaDescription} onChange={e => setSeoData({...seoData, metaDescription: e.target.value})} className="w-full border p-2 rounded" /></div> 
            <div><label className="block text-sm font-bold mb-1">الكلمات المفتاحية (Meta Keywords)</label><input value={seoData.metaKeywords} onChange={e => setSeoData({...seoData, metaKeywords: e.target.value})} className="w-full border p-2 rounded" placeholder="كلمة, أخرى, فاصلة"/></div> 
          </div> 
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4 text-slate-800 border-t pt-6">سجل الإصدارات</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {history.length > 0 ? history.map((version, index) => (
              <div key={version.timestamp} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">تم النشر في:</p>
                  <p className="text-xs text-slate-600">{new Date(version.timestamp).toLocaleString('ar-EG')}</p>
                </div>
                <button 
                  onClick={() => handleRestoreClick(version)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
                  استعادة
                </button>
              </div>
            )) : <p className="text-slate-500 text-sm">لا يوجد سجل إصدارات.</p>}
          </div>
        </div>
      </div> 
      <button onClick={handleSave} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">حفظ التغييرات</button> 
    </div> 
  ); 
};

export default SettingsEditor;
