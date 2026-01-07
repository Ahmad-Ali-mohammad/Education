import React from 'react';
import { DynamicPage } from '../types';

const DynamicPageView = ({ page }: { page: DynamicPage }) => (
    <div className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">{page.title}</h1>
            <div className="prose prose-lg max-w-none ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: page.content }}/>
            </div>
        </div>
    </div>
);

export default DynamicPageView;
