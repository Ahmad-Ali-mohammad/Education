import React from 'react';
import Icon from '../../components/Icon';

const AdminHeader = ({ hasChanges, onPublish, onDiscard, onPreview }: { hasChanges: boolean; onPublish: ()=>void; onDiscard: ()=>void; onPreview: ()=>void; }) => {
  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b z-50 mr-64">
      <div className="flex justify-end items-center p-3 h-16">
        {hasChanges ? (
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="text-sm font-semibold text-yellow-600 flex items-center gap-2"><Icon name="AlertTriangle" size={16}/> لديك تغييرات غير منشورة</span>
            <button onClick={onPreview} className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-2"><Icon name="Eye" size={16}/> معاينة</button>
            <button onClick={onDiscard} className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">تجاهل التغييرات</button>
            <button onClick={onPublish} className="px-6 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold">نشر</button>
          </div>
        ) : (
          <span className="text-sm font-semibold text-green-600 flex items-center gap-2"><Icon name="CheckCircle" size={16}/> الموقع محدّث</span>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;