import React, { useState } from 'react';
import { Article, Category, Tag, MediaItem } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import WysiwygEditor from '../../components/WysiwygEditor';
import Icon from '../../components/Icon';

const EditorArticles = ({ articles, categories, tags, onUpdate, mediaLibrary, onUpdateMedia }: { articles: Article[], categories: Category[], tags: Tag[], onUpdate: (a: Article[]) => void, mediaLibrary: MediaItem[], onUpdateMedia: (m: MediaItem[]) => void }) => {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleEdit = (article: Article) => {
    setEditingArticle({ ...article, tagIds: [...article.tagIds] });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingArticle({
      id: `article_${Date.now()}`,
      title: '',
      content: '',
      image: '',
      date: new Date().toISOString(),
      categoryId: categories[0]?.id || '',
      tagIds: []
    });
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!editingArticle) return;
    let updatedArticles;
    if (isCreating) {
      updatedArticles = [...articles, editingArticle];
    } else {
      updatedArticles = articles.map(a => a.id === editingArticle.id ? editingArticle : a);
    }
    onUpdate(updatedArticles);
    setEditingArticle(null);
  };

  const handleDelete = (articleId: string) => {
    onUpdate(articles.filter(a => a.id !== articleId));
    setShowConfirm(null);
  };

  const handleTagToggle = (tagId: string) => {
    if (!editingArticle) return;
    const newTagIds = editingArticle.tagIds.includes(tagId)
      ? editingArticle.tagIds.filter(id => id !== tagId)
      : [...editingArticle.tagIds, tagId];
    setEditingArticle({ ...editingArticle, tagIds: newTagIds });
  };
  
  if (editingArticle) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">{isCreating ? 'إنشاء مقال جديد' : 'تعديل المقال'}</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div><label className="block text-sm font-bold mb-1">العنوان</label><input type="text" value={editingArticle.title} onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })} className="w-full p-2 border rounded-lg"/></div>
          <div><label className="block text-sm font-bold mb-1">رابط الصورة</label><input type="text" value={editingArticle.image} onChange={e => setEditingArticle({ ...editingArticle, image: e.target.value })} className="w-full p-2 border rounded-lg" dir="ltr"/></div>
          <div><label className="block text-sm font-bold mb-1">الفئة</label>
            <select value={editingArticle.categoryId} onChange={e => setEditingArticle({ ...editingArticle, categoryId: e.target.value })} className="w-full p-2 border rounded-lg">
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div><label className="block text-sm font-bold mb-1">الوسوم</label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
              {tags.map(tag => (
                <button key={tag.id} onClick={() => handleTagToggle(tag.id)} className={`px-3 py-1 text-sm rounded-full ${editingArticle.tagIds.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-slate-200'}`}>{tag.name}</button>
              ))}
            </div>
          </div>
          <div><label className="block text-sm font-bold mb-1">المحتوى</label><WysiwygEditor value={editingArticle.content} onChange={value => setEditingArticle({ ...editingArticle, content: value })} mediaLibrary={mediaLibrary} onUpdateMedia={onUpdateMedia} /></div>
          <div className="flex gap-4">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Save" size={18}/>حفظ</button>
            <button onClick={() => setEditingArticle(null)} className="bg-slate-200 px-4 py-2 rounded-lg">إلغاء</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المقالات</h2>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Plus" size={18}/> مقال جديد</button>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <table className="w-full text-right">
          <thead><tr className="border-b"><th className="p-4">العنوان</th><th className="p-4">الفئة</th><th className="p-4">التاريخ</th><th className="p-4">إجراءات</th></tr></thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{article.title}</td>
                <td className="p-4">{categories.find(c => c.id === article.categoryId)?.name || 'غير مصنف'}</td>
                <td className="p-4">{new Date(article.date).toLocaleDateString()}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(article)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><Icon name="Edit2" size={18}/></button>
                  <button onClick={() => setShowConfirm(article.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Icon name="Trash2" size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmDialog isOpen={!!showConfirm} onConfirm={() => handleDelete(showConfirm!)} onCancel={() => setShowConfirm(null)} />
      </div>
    </div>
  );
};

export default EditorArticles;