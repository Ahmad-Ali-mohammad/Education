import React from 'react';
import { PageContent, Service } from '../types';
import Icon from '../components/Icon';

const ServicesPage = ({ pageData, services }: { pageData: PageContent, services: Service[] }) => (
    <div className="py-20 bg-slate-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="inline-block p-5 bg-blue-100 rounded-full mb-6">
                            <Icon name={service.icon} className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                        <p className="text-slate-600 leading-relaxed flex-grow">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ServicesPage;
