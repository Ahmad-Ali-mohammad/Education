import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';

const EditorDonations = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [data, setData] = useState(content.donation || {});
  
  const handleSave = () => {
    updateContent('donation', data);
  };
  
  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">إدارة التبرعات</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">عنوان قسم التبرعات</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">الوصف</label>
          <textarea
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">الهدف ($)</label>
            <input
              type="number"
              value={data.goal || 0}
              onChange={(e) => setData({ ...data, goal: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المبلغ الحالي ($)</label>
            <input
              type="number"
              value={data.current || 0}
              onChange={(e) => setData({ ...data, current: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        
        {/* Progress Preview */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-sm font-bold mb-2">معاينة شريط التقدم</p>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-600">${(data.current || 0).toLocaleString()}</span>
            <span className="text-slate-500">${(data.goal || 0).toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all" 
              style={{ width: `${Math.min((data.current / data.goal) * 100, 100) || 0}%` }}
            />
          </div>
          <p className="text-center text-sm text-slate-500 mt-2">
            {((data.current / data.goal) * 100 || 0).toFixed(0)}% من الهدف
          </p>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Save" size={18} />
          {t('save')}
        </button>
      </div>
    </div>
  );
};

export default EditorDonations;
