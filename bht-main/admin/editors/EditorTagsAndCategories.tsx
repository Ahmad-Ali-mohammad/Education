import React, { useState } from 'react';
import { Category, Tag } from '../../types';
import Icon from '../../components/Icon';

const EditorTagsAndCategories = ({ categories, tags, onUpdateCategories, onUpdateTags }: { categories: Category[], tags: Tag[], onUpdateCategories: (c: Category[]) => void, onUpdateTags: (t: Tag[]) => void }) => {
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');

    const [categorySearch, setCategorySearch] = useState('');
    const [tagSearch, setTagSearch] = useState('');

    const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null);
    const [editingTag, setEditingTag] = useState<{ id: string, name: string } | null>(null);

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim()) {
            onUpdateCategories([...categories, { id: `cat_${Date.now()}`, name: newCategory.trim() }]);
            setNewCategory('');
        }
    };

    const handleAddTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTag.trim()) {
            onUpdateTags([...tags, { id: `tag_${Date.now()}`, name: newTag.trim() }]);
            setNewTag('');
        }
    };

    const handleDeleteCategory = (id: string) => onUpdateCategories(categories.filter(c => c.id !== id));
    const handleDeleteTag = (id: string) => onUpdateTags(tags.filter(t => t.id !== id));

    const handleSaveCategory = () => {
        if (editingCategory && editingCategory.name.trim()) {
            onUpdateCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name: editingCategory.name.trim() } : c));
            setEditingCategory(null);
        }
    };

    const handleSaveTag = () => {
        if (editingTag && editingTag.name.trim()) {
            onUpdateTags(tags.map(t => t.id === editingTag.id ? { ...t, name: editingTag.name.trim() } : t));
            setEditingTag(null);
        }
    };

    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()));
    const filteredTags = tags.filter(t => t.name.toLowerCase().includes(tagSearch.toLowerCase()));

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">إدارة الفئات والوسوم</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4">الفئات</h3>
                    <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="اسم الفئة الجديدة" className="flex-grow p-2 border rounded-lg"/>
                        <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"><Icon name="Plus"/></button>
                    </form>
                    <div className="relative mb-4">
                        <input type="search" placeholder="بحث عن فئة..." value={categorySearch} onChange={e => setCategorySearch(e.target.value)} className="w-full p-2 border rounded-lg pl-10"/>
                        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    </div>
                    <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                        {filteredCategories.map(cat => (
                            <li key={cat.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg group">
                                {editingCategory?.id === cat.id ? (
                                    <div className="flex-grow flex items-center gap-2">
                                        <input 
                                            type="text" 
                                            value={editingCategory.name} 
                                            onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} 
                                            className="flex-grow p-1 border rounded" 
                                            autoFocus
                                            onKeyDown={e => e.key === 'Enter' && handleSaveCategory()}
                                        />
                                        <button onClick={handleSaveCategory} className="p-1 text-green-500 hover:bg-green-100 rounded"><Icon name="Check" size={18}/></button>
                                        <button onClick={() => setEditingCategory(null)} className="p-1 text-red-500 hover:bg-red-100 rounded"><Icon name="X" size={18}/></button>
                                    </div>
                                ) : (
                                    <>
                                        <span>{cat.name}</span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingCategory({ ...cat })} className="p-1 text-blue-500 hover:bg-blue-100 rounded"><Icon name="Edit2" size={16}/></button>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-red-500 hover:bg-red-100 rounded"><Icon name="Trash2" size={16}/></button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4">الوسوم</h3>
                    <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
                        <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="اسم الوسم الجديد" className="flex-grow p-2 border rounded-lg"/>
                        <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"><Icon name="Plus"/></button>
                    </form>
                    <div className="relative mb-4">
                        <input type="search" placeholder="بحث عن وسم..." value={tagSearch} onChange={e => setTagSearch(e.target.value)} className="w-full p-2 border rounded-lg pl-10"/>
                        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    </div>
                     <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                        {filteredTags.map(tag => (
                             <li key={tag.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg group">
                                {editingTag?.id === tag.id ? (
                                    <div className="flex-grow flex items-center gap-2">
                                        <input 
                                            type="text" 
                                            value={editingTag.name} 
                                            onChange={e => setEditingTag({ ...editingTag, name: e.target.value })} 
                                            className="flex-grow p-1 border rounded" 
                                            autoFocus
                                            onKeyDown={e => e.key === 'Enter' && handleSaveTag()}
                                        />
                                        <button onClick={handleSaveTag} className="p-1 text-green-500 hover:bg-green-100 rounded"><Icon name="Check" size={18}/></button>
                                        <button onClick={() => setEditingTag(null)} className="p-1 text-red-500 hover:bg-red-100 rounded"><Icon name="X" size={18}/></button>
                                    </div>
                                ) : (
                                    <>
                                        <span>{tag.name}</span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingTag({ ...tag })} className="p-1 text-blue-500 hover:bg-blue-100 rounded"><Icon name="Edit2" size={16}/></button>
                                            <button onClick={() => handleDeleteTag(tag.id)} className="p-1 text-red-500 hover:bg-red-100 rounded"><Icon name="Trash2" size={16}/></button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EditorTagsAndCategories;