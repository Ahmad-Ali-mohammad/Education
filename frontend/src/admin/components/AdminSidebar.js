import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const { user, logout, hasRole } = useAuth();
  
  const menuItems = [
    { id: 'dashboard', icon: 'LayoutDashboard', label: t('dashboard'), roles: ['admin', 'editor', 'viewer'] },
    { id: 'pages', icon: 'File', label: t('pages'), roles: ['admin', 'editor'] },
    { id: 'navigation', icon: 'Menu', label: t('navigation'), roles: ['admin', 'editor'] },
    { id: 'hero', icon: 'Home', label: t('hero'), roles: ['admin', 'editor'] },
    { id: 'about', icon: 'FileText', label: t('about'), roles: ['admin', 'editor'] },
    { id: 'projects', icon: 'Briefcase', label: t('projects'), roles: ['admin', 'editor'] },
    { id: 'jobs', icon: 'Users', label: t('jobs'), roles: ['admin', 'editor'] },
    { id: 'services', icon: 'HeartHandshake', label: t('services'), roles: ['admin', 'editor'] },
    { id: 'beneficiaries', icon: 'Smile', label: t('beneficiaries'), roles: ['admin', 'editor'] },
    { id: 'team', icon: 'Users', label: t('team'), roles: ['admin', 'editor'] },
    { id: 'articles', icon: 'Newspaper', label: t('articles'), roles: ['admin', 'editor'] },
    { id: 'tags-categories', icon: 'Tag', label: t('tagsCategories'), roles: ['admin', 'editor'] },
    { id: 'events', icon: 'CalendarDays', label: t('events'), roles: ['admin', 'editor'] },
    { id: 'comments', icon: 'MessageSquare', label: t('comments'), roles: ['admin', 'editor'] },
    { id: 'donations', icon: 'Heart', label: t('donations'), roles: ['admin', 'editor'] },
    { id: 'media', icon: 'Image', label: t('media'), roles: ['admin', 'editor'] },
    { id: 'users', icon: 'UserCog', label: t('users'), roles: ['admin'] },
    { id: 'settings', icon: 'Settings', label: t('settings'), roles: ['admin'] },
  ];
  
  const filteredItems = menuItems.filter(item => hasRole(item.roles));
  
  const handleLogout = () => {
    logout();
    window.location.hash = '#/';
  };
  
  return (
    <div className="w-64 bg-slate-800 text-white h-screen fixed right-0 top-0 flex flex-col shadow-xl z-[60]">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Icon name="Settings" className="text-blue-400" />
          CMS Admin
        </h2>
        <p className="text-xs text-slate-400 mt-2">نظام إدارة المحتوى</p>
      </div>
      
      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <Icon name="User" size={20} />
            )}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">
              {user?.role === 'admin' ? t('admin') : user?.role === 'editor' ? t('editor') : t('viewer')}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {filteredItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white border-l-4 border-white'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
                data-testid={`admin-nav-${item.id}`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2 transition"
          data-testid="admin-logout"
        >
          <Icon name="LogOut" size={20} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
