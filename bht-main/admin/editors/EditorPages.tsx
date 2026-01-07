import React, { useState } from 'react';
import { DynamicPage, MediaItem } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import WysiwygEditor from '../../components/WysiwygEditor';
import Icon from '../../components/Icon';

const EditorPages = ({ pages, onUpdate, mediaLibrary, onUpdateMedia }: { pages: DynamicPage[], onUpdate: (p: DynamicPage[]) => void, mediaLibrary: MediaItem[], onUpdateMedia: (m: MediaItem[]) => void }) => {
    const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [showConfirm, setShowConfirm] = useState<string | null>(null);

    const slugify = (text: string) => text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');

    const handleCreate = () => {
        setIsCreating(true);
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

    const handleEdit = (page: DynamicPage) => {
        setIsCreating(false);
        setEditingPage({ ...page });
    };

    const handleSave = () => {
        if (!editingPage) return;
        let updatedPages;
        const pagesToUpdate = editingPage.isHomepage 
            ? pages.map(p => ({ ...p, isHomepage: p.id === editingPage.id })) 
            : pages;
        if (isCreating) {
            updatedPages = [...pagesToUpdate, editingPage];
        } else {
            updatedPages = pagesToUpdate.map(p => p.id === editingPage.id ? editingPage : p);
        }
        onUpdate(updatedPages);
        setEditingPage(null);
    };

    const handleDelete = (pageId: string) => {
        onUpdate(pages.filter(p => p.id !== pageId));
        setShowConfirm(null);
    };

    if (editingPage) {
        return (
            <div className="p-6 max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">{isCreating ? 'إنشاء صفحة جديدة' : 'تعديل الصفحة'}</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <div><label className="block text-sm font-bold mb-1">عنوان الصفحة</label><input type="text" value={editingPage.title} onChange={e => setEditingPage({ ...editingPage, title: e.target.value, slug: slugify(e.target.value) })} className="w-full p-2 border rounded-lg"/></div>
                    <div><label className="block text-sm font-bold mb-1">المسار (Slug)</label><input type="text" value={editingPage.slug} onChange={e => setEditingPage({ ...editingPage, slug: slugify(e.target.value) })} className="w-full p-2 border rounded-lg" dir="ltr"/><small className="text-slate-500">الرابط سيكون: /p/{editingPage.slug}</small></div>
                    <div><label className="block text-sm font-bold mb-1">المحتوى</label><WysiwygEditor value={editingPage.content} onChange={value => setEditingPage({ ...editingPage, content: value })} mediaLibrary={mediaLibrary} onUpdateMedia={onUpdateMedia} /></div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-bold mb-1">الحالة</label>
                            <select value={editingPage.status} onChange={e => setEditingPage({ ...editingPage, status: e.target.value as 'published' | 'draft' })} className="w-full p-2 border rounded-lg">
                                <option value="published">منشورة</option>
                                <option value="draft">مسودة</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={editingPage.isHomepage} onChange={e => setEditingPage({ ...editingPage, isHomepage: e.target.checked })} id="isHomepage" className="w-4 h-4"/><label htmlFor="isHomepage" className="font-bold">تعيين كصفحة رئيسية</label></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mt-4 mb-2 border-t pt-4">إعدادات SEO</h3>
                        <div><label className="block text-sm font-bold mb-1">Meta Title</label><input type="text" value={editingPage.seo.metaTitle} onChange={e => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaTitle: e.target.value }})} className="w-full p-2 border rounded-lg"/></div>
                        <div><label className="block text-sm font-bold mb-1">Meta Description</label><textarea value={editingPage.seo.metaDescription} onChange={e => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaDescription: e.target.value }})} rows={3} className="w-full p-2 border rounded-lg"/></div>
                        <div><label className="block text-sm font-bold mb-1">Meta Keywords</label><input type="text" value={editingPage.seo.metaKeywords} onChange={e => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaKeywords: e.target.value }})} className="w-full p-2 border rounded-lg"/></div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Save" size={18}/>حفظ</button>
                        <button onClick={() => setEditingPage(null)} className="bg-slate-200 px-4 py-2 rounded-lg">إلغاء</button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">إدارة الصفحات</h2>
                <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Plus" size={18}/> صفحة جديدة</button>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className='text-sm text-slate-600 mb-4 p-2 bg-slate-50 rounded-lg'>هذا هو محرر الصفحات البسيط. سيتم تطويره في المستقبل ليصبح محرر مرئي بالسحب والإفلات.</p>
                <table className="w-full text-right">
                    <thead><tr className="border-b"><th className="p-4">العنوان</th><th className="p-4">المسار</th><th className="p-4">الحالة</th><th className="p-4">الرئيسية</th><th className="p-4">إجراءات</th></tr></thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold">{page.title}</td>
                                <td className="p-4 text-slate-600" dir="ltr">/p/{page.slug}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{page.status === 'published' ? 'منشورة' : 'مسودة'}</span></td>
                                <td className="p-4">{page.isHomepage && <Icon name="CheckCircle" size={20} className="text-green-500"/>}</td>
                                <td className="p-4 flex gap-2">
                                    <button onClick={() => handleEdit(page)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><Icon name="Edit2" size={18}/></button>
                                    <button onClick={() => setShowConfirm(page.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Icon name="Trash2" size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmDialog isOpen={!!showConfirm} onConfirm={() => handleDelete(showConfirm!)} onCancel={() => setShowConfirm(null)} />
        </div>
    );
};

export default EditorPages;