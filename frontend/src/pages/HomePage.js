import React from 'react';
import Icon from './Icon';
import { useContent } from '../context/ContentContext';

// Hero Section
export const Hero = ({ data }) => (
  <section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ backgroundImage: `url(${data?.image})` }}
    />
    <div className="absolute inset-0 bg-slate-900/70" />
    <div className="relative text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{data?.title}</h1>
      <p className="text-xl md:text-2xl mb-8 font-light">{data?.subtitle}</p>
      {data?.cta_text && (
        <a 
          href={data?.cta_link || '#about'} 
          className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg transform hover:-translate-y-1"
        >
          {data?.cta_text}
          <Icon name="ArrowRight" className="mr-2 h-5 w-5 rotate-180" />
        </a>
      )}
    </div>
  </section>
);

// Stats Section
export const Stats = ({ data }) => {
  if (!data?.visible || !data?.items?.length) return null;
  
  return (
    <div className="bg-blue-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {data.items.map(stat => (
            <div key={stat.id} className="p-4">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Section
export const AboutSection = ({ data }) => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <img 
            src={data?.image} 
            alt="About" 
            className="rounded-2xl shadow-2xl w-full h-96 object-cover" 
          />
        </div>
        <div className="order-1 md:order-2 text-right">
          <h2 className="text-blue-500 font-bold text-lg mb-2">من نحن</h2>
          <h3 className="text-3xl font-bold text-slate-900 mb-6">{data?.title}</h3>
          <div 
            className="prose prose-lg max-w-none text-slate-600 mb-6" 
            dangerouslySetInnerHTML={{ __html: data?.intro }} 
          />
          <div 
            className="prose max-w-none text-slate-500" 
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
      </div>
    </div>
  </section>
);

// Services Section
export const ServicesSection = ({ data }) => (
  <section id="services" className="py-20 bg-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">خدماتنا الأساسية</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {data?.map(service => (
          <div 
            key={service.id} 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
              <Icon name={service.icon || 'Star'} className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Team Section
export const TeamSection = ({ team, departments, navigate }) => (
  <section id="team" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">فريق العمل</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4" />
        <p className="text-slate-600">خبراء متفانون في تمكين المجتمعات</p>
      </div>
      {departments?.slice(0, 2).map(dept => {
        const deptMembers = team?.filter(m => m.departmentId === dept.id).slice(0, 4) || [];
        if (deptMembers.length === 0) return null;
        return (
          <div key={dept.id} className="mb-8">
            <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">{dept.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {deptMembers.map(member => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300" 
                  onClick={() => navigate(`/team/${member.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-500 transition">
                      {member.name}
                    </h4>
                    <p className="text-slate-500 font-medium text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="text-center mt-12">
        <button 
          onClick={() => navigate('/team')} 
          className="text-blue-500 font-bold hover:underline"
        >
          تعرف على كل الفريق
        </button>
      </div>
    </div>
  </section>
);

// Projects Section
export const ProjectsSection = ({ projects, navigate }) => (
  <section id="projects" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">مشاريعنا وإنجازاتنا</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {projects?.slice(0, 3).map(project => (
          <div 
            key={project.id} 
            className="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer" 
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                {project.category === 'latest' ? 'حديث' : 'قصة نجاح'}
              </div>
            </div>
            <div className="p-6 text-right">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
              <div 
                className="text-slate-600 text-sm line-clamp-2" 
                dangerouslySetInnerHTML={{ __html: project.description?.substring(0, 100) + '...' }} 
              />
              <span className="mt-4 text-blue-500 font-bold text-sm inline-block">اقرأ المزيد</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Donation Section
export const DonationSection = ({ data, navigate }) => {
  const progress = Math.min((data?.current / data?.goal) * 100, 100) || 0;
  
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{data?.title || 'ساهم معنا'}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">{data?.description}</p>
        <div className="max-w-xl mx-auto mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>${(data?.current || 0).toLocaleString()} تم جمعه</span>
            <span>الهدف: ${(data?.goal || 0).toLocaleString()}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4">
            <div 
              className="bg-white h-4 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button 
          onClick={() => navigate('/donate')} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg transform hover:-translate-y-1 inline-flex items-center gap-2"
        >
          <Icon name="Heart" size={18}/> تبرع الآن
        </button>
      </div>
    </section>
  );
};

// Main HomePage Component
const HomePage = ({ navigate }) => {
  const { content } = useContent();
  
  return (
    <>
      <Hero data={content.hero} />
      <Stats data={content.stats} />
      <AboutSection data={content.about} />
      <ServicesSection data={content.services} />
      <TeamSection team={content.team} departments={content.departments} navigate={navigate} />
      <ProjectsSection projects={content.projects} navigate={navigate} />
      <DonationSection data={content.donation} navigate={navigate} />
    </>
  );
};

export default HomePage;
