import React from 'react';
import { PageContent, SiteContent } from '../types';
import Icon from '../components/Icon';

const AboutPage = ({ pageData, content }: { pageData: PageContent, content: SiteContent['about'] }) => {
    return (
        <div className="py-20 bg-white min-h-screen">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                    <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <img src={content.image} alt="About BHT" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
                    </div>
                    <div className="order-1 md:order-2 text-right">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">{content.title}</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: content.intro }} />
                        <div className="prose max-w-none text-slate-500" dangerouslySetInnerHTML={{ __html: content.description }} />
                    </div>
                </div>

                <div className="mt-24 grid md:grid-cols-2 gap-12 text-center text-white">
                    <div className="bg-slate-800 p-10 rounded-2xl">
                        <Icon name="TrendingUp" size={40} className="mx-auto mb-4 text-blue-400"/>
                        <h3 className="text-2xl font-bold mb-3">رؤيتنا</h3>
                        <p className="opacity-80">{content.vision}</p>
                    </div>
                     <div className="bg-blue-500 p-10 rounded-2xl">
                        <Icon name="Award" size={40} className="mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold mb-3">رسالتنا</h3>
                        <p className="opacity-90">{content.mission}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;