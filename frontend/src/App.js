import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider, useContent } from './context/ContentContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConfirmDialog from './components/ConfirmDialog';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TeamPage from './pages/TeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ServicesPage from './pages/ServicesPage';
import JobsPage from './pages/JobsPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import BeneficiariesPage from './pages/BeneficiariesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import DynamicPageView from './pages/DynamicPageView';
import NotFoundPage from './pages/NotFoundPage';

// Admin
import AdminSidebar from './admin/components/AdminSidebar';
import AdminHeader from './admin/components/AdminHeader';
import DashboardHome from './admin/DashboardHome';
import EditorHero from './admin/editors/EditorHero';
import EditorAbout from './admin/editors/EditorAbout';
import EditorServices from './admin/editors/EditorServices';
import EditorProjects from './admin/editors/EditorProjects';
import EditorTeam from './admin/editors/EditorTeam';
import EditorArticles from './admin/editors/EditorArticles';
import EditorPages from './admin/editors/EditorPages';
import EditorNavigation from './admin/editors/EditorNavigation';
import EditorMedia from './admin/editors/EditorMedia';
import EditorUsers from './admin/editors/EditorUsers';
import EditorComments from './admin/editors/EditorComments';
import EditorSettings from './admin/editors/EditorSettings';
import EditorDonations from './admin/editors/EditorDonations';
import EditorTagsAndCategories from './admin/editors/EditorTagsAndCategories';
import EditorEvents from './admin/editors/EditorEvents';
import EditorJobs from './admin/editors/EditorJobs';
import EditorBeneficiaries from './admin/editors/EditorBeneficiaries';

// Router Component
const Router = () => {
  const [route, setRoute] = useState('/');
  const [params, setParams] = useState({});
  const { i18n } = useTranslation();
  const { isAuthenticated, hasRole, loading: authLoading } = useAuth();
  const { content, loading: contentLoading, hasChanges, publishContent, discardChanges } = useContent();
  const [adminTab, setAdminTab] = useState('dashboard');
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  const parseRoute = useCallback(() => {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...rest] = hash.split('/');
    
    if (hash.startsWith('/admin')) {
      setRoute('/admin');
      return;
    }
    if (hash.startsWith('/login')) {
      setRoute('/login');
      return;
    }
    if (hash.startsWith('/projects/')) {
      setRoute('/projects/:id');
      setParams({ id: hash.split('/')[2] });
      return;
    }
    if (hash.startsWith('/team/')) {
      setRoute('/team/:id');
      setParams({ id: hash.split('/')[2] });
      return;
    }
    if (hash.startsWith('/articles/')) {
      setRoute('/articles/:id');
      setParams({ id: hash.split('/')[2] });
      return;
    }
    if (hash.startsWith('/p/')) {
      setRoute('/p/:slug');
      setParams({ slug: hash.split('/')[2] });
      return;
    }
    
    setRoute(hash || '/');
    setParams({});
  }, []);
  
  useEffect(() => {
    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    return () => window.removeEventListener('hashchange', parseRoute);
  }, [parseRoute]);
  
  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);
  
  const handlePublish = async () => {
    await publishContent();
    setShowPublishConfirm(false);
  };
  
  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }
  
  // Login Page
  if (route === '/login') {
    return <LoginPage navigate={navigate} />;
  }
  
  // Admin Panel
  if (route === '/admin') {
    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }
    
    const renderAdminContent = () => {
      switch (adminTab) {
        case 'dashboard': return <DashboardHome />;
        case 'hero': return <EditorHero />;
        case 'about': return <EditorAbout />;
        case 'services': return <EditorServices />;
        case 'projects': return <EditorProjects />;
        case 'team': return <EditorTeam />;
        case 'articles': return <EditorArticles />;
        case 'pages': return <EditorPages />;
        case 'navigation': return <EditorNavigation />;
        case 'media': return <EditorMedia />;
        case 'users': return hasRole('admin') ? <EditorUsers /> : <DashboardHome />;
        case 'comments': return <EditorComments />;
        case 'settings': return hasRole('admin') ? <EditorSettings /> : <DashboardHome />;
        case 'donations': return <EditorDonations />;
        case 'tags-categories': return <EditorTagsAndCategories />;
        case 'events': return <EditorEvents />;
        case 'jobs': return <EditorJobs />;
        case 'beneficiaries': return <EditorBeneficiaries />;
        default: return <DashboardHome />;
      }
    };
    
    return (
      <div className="min-h-screen bg-slate-100" dir="rtl">
        <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} />
        <div className="mr-64">
          <AdminHeader
            hasChanges={hasChanges}
            onPublish={() => setShowPublishConfirm(true)}
            onDiscard={discardChanges}
            onPreview={() => window.open('#/', '_blank')}
          />
          <main className="min-h-[calc(100vh-64px)]">
            {renderAdminContent()}
          </main>
        </div>
        
        <ConfirmDialog
          isOpen={showPublishConfirm}
          onConfirm={handlePublish}
          onCancel={() => setShowPublishConfirm(false)}
          title="نشر التغييرات"
          message="هل أنت متأكد من نشر جميع التغييرات؟"
        />
      </div>
    );
  }
  
  // Public Pages
  const renderPage = () => {
    switch (route) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/projects':
        return <ProjectsPage navigate={navigate} />;
      case '/projects/:id':
        return <ProjectDetailPage projectId={params.id} navigate={navigate} />;
      case '/team':
        return <TeamPage navigate={navigate} />;
      case '/team/:id':
        return <TeamMemberDetailPage memberId={params.id} navigate={navigate} />;
      case '/articles':
        return <ArticlesPage navigate={navigate} />;
      case '/articles/:id':
        return <ArticleDetailPage articleId={params.id} navigate={navigate} />;
      case '/services':
        return <ServicesPage />;
      case '/jobs':
        return <JobsPage />;
      case '/contact':
        return <ContactPage />;
      case '/donate':
        return <DonatePage />;
      case '/beneficiaries':
        return <BeneficiariesPage />;
      case '/success-stories':
        return <SuccessStoriesPage navigate={navigate} />;
      case '/p/:slug':
        const page = content.pages?.find(p => p.slug === params.slug && p.status === 'published');
        return page ? <DynamicPageView page={page} /> : <NotFoundPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar navigation={content.navigation || []} navigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer data={content.contact} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router />
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
