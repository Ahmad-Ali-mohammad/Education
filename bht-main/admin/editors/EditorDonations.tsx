import React, { useState } from 'react';
import { SiteContent } from '../../types';
import Icon from '../../components/Icon';

const EditorDonations = ({ data, onSave }: { data: SiteContent['donation'], onSave: (d: any) => void }) => {
    const [formData, setFormData] = useState(data);
    return (
        <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">إدارة حملة التبرعات</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">عنوان الحملة</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">وصف الحملة</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">المبلغ المستهدف ($)</label>
                        <input type="number" value={formData.goal} onChange={e => setFormData({ ...formData, goal: Number(e.target.value) })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">المبلغ الحالي ($)</label>
                        <input type="number" value={formData.current} onChange={e => setFormData({ ...formData, current: Number(e.target.value) })} className="w-full p-2 border rounded-lg" />
                    </div>
                </div>
                <button onClick={() => onSave(formData)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Icon name="Save" size={18} /> حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default EditorDonations;