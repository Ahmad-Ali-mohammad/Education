import React, { useState } from 'react';
import { SiteContent, BeneficiaryStory } from '../../types';
import Icon from '../../components/Icon';

const EditorBeneficiaries = ({ pageData, onUpdate }: { pageData: SiteContent['beneficiariesPage'], onUpdate: (d: any) => void }) => {
  const [formData, setFormData] = useState(pageData);

  const handleStoryChange = (id: string, field: string, value: any) => {
    const updatedStories = formData.stories.map(s => s.id === id ? { ...s, [field]: value } : s);
    setFormData({ ...formData, stories: updatedStories });
  };

  const handleAddStory = () => {
    const newStory: BeneficiaryStory = {
      id: `story_${Date.now()}`,
      name: '',
      story: '',
      image: '',
      project: '',
      year: new Date().getFullYear()
    };
    setFormData({ ...formData, stories: [...formData.stories, newStory] });
  };

  const handleDeleteStory = (id: string) => {
    setFormData({ ...formData, stories: formData.stories.filter(s => s.id !== id) });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">إدارة صفحة المستفيدين</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-bold mb-1">عنوان الصفحة</label><input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
          <div><label className="block text-sm font-bold mb-1">العنوان الفرعي</label><input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">قصص النجاح</h3>
            <button onClick={handleAddStory} className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm flex items-center gap-1"><Icon name="Plus" size={16}/> إضافة قصة</button>
          </div>
          <div className="space-y-4">
            {formData.stories.map(story => (
              <div key={story.id} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-500">ID: {story.id}</span>
                  <button onClick={() => handleDeleteStory(story.id)} className="text-red-500 hover:text-red-700"><Icon name="Trash2" size={16}/></button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <input type="text" placeholder="الاسم" value={story.name} onChange={e => handleStoryChange(story.id, 'name', e.target.value)} className="p-2 border rounded text-sm"/>
                  <input type="text" placeholder="المشروع" value={story.project} onChange={e => handleStoryChange(story.id, 'project', e.target.value)} className="p-2 border rounded text-sm"/>
                  <input type="number" placeholder="السنة" value={story.year} onChange={e => handleStoryChange(story.id, 'year', parseInt(e.target.value))} className="p-2 border rounded text-sm"/>
                  <input type="text" placeholder="رابط الصورة" value={story.image} onChange={e => handleStoryChange(story.id, 'image', e.target.value)} className="p-2 border rounded text-sm" dir="ltr"/>
                </div>
                <textarea placeholder="القصة" rows={2} value={story.story} onChange={e => handleStoryChange(story.id, 'story', e.target.value)} className="w-full p-2 border rounded text-sm"></textarea>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => onUpdate(formData)} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          <Icon name="Save" size={18} /> حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default EditorBeneficiaries;