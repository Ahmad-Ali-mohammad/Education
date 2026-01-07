import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Icon name="AlertTriangle" className="text-red-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {title || t('deleteConfirm')}
          </h3>
        </div>
        
        <p className="text-slate-600 mb-6">
          {message || 'هذا الإجراء لا يمكن التراجع عنه.'}
        </p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            data-testid="confirm-cancel"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            data-testid="confirm-delete"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
