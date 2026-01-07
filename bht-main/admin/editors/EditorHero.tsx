import React, { useState } from 'react';
import { SiteContent } from '../../types';
import Icon from '../../components/Icon';

const EditorHero = ({ data, onSave }: { data: SiteContent['hero'], onSave: (d: any) => void }) => {
    const [formData, setFormData] = useState(data);
    return (
        <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">تعديل الواجهة الرئيسية</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">العنوان الرئيسي</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">العنوان الفرعي</label>
                    <input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">نص الزر (CTA)</label>
                    <input type="text" value={formData.cta_text} onChange={e => setFormData({ ...formData, cta_text: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رابط الزر (CTA)</label>
                    <input type="text" value={formData.cta_link} onChange={e => setFormData({ ...formData, cta_link: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رابط صورة الخلفية</label>
                    <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full p-2 border rounded-lg" dir="ltr" />
                </div>
                <button onClick={() => onSave(formData)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Icon name="Save" size={18} /> حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default EditorHero;