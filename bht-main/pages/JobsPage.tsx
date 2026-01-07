import React, { useState, useMemo } from 'react';
import { PageContent, Job } from '../types';
import Icon from '../components/Icon';

const JobsPage = ({ pageData, jobs }: { pageData: PageContent, jobs: Job[] }) => {
    const [filters, setFilters] = useState({ location: 'all', type: 'all' });
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const locations = useMemo(() => ['all', ...Array.from(new Set(jobs.map(j => j.location)))], [jobs]);
    const types = useMemo(() => ['all', ...Array.from(new Set(jobs.map(j => j.type)))], [jobs]);

    const filteredJobs = useMemo(() => jobs.filter(job => 
        (filters.location === 'all' || job.location === filters.location) && 
        (filters.type === 'all' || job.type === filters.type)
    ), [jobs, filters]);

    const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const handleFilterChange = (filterName: 'location' | 'type', value: string) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setCurrentPage(1);
    };

    return (
        <div className="py-20 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                    <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">الموقع</label>
                        <select onChange={e => handleFilterChange('location', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                            {locations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? 'كل المواقع' : loc}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">نوع الدوام</label>
                        <select onChange={e => handleFilterChange('type', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md">
                            {types.map(type => <option key={type} value={type}>{type === 'all' ? 'كل الأنواع' : type}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {currentJobs.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-lg text-slate-500 shadow-sm">لا توجد وظائف شاغرة تطابق الفلترة</div>
                    ) : (
                        currentJobs.map(job => (
                            <div key={job.id} className="border border-slate-200 rounded-lg p-6 hover:border-blue-500 transition bg-white text-right shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                                        <div className="flex gap-4 text-sm text-slate-500 mt-2">
                                            <span className="flex items-center gap-1"><Icon name="MapPin" size={14} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Icon name="Briefcase" size={14} /> {job.type}</span>
                                        </div>
                                    </div>
                                    <button className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition self-start md:self-center">
                                        تقدم الآن
                                    </button>
                                </div>
                                <p className="mt-4 text-slate-600">{job.description}</p>
                                <div className="mt-3 text-sm text-slate-500">
                                    <strong>المهارات المطلوبة:</strong> {job.skills}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <nav className="flex rounded-md shadow">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button key={number} onClick={() => setCurrentPage(number)} className={`px-4 py-2 text-sm font-medium border-t border-b border-r first:rounded-r-md first:border-l last:rounded-l-md ${ currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-slate-500 hover:bg-slate-50' }`}>
                                    {number}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsPage;