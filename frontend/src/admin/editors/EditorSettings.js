import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';

const EditorSettings = () => {
  const { t } = useTranslation();
  const { content, updateContent, history, restoreVersion } = useContent();
  const [contact, setContact] = useState(content.contact || {});
  const [seo, setSeo] = useState(content.seo || {});
  const [activeTab, setActiveTab] = useState('contact');
  
  const handleSave = () => {
    updateContent('contact', contact);
    updateContent('seo', seo);
  };
  
  const handleRestore = async (version) => {
    if (window.confirm('هل أنت متأكد من استعادة هذا الإصدار؟')) {
      await restoreVersion(version);
      alert('تم استعادة الإصدار بنجاح');
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'contact' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
        >
          معلومات التواصل
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'seo' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
        >
          SEO
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
        >
          سجل الإصدارات
        </button>
      </div>
      
      {activeTab === 'contact' && (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-bold mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={contact.email || ''}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الهاتف</label>
            <input
              type="text"
              value={contact.phone || ''}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="w-full p-2 border rounded-lg"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">العنوان</label>
            <input
              type="text"
              value={contact.address || ''}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Facebook</label>
              <input
                type="text"
                value={contact.facebook || ''}
                onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
                className="w-full p-2 border rounded-lg"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">الموقع</label>
              <input
                type="text"
                value={contact.website || ''}
                onChange={(e) => setContact({ ...contact, website: e.target.value })}
                className="w-full p-2 border rounded-lg"
                dir="ltr"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Icon name="Save" size={18} />
            {t('save')}
          </button>
        </div>
      )}
      
      {activeTab === 'seo' && (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-bold mb-1">Meta Description</label>
            <textarea
              value={seo.metaDescription || ''}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Meta Keywords</label>
            <input
              type="text"
              value={seo.metaKeywords || ''}
              onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Icon name="Save" size={18} />
            {t('save')}
          </button>
        </div>
      )}
      
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {history?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="History" size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">لا يوجد سجل إصدارات</p>
            </div>
          ) : (
            <ul className="divide-y">
              {history?.map((version, index) => (
                <li key={index} className="p-4 flex justify-between items-center hover:bg-slate-50">
                  <div>
                    <p className="font-medium">إصدار {history.length - index}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(version.timestamp).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {version.user_name && (
                      <p className="text-xs text-slate-400">بواسطة: {version.user_name}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRestore(version)}
                    className="px-4 py-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-2"
                  >
                    <Icon name="RotateCcw" size={18} />
                    استعادة
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EditorSettings;
