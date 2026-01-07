import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteContent, INITIAL_CONTENT, HistoryEntry } from './types';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import JobsPage from './pages/JobsPage';
import ServicesPage from './pages/ServicesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import BeneficiariesPage from './pages/BeneficiariesPage';
import TeamPage from './pages/TeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import DynamicPageView from './pages/DynamicPageView';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

// Admin Components
import AdminSidebar from './admin/components/AdminSidebar';
import AdminHeader from './admin/components/AdminHeader';
import DashboardHome from './admin/DashboardHome';
import EditorMedia from './admin/editors/EditorMedia';
import EditorPages from './admin/editors/EditorPages';
import EditorNavigation from './admin/editors/EditorNavigation';
import EditorTeam from './admin/editors/EditorTeam';
import EditorHero from './admin/editors/EditorHero';
import EditorAbout from './admin/editors/EditorAbout';
import EditorServices from './admin/editors/EditorServices';
import EditorArticles from './admin/editors/EditorArticles';
import EditorTagsAndCategories from './admin/editors/EditorTagsAndCategories';
import EditorEvents from './admin/editors/EditorEvents';
import EditorBeneficiaries from './admin/editors/EditorBeneficiaries';
import EditorProjects from './admin/editors/EditorProjects';
import EditorJobs from './admin/editors/EditorJobs';
import EditorDonations from './admin/editors/EditorDonations';
import EditorSettings from './admin/editors/EditorSettings';

// Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// --- Utility: Non-destructive Local Storage Wrapper ---
const PUBLISHED_KEY = 'bht_cms_content_published_v3';
const DRAFT_KEY = 'bht_cms_content_draft_v3';
const HISTORY_KEY = 'bht_cms_content_history_v3';

const getContent = (key: string, fallback: any = null): any => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
};

const loadContent = (isAdmin: boolean, isPreview: boolean): SiteContent => {
  if (isAdmin || isPreview) {
    const draftContent = getContent(DRAFT_KEY);
    if (draftContent) return draftContent;
    const publishedContent = getContent(PUBLISHED_KEY, INITIAL_CONTENT);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(publishedContent));
    return publishedContent;
  }
  return getContent(PUBLISHED_KEY, INITIAL_CONTENT);
};

const saveDraft = (content: SiteContent) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
};

const publishChanges = (): SiteContent => {
  const draftContent = getContent(DRAFT_KEY, INITIAL_CONTENT);
  const publishedContent = getContent(PUBLISHED_KEY, INITIAL_CONTENT);
  const history = getContent(HISTORY_KEY, []);
  history.unshift({ timestamp: new Date().toISOString(), content: publishedContent });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  localStorage.setItem(PUBLISHED_KEY, JSON.stringify(draftContent));
  return draftContent;
};

const discardChanges = (): SiteContent => {
  const publishedContent = getContent(PUBLISHED_KEY, INITIAL_CONTENT);
  localStorage.setItem(DRAFT_KEY, JSON.stringify(publishedContent));
  return publishedContent;
}

const restoreVersion = (version: HistoryEntry): SiteContent => {
    const currentPublished = getContent(PUBLISHED_KEY, INITIAL_CONTENT);
    const history = getContent(HISTORY_KEY, []);
    history.unshift({ timestamp: new Date().toISOString(), content: currentPublished });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify(version.content));
    localStorage.setItem(DRAFT_KEY, JSON.stringify(version.content));
    return version.content;
};

