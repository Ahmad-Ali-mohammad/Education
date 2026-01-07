import React from 'react';
import { Project } from '../../types';

const EditorProjects = ({ projects, onUpdate }: { projects: Project[], onUpdate: (p: Project[]) => void }) => {
    // Placeholder for a full CRUD UI
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">إدارة المشاريع (قيد الإنشاء)</h2>
            <p className="text-slate-500 mt-2">هذا القسم مخصص لإدارة المشاريع الحالية والمنتهية وقصص النجاح.</p>
        </div>
    );
};

export default EditorProjects;
