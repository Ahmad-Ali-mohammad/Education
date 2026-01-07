import React, { useState } from 'react';
import { MediaItem } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import Icon from '../../components/Icon';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const EditorMedia = ({ media, onUpdate }: { media: MediaItem[], onUpdate: (m: MediaItem[]) => void }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMediaItems: MediaItem[] = [];
    for (const file of Array.from(files) as File[]) {
      if(file.size > 2 * 1024 * 1024) { // 2MB limit
          alert(`File ${file.name} is too large. Max size is 2MB.`);
          continue;
      }
      const base64 = await fileToBase64(file);
      newMediaItems.push({
        id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        base64,
        createdAt: new Date().toISOString(),
      });
    }
    
    if(newMediaItems.length > 0) {
      onUpdate([...newMediaItems, ...media]);
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(media.filter(item => item.id !== id));
    setShowConfirm(null);
  };

  const copyLink = (base64: string) => {
      navigator.clipboard.writeText(base64).then(() => {
          alert('تم نسخ الرابط (Base64). يمكنك استخدامه في حقول الصور.');
      });
  };

  return (
    <div className="p-6">
        <ConfirmDialog isOpen={!!showConfirm} onConfirm={() => handleDelete(showConfirm!)} onCancel={() => setShowConfirm(null)} />
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">مكتبة الوسائط</h2>
            <div className="flex items-center gap-2">
                <label htmlFor="upload-button-page" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                  <Icon name="UploadCloud" size={18} /> رفع ملف جديد
                </label>
                <input id="upload-button-page" type="file" multiple onChange={handleFileUpload} className="hidden" accept="image/*"/>
                <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-slate-200' : 'hover:bg-slate-100'}`}><Icon name="List" size={20}/></button>
                <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-slate-200' : 'hover:bg-slate-100'}`}><Icon name="Grid" size={20}/></button>
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
           {media.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Icon name="File" size={48} />
              <p className="mt-4">المكتبة فارغة. قم برفع بعض الصور.</p>
            </div>
          ) : view === 'grid' ? (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {media.map(item => (
                  <div key={item.id} className="group relative border rounded-lg overflow-hidden aspect-square">
                    <img src={item.base64} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-2">
                      <p className="text-white text-xs text-center break-all mb-2">{item.name}</p>
                      <div className="flex gap-2">
                        <button onClick={() => copyLink(item.base64)} className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40"><Icon name="Link2" size={16}/></button>
                        <button onClick={() => setShowConfirm(item.id)} className="p-2 bg-red-500/50 rounded-full text-white hover:bg-red-500/80"><Icon name="Trash2" size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-right">
                <thead className="bg-slate-50"><tr className="border-b"><th className="p-2">معاينة</th><th className="p-2">الاسم</th><th className="p-2">تاريخ الرفع</th><th className="p-2">الحجم</th><th className="p-2">إجراءات</th></tr></thead>
                <tbody>
                  {media.map(item => (
                    <tr key={item.id} className="border-b hover:bg-slate-50">
                      <td className="p-2"><img src={item.base64} alt={item.name} className="w-16 h-16 object-cover rounded" /></td>
                      <td className="p-2 font-medium">{item.name}</td>
                      <td className="p-2 text-slate-600">{new Date(item.createdAt).toLocaleDateString('ar-EG')}</td>
                      <td className="p-2 text-slate-600">{(item.size / 1024).toFixed(1)} KB</td>
                      <td className="p-2 flex items-center gap-2 pt-8">
                        <button onClick={() => copyLink(item.base64)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><Icon name="Link2" size={18}/></button>
                        <button onClick={() => setShowConfirm(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Icon name="Trash2" size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
    </div>
  );
};

export default EditorMedia;