// Main App Component
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const getRouteInfo = () => {
      const hash = window.location.hash.substring(1);
      const [path, query] = hash.split('?');
      const params = new URLSearchParams(query);
      return {
          route: path || '/',
          isPreview: params.get('preview') === 'true'
      };
  };
  const [routeInfo, setRouteInfo] = useState(getRouteInfo());
  
  useEffect(() => {
    const { route, isPreview } = routeInfo;
    const isLoginOrAdmin = route.startsWith('/admin') || route === '/login';
    const newContent = loadContent(isAdmin || isLoginOrAdmin, isPreview);
    setContent(newContent);
    
    if (isAdmin) {
      const publishedContent = getContent(PUBLISHED_KEY);
      setHasUnpublishedChanges(JSON.stringify(newContent) !== JSON.stringify(publishedContent));
      setHistory(getContent(HISTORY_KEY, []));
    }
  }, [routeInfo, isAdmin]);

  useEffect(() => {
    const handleHashChange = () => setRouteInfo(getRouteInfo());
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '') window.location.hash = '/';
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  useEffect(() => {
    const { route } = routeInfo;
    const pageMatch = route.match(/^\/p\/(.+)$/);
    let page;
    if(route === '/') page = content.pages.find(p => p.isHomepage && p.status === 'published');
    else if (pageMatch) page = content.pages.find(p => p.slug === pageMatch[1] && p.status === 'published');

    if (page) {
        document.title = page.seo.metaTitle || page.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', page.seo.metaDescription || '');
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', page.seo.metaKeywords || '');
    } else {
        document.title = 'BHT - مؤسسة أمل أفضل للطبقة';
        document.querySelector('meta[name="description"]')?.setAttribute('content', content.seo.metaDescription);
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', content.seo.metaKeywords);
    }
  }, [routeInfo, content.pages, content.seo]);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (getRouteInfo().route !== '/') {
        window.location.hash = '/';
        setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (window.location.hash.substring(1) === path) return;
      window.scrollTo(0, 0);
      window.location.hash = path;
    }
  };

  const updateContent = (section: keyof SiteContent, data: any) => { 
    const newContent = { ...content, [section]: data }; 
    setContent(newContent);
    saveDraft(newContent);
    setHasUnpublishedChanges(true);
  };
  
  const handleLogin = (password: string) => { 
    if (password === 'admin123') { 
      setIsAdmin(true); 
      navigate('/admin/dashboard'); 
    } else alert('كلمة المرور غير صحيحة'); 
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  const handlePublish = () => {
    if (confirm('هل أنت متأكد من نشر التغييرات؟ سيصبح هذا هو الموقع المباشر.')) {
      const publishedContent = publishChanges();
      setContent(publishedContent);
      setHasUnpublishedChanges(false);
      alert('تم النشر بنجاح!');
    }
  };
  
  const handleDiscard = () => {
    if (confirm('هل أنت متأكد من تجاهل كل التغييرات غير المنشورة؟')) {
      const publishedContent = discardChanges();
      setContent(publishedContent);
      setHasUnpublishedChanges(false);
    }
  };

  const handlePreview = () => {
    const url = `${window.location.origin}${window.location.pathname}?preview=true#${routeInfo.route}`;
    window.open(url, '_blank');
  };

  const handleRestore = (version: HistoryEntry) => {
    const restoredContent = restoreVersion(version);
    setContent(restoredContent);
    setHasUnpublishedChanges(false);
    alert('تم استعادة الإصدار بنجاح.');
  };

  const { route } = routeInfo;
  if (route.startsWith('/admin') || route === '/login') {
      if (!isAdmin) return <LoginPage onLogin={handleLogin} onCancel={() => navigate('/')} />
      return (
        <div className="flex bg-slate-100 min-h-screen" dir="rtl">
          <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} onLogout={handleLogout} />
          <div className="flex-1 mr-64 flex flex-col">
            <AdminHeader hasChanges={hasUnpublishedChanges} onPublish={handlePublish} onDiscard={handleDiscard} onPreview={handlePreview} />
            <main className="flex-1 overflow-y-auto">
             {adminTab === 'dashboard' && <DashboardHome content={content} />}
             {adminTab === 'media' && <EditorMedia media={content.mediaLibrary} onUpdate={(d) => updateContent('mediaLibrary', d)} />}
             {adminTab === 'pages' && <EditorPages pages={content.pages} onUpdate={(d) => updateContent('pages', d)} mediaLibrary={content.mediaLibrary} onUpdateMedia={(d) => updateContent('mediaLibrary', d)} />}
             {adminTab === 'navigation' && <EditorNavigation navigation={content.navigation} pages={content.pages} onUpdate={(d) => updateContent('navigation', d)}/>}
             {adminTab === 'team' && <EditorTeam team={content.team} departments={content.departments} onUpdateTeam={(d) => updateContent('team', d)} onUpdateDepartments={(d) => updateContent('departments', d)} mediaLibrary={content.mediaLibrary} onUpdateMedia={(d) => updateContent('mediaLibrary', d)} />}
             {adminTab === 'hero' && <EditorHero data={content.hero} onSave={(d) => updateContent('hero', d)} />}
             {adminTab === 'about' && <EditorAbout data={content.about} onSave={(d) => updateContent('about', d)} mediaLibrary={content.mediaLibrary} onUpdateMedia={(d) => updateContent('mediaLibrary', d)} />}
             {adminTab === 'services' && <EditorServices services={content.services} onUpdate={(d) => updateContent('services', d)} />}
             {adminTab === 'articles' && <EditorArticles articles={content.articles} categories={content.categories} tags={content.tags} onUpdate={(d) => updateContent('articles', d)} mediaLibrary={content.mediaLibrary} onUpdateMedia={(d) => updateContent('mediaLibrary', d)} />}
             {adminTab === 'tags-categories' && <EditorTagsAndCategories categories={content.categories} tags={content.tags} onUpdateCategories={(d) => updateContent('categories', d)} onUpdateTags={(d) => updateContent('tags', d)} />}
             {adminTab === 'events' && <EditorEvents events={content.events} onUpdate={(d) => updateContent('events', d)} />}
             {adminTab === 'beneficiaries' && <EditorBeneficiaries pageData={content.beneficiariesPage} onUpdate={(d) => updateContent('beneficiariesPage', d)} />}
             {adminTab === 'projects' && <EditorProjects projects={content.projects} onUpdate={(d) => updateContent('projects', d)} />}
             {adminTab === 'jobs' && <EditorJobs jobs={content.jobs} onUpdate={(d) => updateContent('jobs', d)} />}
             {adminTab === 'donations' && <EditorDonations data={content.donation} onSave={(d) => updateContent('donation', d)} />}
             {/* Fix: Corrected component name from SettingsEditor to EditorSettings to match the import. */}
             {adminTab === 'settings' && <EditorSettings data={content.contact} seo={content.seo} history={history} onSave={(d) => { updateContent('contact', d.contact); updateContent('seo', d.seo); }} onRestore={handleRestore} />}
            </main>
          </div>
        </div>
      );
  }

  const renderPublicPage = () => {
    const projectMatch = route.match(/^\/projects\/(\w+)$/);
    if (projectMatch) { const project = content.projects.find(p => p.id === projectMatch[1]); return project ? <ProjectDetailPage project={project} navigate={navigate} /> : <NotFoundPage />; }
    
    const teamMatch = route.match(/^\/team\/(\w+)$/);
    if (teamMatch) { const member = content.team.find(m => m.id === teamMatch[1]); return member ? <TeamMemberDetailPage member={member} departments={content.departments} navigate={navigate} /> : <NotFoundPage />; }
    
    const articleMatch = route.match(/^\/articles\/(\w+)$/);
    if (articleMatch) { const article = content.articles.find(a => a.id === articleMatch[1]); return article ? <ArticleDetailPage article={article} categories={content.categories} tags={content.tags} navigate={navigate} /> : <NotFoundPage />; }
   
    const pageMatch = route.match(/^\/p\/(.+)$/);
    if (pageMatch) { const page = content.pages.find(p => p.slug === pageMatch[1] && p.status === 'published'); return page ? <DynamicPageView page={page} /> : <NotFoundPage />; }

    switch (route) {
      case '/about': return <AboutPage pageData={content.aboutPage} content={content.about} />;
      case '/projects': return <ProjectsPage pageData={content.projectsPage} projects={content.projects} navigate={navigate}/>;
      case '/jobs': return <JobsPage pageData={content.jobsPage} jobs={content.jobs} />;
      case '/services': return <ServicesPage pageData={content.servicesPage} services={content.services} />;
      case '/success-stories': return <SuccessStoriesPage pageData={content.successStoriesPage} projects={content.projects} navigate={navigate}/>;
      case '/beneficiaries': return <BeneficiariesPage pageData={content.beneficiariesPage} stats={content.stats} />;
      case '/team': return <TeamPage pageData={content.teamPage} team={content.team} departments={content.departments} navigate={navigate}/>;
      case '/articles': return <ArticlesPage pageData={content.articlesPage} articles={content.articles} categories={content.categories} tags={content.tags} navigate={navigate}/>;
      case '/contact': return <ContactPage pageData={content.contactPage} contact={content.contact} />;
      case '/donate': return <DonatePage pageData={content.donatePage} />;
      case '/':
        const homePage = content.pages.find(p => p.isHomepage && p.status === 'published');
        if (homePage) return <DynamicPageView page={homePage} />;
        return <HomePage content={content} navigate={navigate} />;
      default: return <NotFoundPage/>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar navigation={content.navigation} onLoginClick={() => navigate('/login')} navigate={navigate} />
      <main className="flex-grow pt-20"> {renderPublicPage()} </main>
      <Footer data={content.contact} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);