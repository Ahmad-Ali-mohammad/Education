import React, { useState } from 'react';
import { SiteContent, MediaItem } from '../../types';
import WysiwygEditor from '../../components/WysiwygEditor';
import Icon from '../../components/Icon';

const EditorAbout = ({ data, onSave, mediaLibrary, onUpdateMedia }: { data: SiteContent['about'], onSave: (d: any) => void, mediaLibrary: MediaItem[], onUpdateMedia: (m: MediaItem[]) => void }) => {
    const [formData, setFormData] = useState(data);
    return (
        <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">تعديل قسم من نحن</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">العنوان</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">مقدمة مختصرة</label>
                    <WysiwygEditor value={formData.intro} onChange={value => setFormData({ ...formData, intro: value })} mediaLibrary={mediaLibrary} onUpdateMedia={onUpdateMedia} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">الوصف الكامل</label>
                    <WysiwygEditor value={formData.description} onChange={value => setFormData({ ...formData, description: value })} mediaLibrary={mediaLibrary} onUpdateMedia={onUpdateMedia} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رؤيتنا</label>
                    <textarea rows={3} value={formData.vision} onChange={e => setFormData({ ...formData, vision: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رسالتنا</label>
                    <textarea rows={3} value={formData.mission} onChange={e => setFormData({ ...formData, mission: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">رابط الصورة</label>
                    <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full p-2 border rounded-lg" dir="ltr" />
                </div>
                <button onClick={() => onSave(formData)} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Icon name="Save" size={18} /> حفظ التغييرات
                </button>
            </div>
        </div>
    );
};

export default EditorAbout;