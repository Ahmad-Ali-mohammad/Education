import React, { useState } from 'react';
import { NavigationLink, DynamicPage } from '../../types';
import Icon from '../../components/Icon';

const EditorNavigation = ({ navigation, pages, onUpdate }: { navigation: NavigationLink[], pages: DynamicPage[], onUpdate: (n: NavigationLink[]) => void }) => {
    const [showModal, setShowModal] = useState(false);
    const [newLink, setNewLink] = useState<{label: string, path: string, type: 'page' | 'custom'}>({ label: '', path: '', type: 'page' });
    const handleAddLink = () => {
        if (!newLink.label || !newLink.path) return;
        const finalPath = newLink.type === 'page' ? `/p/${newLink.path}` : newLink.path;
        onUpdate([...navigation, { id: `nav_${Date.now()}`, label: newLink.label, path: finalPath }]);
        setShowModal(false);
        setNewLink({ label: '', path: '', type: 'page' });
    };
    const handleDelete = (id: string) => onUpdate(navigation.filter(link => link.id !== id));
    const move = (index: number, direction: 'up' | 'down') => {
        const newNav = [...navigation];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if(swapIndex < 0 || swapIndex >= newNav.length) return;
        [newNav[index], newNav[swapIndex]] = [newNav[swapIndex], newNav[index]];
        onUpdate(newNav);
    };
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">إدارة القوائم</h2>
                <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Icon name="Plus" size={18}/> إضافة رابط</button>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <ul className="space-y-2">
                    {navigation.map((link, index) => (
                        <li key={link.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group">
                            <div className="flex items-center gap-2"><Icon name="GripVertical" className="text-slate-400"/> {link.label} <span className="text-sm text-slate-500" dir="ltr">{link.path}</span></div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => move(index, 'up')} disabled={index === 0} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full disabled:opacity-30"><Icon name="ArrowUp" size={16}/></button>
                                <button onClick={() => move(index, 'down')} disabled={index === navigation.length - 1} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full disabled:opacity-30"><Icon name="ArrowDown" size={16}/></button>
                                <button onClick={() => handleDelete(link.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Icon name="Trash2" size={16}/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">إضافة رابط جديد</h3>
                        <div className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">النص</label><input type="text" value={newLink.label} onChange={e => setNewLink({...newLink, label: e.target.value})} className="w-full p-2 border rounded"/></div>
                            <div><label className="block text-sm font-bold mb-1">نوع الرابط</label>
                                <select value={newLink.type} onChange={e => setNewLink({...newLink, type: e.target.value as any, path: ''})} className="w-full p-2 border rounded">
                                    <option value="page">صفحة ديناميكية</option>
                                    <option value="custom">رابط مخصص</option>
                                </select>
                            </div>
                            {newLink.type === 'page' ? (
                                <div><label className="block text-sm font-bold mb-1">اختر الصفحة</label>
                                    <select value={newLink.path} onChange={e => setNewLink({...newLink, path: e.target.value})} className="w-full p-2 border rounded">
                                        <option value="">-- اختر --</option>
                                        {pages.filter(p => p.status === 'published').map(p => <option key={p.id} value={p.slug}>{p.title}</option>)}
                                    </select>
                                </div>
                            ) : (
                                <div><label className="block text-sm font-bold mb-1">أدخل الرابط</label><input type="text" value={newLink.path} onChange={e => setNewLink({...newLink, path: e.target.value})} placeholder="/contact أو https://example.com" className="w-full p-2 border rounded" dir="ltr"/></div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded">إلغاء</button>
                            <button onClick={handleAddLink} className="px-4 py-2 bg-blue-500 text-white rounded">إضافة</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorNavigation;