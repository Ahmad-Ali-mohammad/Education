import React from 'react';
import { PageContent, TeamMember, Department } from '../types';

const TeamPage = ({ pageData, team, departments, navigate }: { pageData: PageContent, team: TeamMember[], departments: Department[], navigate:(p:string)=>void }) => (
    <div className="py-20 bg-slate-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
                <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
            </div>
            
            {departments.map(dept => {
                const deptMembers = team.filter(m => m.departmentId === dept.id);
                if (deptMembers.length === 0) return null;
                return (
                <div key={dept.id} className="mb-16">
                    <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                    {dept.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {deptMembers.map(member => (
                        <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300" onClick={() => navigate(`/team/${member.id}`)}>
                        <div className="relative h-64 overflow-hidden">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <div className="text-white text-sm">
                                <p className="font-bold mb-1">المهارات:</p>
                                <div className="flex flex-wrap gap-1">
                                {member.skills.slice(0, 3).map(s => <span key={s} className="bg-blue-500/30 px-2 py-0.5 rounded text-[10px]">{s}</span>)}
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h4 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-500 transition">{member.name}</h4>
                            <p className="text-slate-500 font-medium text-sm mb-3">{member.role}</p>
                            <div className="flex justify-center gap-2">
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{member.experienceYears} سنة خبرة</span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                );
            })}
        </div>
    </div>
);

export default TeamPage;
