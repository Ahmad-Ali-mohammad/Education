import React from 'react';
import { Project } from '../types';
import ShareButtons from '../components/ShareButtons';
import Icon from '../components/Icon';

const ProjectDetailPage = ({ project, navigate }: { project: Project, navigate: (p:string)=>void }) => (
    <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
            <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-blue-500 mb-8 font-semibold hover:underline">
                <Icon name="ArrowRight" size={18}/> العودة إلى كل المشاريع
            </button>
            <img src={project.image} alt={project.title} className="w-full h-96 object-cover rounded-2xl shadow-xl mb-8"/>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{project.title}</h1>
            <div className="mb-8"><ShareButtons url={window.location.href} title={project.title} /></div>
            <div className="prose prose-lg max-w-none ql-snow">
                <div className="ql-editor !p-0" dangerouslySetInnerHTML={{ __html: project.description }}/>
            </div>
            {project.gallery && project.gallery.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-12 border-b-2 border-blue-500 pb-2">معرض الصور</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.gallery.map((img, index) => <img key={index} src={img} className="w-full h-40 object-cover rounded-lg shadow-md"/>)}
                    </div>
                </>
            )}
        </div>
    </div>
);

export default ProjectDetailPage;