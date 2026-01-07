import React, { useState } from 'react';
import { TeamMember, Department, MediaItem } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import WysiwygEditor from '../../components/WysiwygEditor';
import Icon from '../../components/Icon';

const EditorTeam = ({ team, departments, onUpdateTeam, onUpdateDepartments, mediaLibrary, onUpdateMedia }: { 
  team: TeamMember[], 
  departments: Department[], 
  onUpdateTeam: (t: TeamMember[]) => void,
  onUpdateDepartments: (d: Department[]) => void,
  mediaLibrary: MediaItem[],
  onUpdateMedia: (m: MediaItem[]) => void
}) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [newDept, setNewDept] = useState('');

  const handleEdit = (member: TeamMember) => {
    setEditingMember({ ...member });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingMember({
      id: `member_${Date.now()}`,
      name: '',
      role: '',
      departmentId: departments[0]?.id || '',
      image: '',
      bio: '',
      skills: [],
      experienceYears: 0,
      certifications: [],
      achievements: [],
      social: {}
    });
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!editingMember) return;
    const updatedTeam = isCreating 
      ? [...team, editingMember] 
      : team.map(m => m.id === editingMember.id ? editingMember : m);
    onUpdateTeam(updatedTeam);
    setEditingMember(null);
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDept.trim()) {
      onUpdateDepartments([...departments, { id: `dept_${Date.now()}`, name: newDept.trim() }]);
      setNewDept('');
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(team, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "team_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          onUpdateTeam(data);
          alert('تم استيراد البيانات بنجاح!');
        }
      } catch (err) {
        alert('خطأ في تنسيق الملف.');
      }
    };
    reader.readAsText(file);
  };

  if (editingMember) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{isCreating ? 'إضافة عضو جديد' : 'تعديل بيانات العضو'}</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold mb-1">الاسم</label><input type="text" value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
            <div><label className="block text-sm font-bold mb-1">المسمى الوظيفي</label><input type="text" value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">القسم</label>
              <select value={editingMember.departmentId} onChange={e => setEditingMember({...editingMember, departmentId: e.target.value})} className="w-full p-2 border rounded-lg">
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-bold mb-1">سنوات الخبرة</label><input type="number" value={editingMember.experienceYears} onChange={e => setEditingMember({...editingMember, experienceYears: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg"/></div>
          </div>

          <div>
             <label className="block text-sm font-bold mb-1">رابط الصورة (او اختر من المكتبة)</label>
             <div className="flex gap-2">
                <input type="text" value={editingMember.image} onChange={e => setEditingMember({...editingMember, image: e.target.value})} className="flex-grow p-2 border rounded-lg" dir="ltr"/>
                {/* <button className="bg-slate-100 px-4 rounded-lg text-slate-600">اختيار</button> */}
             </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">المهارات (افصل بينها بفاصلة)</label>
            <input type="text" value={editingMember.skills.join(', ')} onChange={e => setEditingMember({...editingMember, skills: e.target.value.split(',').map(s => s.trim())})} className="w-full p-2 border rounded-lg" placeholder="مثلاً: قيادة، تخطيط، إدارة"/>
          </div>

          <div><label className="block text-sm font-bold mb-1">السيرة الذاتية</label><WysiwygEditor value={editingMember.bio} onChange={v => setEditingMember({...editingMember, bio: v})} mediaLibrary={mediaLibrary} onUpdateMedia={onUpdateMedia} /></div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold mb-1">البريد الإلكتروني</label><input type="email" value={editingMember.social.email || ''} onChange={e => setEditingMember({...editingMember, social: {...editingMember.social, email: e.target.value}})} className="w-full p-2 border rounded-lg" dir="ltr"/></div>
            <div><label className="block text-sm font-bold mb-1">رابط LinkedIn</label><input type="text" value={editingMember.social.linkedin || ''} onChange={e => setEditingMember({...editingMember, social: {...editingMember.social, linkedin: e.target.value}})} className="w-full p-2 border rounded-lg" dir="ltr"/></div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"><Icon name="Save" size={18}/> حفظ البيانات</button>
            <button onClick={() => setEditingMember(null)} className="bg-slate-200 px-6 py-2 rounded-lg">إلغاء</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">إدارة فريق العمل</h2>
          <p className="text-slate-500 text-sm">أضف عدل أو احذف أعضاء الفريق ونظم الهيكل الإداري</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExport} className="bg-white border text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition"><Icon name="Download" size={18}/> تصدير</button>
          <label className="bg-white border text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer">
            <Icon name="Upload" size={18}/> استيراد
            <input type="file" onChange={handleImport} className="hidden" accept=".json"/>
          </label>
          <button onClick={handleCreate} className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/20"><Icon name="Plus" size={18}/> إضافة عضو</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-4">الموظف</th>
                  <th className="p-4">القسم</th>
                  <th className="p-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {team.map(member => (
                  <tr key={member.id} className="border-b last:border-0 hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={member.image} className="w-10 h-10 rounded-full object-cover"/>
                        <div>
                          <p className="font-bold text-slate-800">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {departments.find(d => d.id === member.departmentId)?.name || 'غير مصنف'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(member)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition"><Icon name="Edit2" size={16}/></button>
                        <button onClick={() => setShowConfirm(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"><Icon name="Trash2" size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Icon name="GripVertical" size={18}/> الأقسام</h3>
            <form onSubmit={handleAddDept} className="flex gap-2 mb-4">
              <input type="text" value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="قسم جديد..." className="flex-grow p-2 border rounded-lg text-sm" />
              <button type="submit" className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-900"><Icon name="Plus" size={18}/></button>
            </form>
            <ul className="space-y-2">
              {departments.map(dept => (
                <li key={dept.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg group">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <button onClick={() => onUpdateDepartments(departments.filter(d => d.id !== dept.id))} className="text-red-400 opacity-0 group-hover:opacity-100 transition"><Icon name="Trash2" size={14}/></button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2"><Icon name="Award" size={18}/> إحصائيات سريعة</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>إجمالي الفريق:</span><span className="font-bold">{team.length}</span></div>
              <div className="flex justify-between"><span>متوسط الخبرة:</span><span className="font-bold">{(team.length > 0 ? (team.reduce((acc, m) => acc + m.experienceYears, 0) / team.length) : 0).toFixed(1)} سنة</span></div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog isOpen={!!showConfirm} onConfirm={() => { onUpdateTeam(team.filter(m => m.id !== showConfirm)); setShowConfirm(null); }} onCancel={() => setShowConfirm(null)} />
    </div>
  );
};

export default EditorTeam;