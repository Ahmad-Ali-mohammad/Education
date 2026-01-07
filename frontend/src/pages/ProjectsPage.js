import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const ProjectsPage = ({ navigate }) => {
  const { content } = useContent();
  const { projects, projectsPage } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{projectsPage?.title || 'مشاريعنا'}</h1>
          <p className="text-xl opacity-90">{projectsPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {projects?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FolderOpen" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد مشاريع حالياً</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer" 
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                      {project.status === 'completed' ? 'مكتمل' : 'جاري'}
                    </span>
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      {project.category === 'latest' ? 'حديث' : 'قصة نجاح'}
                    </span>
                  </div>
                </div>
                <div className="p-6 text-right">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-500 transition">
                    {project.title}
                  </h3>
                  <div 
                    className="text-slate-600 text-sm line-clamp-3" 
                    dangerouslySetInnerHTML={{ __html: project.description?.substring(0, 150) + '...' }} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
