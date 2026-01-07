import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';

const AdminHeader = ({ hasChanges, onPublish, onDiscard, onPreview }) => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {hasChanges && (
          <span className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
            <Icon name="AlertCircle" size={16} />
            يوجد تغييرات غير منشورة
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          {i18n.language === 'ar' ? 'EN' : 'عربي'}
        </button>
        
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
          data-testid="admin-preview"
        >
          <Icon name="Eye" size={18} />
          {t('preview')}
        </button>
        
        {hasChanges && (
          <>
            <button
              onClick={onDiscard}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              data-testid="admin-discard"
            >
              <Icon name="X" size={18} />
              {t('discard')}
            </button>
            
            <button
              onClick={onPublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              data-testid="admin-publish"
            >
              <Icon name="Upload" size={18} />
              {t('publish')}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
