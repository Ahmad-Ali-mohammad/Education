import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorNavigation = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [navigation, setNavigation] = useState(content.navigation || []);
  const [editingLink, setEditingLink] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleSave = () => {
    updateContent('navigation', navigation);
  };
  
  const handleAddLink = () => {
    setEditingLink({
      id: `nav_${Date.now()}`,
      label: '',
      path: '/'
    });
  };
  
  const handleSaveLink = () => {
    if (!editingLink) return;
    const exists = navigation.find(n => n.id === editingLink.id);
    let newNav;
    if (exists) {
      newNav = navigation.map(n => n.id === editingLink.id ? editingLink : n);
    } else {
      newNav = [...navigation, editingLink];
    }
    setNavigation(newNav);
    updateContent('navigation', newNav);
    setEditingLink(null);
  };
  
  const handleDelete = (id) => {
    const newNav = navigation.filter(n => n.id !== id);
    setNavigation(newNav);
    updateContent('navigation', newNav);
    setShowConfirm(null);
  };
  
  const moveItem = (index, direction) => {
    const newNav = [...navigation];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newNav.length) return;
    [newNav[index], newNav[newIndex]] = [newNav[newIndex], newNav[index]];
    setNavigation(newNav);
    updateContent('navigation', newNav);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة القوائم</h2>
        <button
          onClick={handleAddLink}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          رابط جديد
        </button>
      </div>
      
      {editingLink && (
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">العنوان</label>
              <input
                type="text"
                value={editingLink.label}
                onChange={(e) => setEditingLink({ ...editingLink, label: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">الرابط</label>
              <input
                type="text"
                value={editingLink.path}
                onChange={(e) => setEditingLink({ ...editingLink, path: e.target.value })}
                className="w-full p-2 border rounded-lg"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSaveLink} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              {t('save')}
            </button>
            <button onClick={() => setEditingLink(null)} className="bg-slate-200 px-4 py-2 rounded-lg">
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm">
        <ul className="divide-y">
          {navigation.map((link, index) => (
            <li key={link.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <button 
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <Icon name="ChevronUp" size={16} />
                  </button>
                  <button 
                    onClick={() => moveItem(index, 1)}
                    disabled={index === navigation.length - 1}
                    className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                  >
                    <Icon name="ChevronDown" size={16} />
                  </button>
                </div>
                <div>
                  <span className="font-medium">{link.label}</span>
                  <span className="text-slate-400 text-sm mr-2" dir="ltr">{link.path}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingLink(link)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                  <Icon name="Edit2" size={18} />
                </button>
                <button onClick={() => setShowConfirm(link.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Icon name="Trash2" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDelete(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorNavigation;
