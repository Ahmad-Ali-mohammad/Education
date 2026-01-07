import React from 'react';
import { Service } from '../../types';

const EditorServices = ({ services, onUpdate }: { services: Service[], onUpdate: (s: Service[]) => void }) => {
    // Placeholder for a full CRUD UI
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">إدارة الخدمات (قيد الإنشاء)</h2>
            <p className="text-slate-500 mt-2">هذا القسم مخصص لإدارة الخدمات التي تقدمها المؤسسة.</p>
        </div>
    );
};

export default EditorServices;
