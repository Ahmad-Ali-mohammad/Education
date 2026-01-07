import React from 'react';
import { Event } from '../../types';

const EditorEvents = ({ events, onUpdate }: { events: Event[], onUpdate: (e: Event[]) => void }) => {
    // Placeholder for a full CRUD UI
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">إدارة الأحداث (قيد الإنشاء)</h2>
            <p className="text-slate-500 mt-2">هذا القسم مخصص لإدارة الأحداث القادمة والسابقة.</p>
        </div>
    );
};

export default EditorEvents;
