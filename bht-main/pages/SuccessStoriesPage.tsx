import React from 'react';
import { PageContent, Project } from '../types';

const SuccessStoriesPage = ({ pageData, projects, navigate }: { pageData: PageContent, projects: Project[], navigate:(p:string)=>void }) => {
    const successStories = projects.filter(p => p.category === 'success_story');

    return (
        <div className="py-20 bg-slate-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                    <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
                </div>
                
                {successStories.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {successStories.map(project => (
                            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                                <div className="relative h-56 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
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
                ) : (
                    <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                        <p className="text-slate-500">لا توجد قصص نجاح لعرضها حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessStoriesPage;
