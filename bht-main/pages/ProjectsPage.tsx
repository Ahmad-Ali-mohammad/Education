import React from 'react';
import { PageContent, Project } from '../types';

const ProjectsPage = ({ pageData, projects, navigate }: { pageData: PageContent, projects: Project[], navigate:(p:string)=>void }) => (
    <div className="py-20 bg-slate-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                        <div className="relative h-56 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className={`absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full ${project.category === 'success_story' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {project.category === 'latest' ? 'مشروع حديث' : 'قصة نجاح'}
                            </div>
                             <div className={`absolute bottom-4 right-4 text-white text-xs px-3 py-1 rounded-full ${project.status === 'completed' ? 'bg-slate-700' : 'bg-yellow-500'}`}>
                                {project.status === 'completed' ? 'مكتمل' : 'جاري التنفيذ'}
                            </div>
                        </div>
                        <div className="p-6 text-right">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 h-14 overflow-hidden">{project.title}</h3>
                            <div className="text-slate-600 text-sm line-clamp-3 h-20 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: project.description }} />
                            <span className="mt-4 text-blue-500 font-bold text-sm inline-block group-hover:underline">
                                اقرأ المزيد
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ProjectsPage;
