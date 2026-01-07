import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorPages = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [pages, setPages] = useState(content.pages || []);
  const [editingPage, setEditingPage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const slugify = (text) => text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
  
  const handleAddPage = () => {
    setEditingPage({
      id: `page_${Date.now()}`,
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      isHomepage: false,
      seo: { metaTitle: '', metaDescription: '', metaKeywords: '' }
    });
  };
  
  const handleSavePage = () => {
    if (!editingPage) return;
    let updatedPages;
    const pagesToUpdate = editingPage.isHomepage 
      ? pages.map(p => ({ ...p, isHomepage: p.id === editingPage.id })) 
      : pages;
    const exists = pagesToUpdate.find(p => p.id === editingPage.id);
    if (exists) {
      updatedPages = pagesToUpdate.map(p => p.id === editingPage.id ? editingPage : p);
    } else {
      updatedPages = [...pagesToUpdate, editingPage];
    }
    setPages(updatedPages);
    updateContent('pages', updatedPages);
    setEditingPage(null);
  };
  
  const handleDelete = (id) => {
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    updateContent('pages', newPages);
    setShowConfirm(null);
  };
  
  if (editingPage) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingPage.title ? 'تعديل الصفحة' : 'إنشاء صفحة جديدة'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان الصفحة</label>
            <input
              type="text"
              value={editingPage.title}
              onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value, slug: slugify(e.target.value) })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المسار (Slug)</label>
            <input
              type="text"
              value={editingPage.slug}
              onChange={(e) => setEditingPage({ ...editingPage, slug: slugify(e.target.value) })}
              className="w-full p-2 border rounded-lg"
              dir="ltr"
            />
            <small className="text-slate-500">الرابط سيكون: /p/{editingPage.slug}</small>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المحتوى</label>
            <textarea
              value={editingPage.content}
              onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={10}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">الحالة</label>
              <select
                value={editingPage.status}
                onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="published">منشورة</option>
                <option value="draft">مسودة</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={editingPage.isHomepage}
                onChange={(e) => setEditingPage({ ...editingPage, isHomepage: e.target.checked })}
                id="isHomepage"
                className="w-4 h-4"
              />
              <label htmlFor="isHomepage" className="font-bold">تعيين كصفحة رئيسية</label>
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold mb-4">إعدادات SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Meta Title</label>
                <input
                  type="text"
                  value={editingPage.seo?.metaTitle || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaTitle: e.target.value } })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Meta Description</label>
                <textarea
                  value={editingPage.seo?.metaDescription || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaDescription: e.target.value } })}
                  className="w-full p-2 border rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={editingPage.seo?.metaKeywords || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaKeywords: e.target.value } })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSavePage} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingPage(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الصفحات</h2>
        <button
          onClick={handleAddPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          صفحة جديدة
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">العنوان</th>
              <th className="p-4">المسار</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الرئيسية</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(page => (
              <tr key={page.id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-bold">{page.title}</td>
                <td className="p-4 text-slate-600" dir="ltr">/p/{page.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {page.status === 'published' ? 'منشورة' : 'مسودة'}
                  </span>
                </td>
                <td className="p-4">
                  {page.isHomepage && <Icon name="CheckCircle" size={20} className="text-green-500" />}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingPage(page)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                      <Icon name="Edit2" size={18} />
                    </button>
                    <button onClick={() => setShowConfirm(page.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 && (
          <div className="text-center py-12">
            <Icon name="File" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد صفحات</p>
          </div>
        )}
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDelete(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorPages;
