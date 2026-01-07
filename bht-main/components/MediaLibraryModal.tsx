import React, { useState } from 'react';
import { MediaItem } from '../types';
import Icon from './Icon';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


export const MediaLibraryModal = ({ isOpen, onClose, onSelectImage, media, onUpdateMedia }: { isOpen: boolean; onClose: () => void; onSelectImage: (base64: string) => void; media: MediaItem[]; onUpdateMedia: (media: MediaItem[]) => void; }) => {
  if (!isOpen) return null;
  const [view, setView] = useState<'grid' | 'list'>('grid');

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
        id: `media_${Date.now()}_${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        base64,
        createdAt: new Date().toISOString(),
      });
    }

    onUpdateMedia([...newMediaItems, ...media]);
  };
  
  const handleDelete = (id: string) => {
    onUpdateMedia(media.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] mx-4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-slate-800">مكتبة الوسائط</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="upload-button" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <Icon name="UploadCloud" size={18} /> رفع ملف
            </label>
            <input id="upload-button" type="file" multiple onChange={handleFileUpload} className="hidden" accept="image/*" />
            <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-slate-200' : 'hover:bg-slate-100'}`}><Icon name="List" size={20}/></button>
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-slate-200' : 'hover:bg-slate-100'}`}><Icon name="Grid" size={20}/></button>
            <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><Icon name="X" size={24} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {media.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Icon name="File" size={48} />
              <p>المكتبة فارغة. قم برفع بعض الملفات.</p>
            </div>
          ) : (
            view === 'grid' ? (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {media.map(item => (
                  <div key={item.id} className="group relative border rounded-lg overflow-hidden aspect-square cursor-pointer" onClick={() => onSelectImage(item.base64)}>
                    <img src={item.base64} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <p className="text-white text-xs text-center p-1 truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50"><tr><th className="p-2">معاينة</th><th className="p-2">الاسم</th><th className="p-2">النوع</th><th className="p-2">الحجم</th><th className="p-2">إجراء</th></tr></thead>
                <tbody>
                  {media.map(item => (
                    <tr key={item.id} className="border-b hover:bg-slate-50">
                      <td className="p-2"><img src={item.base64} alt={item.name} className="w-12 h-12 object-cover rounded" /></td>
                      <td className="p-2 font-medium">{item.name}</td>
                      <td className="p-2 text-slate-600">{item.type}</td>
                      <td className="p-2 text-slate-600">{(item.size / 1024).toFixed(1)} KB</td>
                      <td className="p-2">
                        <button onClick={() => onSelectImage(item.base64)} className="text-blue-500 hover:underline mr-2">اختيار</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;