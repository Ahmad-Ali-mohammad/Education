import React from 'react';
import Icon from './Icon';

export const ConfirmDialog = ({ isOpen, title = "تأكيد الحذف", message = "هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.", onConfirm, onCancel }: { isOpen: boolean; title?: string; message?: string; onConfirm: () => void; onCancel: () => void; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border-t-4 border-red-500">
        <div className="flex items-center gap-3 mb-4 text-red-500">
          <Icon name="AlertTriangle" size={28} />
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-5 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition font-medium">إلغاء</button>
          <button onClick={onConfirm} className="px-5 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition font-bold shadow-lg hover:shadow-red-500/30">حذف نهائي</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;