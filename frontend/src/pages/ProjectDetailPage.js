import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const ProjectDetailPage = ({ projectId, navigate }) => {
  const { content } = useContent();
  const project = content.projects?.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="py-40 text-center">
        <Icon name="FolderX" size={64} className="mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-4">المشروع غير موجود</h1>
        <button 
          onClick={() => navigate('/projects')}
          className="text-blue-500 hover:underline"
        >
          العودة للمشاريع
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-20">
      {/* Hero */}
      <div className="relative h-96">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex gap-2 justify-center mb-4">
              <span className={`text-sm px-4 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {project.status === 'completed' ? 'مكتمل' : 'جاري'}
              </span>
            </div>
            <h1 className="text-4xl font-bold">{project.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div 
          className="prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: project.description }} 
        />
        
        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">معرض الصور</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Gallery ${idx + 1}`} 
                  className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition" 
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/projects')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            <Icon name="ArrowRight" className="inline ml-2" size={20} />
            العودة للمشاريع
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
