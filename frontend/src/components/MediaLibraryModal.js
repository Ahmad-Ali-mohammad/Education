import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

const MediaLibraryModal = ({ isOpen, onClose, onSelectImage, media, onUpdateMedia }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('library');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setUploading(true);
    
    const newItems = await Promise.all(
      files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: file.name,
              type: file.type,
              size: file.size,
              base64: event.target.result,
              createdAt: new Date().toISOString()
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    
    onUpdateMedia([...media, ...newItems]);
    setUploading(false);
    setActiveTab('library');
  }, [media, onUpdateMedia]);
  
  const handleDelete = useCallback((id) => {
    onUpdateMedia(media.filter(item => item.id !== id));
  }, [media, onUpdateMedia]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">{t('media')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 font-medium transition ${activeTab === 'library' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
          >
            المكتبة
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-500'}`}
          >
            رفع جديد
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 130px)' }}>
          {activeTab === 'upload' && (
            <div 
              className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploading ? (
                <div className="text-blue-500">
                  <Icon name="Loader2" size={48} className="mx-auto animate-spin mb-4" />
                  <p>جاري الرفع...</p>
                </div>
              ) : (
                <>
                  <Icon name="Upload" size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 mb-2">اضغط لرفع الصور</p>
                  <p className="text-slate-400 text-sm">أو اسحب الملفات هنا</p>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'library' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <Icon name="Image" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>لا توجد صور في المكتبة</p>
                </div>
              ) : (
                media.map(item => (
                  <div 
                    key={item.id} 
                    className="relative group cursor-pointer rounded-lg overflow-hidden border hover:border-blue-500 transition"
                  >
                    <img 
                      src={item.base64} 
                      alt={item.name} 
                      className="w-full h-32 object-cover"
                      onClick={() => {
                        onSelectImage(item.base64);
                        onClose();
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectImage(item.base64);
                          onClose();
                        }}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-xs text-slate-600 truncate">{item.name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
