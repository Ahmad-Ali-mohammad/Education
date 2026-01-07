import React from 'react';
import { SiteContent } from '../types';

const BeneficiariesPage = ({ pageData, stats }: { pageData: SiteContent['beneficiariesPage'], stats: SiteContent['stats'] }) => (
    <div className="py-20 bg-slate-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
            </div>
            {stats.visible && (
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {stats.items.map(stat => (
                        <div key={stat.id} className="bg-white p-6 rounded-xl shadow text-center">
                            <div className="text-4xl font-bold mb-2 text-blue-500">{stat.value}</div>
                            <div className="text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">قصص نجاح</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {pageData.stories.map(story => (
                        <div key={story.id} className="flex flex-col sm:flex-row items-center gap-6 text-right">
                            <img src={story.image} alt={story.name} className="w-32 h-32 rounded-full object-cover shrink-0 shadow-md" />
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{story.name} - {story.year}</h3>
                                <p className="text-slate-600 leading-relaxed italic">"{story.story}"</p>
                                <p className="text-sm text-blue-500 font-semibold mt-2">مشروع: {story.project}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default BeneficiariesPage;
