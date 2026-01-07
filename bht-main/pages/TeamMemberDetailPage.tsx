import React from 'react';
import { TeamMember, Department } from '../types';
import Icon from '../components/Icon';

const TeamMemberDetailPage = ({ member, departments, navigate }: { member: TeamMember, departments: Department[], navigate: (p:string)=>void }) => {
  const dept = departments.find(d => d.id === member.departmentId);
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <button onClick={() => navigate('/team')} className="flex items-center gap-2 text-blue-500 mb-8 font-semibold hover:underline">
          <Icon name="ArrowRight" size={18}/> العودة إلى كل الفريق
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-slate-800 text-white p-8 flex flex-col items-center text-center">
              <img src={member.image} className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-white/20 shadow-2xl"/>
              <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
              <p className="text-blue-400 font-semibold text-lg mb-4">{member.role}</p>
              <div className="bg-white/10 px-4 py-2 rounded-full text-sm mb-8">{dept?.name}</div>
              
              <div className="w-full space-y-4 text-right">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-blue-400" size={20}/>
                  <span className="text-sm">{member.social.email || 'غير متاح'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Briefcase" className="text-blue-400" size={20}/>
                  <span className="text-sm">{member.experienceYears} سنوات من الخبرة</span>
                </div>
              </div>

              <div className="flex gap-4 mt-auto pt-8">
                {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-blue-500 transition"><Icon name="Linkedin" size={20}/></a>}
                {member.social.twitter && <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-blue-500 transition"><Icon name="Twitter" size={20}/></a>}
              </div>
            </div>

            <div className="md:col-span-2 p-8 md:p-12 text-right">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-2">
                  <Icon name="FileText" className="text-blue-500"/> السيرة الذاتية
                </h2>
                <div className="prose max-w-none text-slate-600 ql-snow"><div className="ql-editor !p-0" dangerouslySetInnerHTML={{ __html: member.bio }}/></div>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-blue-500" size={20}/> المهارات الأساسية
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map(skill => (
                      <span key={skill} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Icon name="GraduationCap" className="text-blue-500" size={20}/> الشهادات العلمية
                  </h3>
                  <ul className="space-y-2">
                    {member.certifications.map(cert => (
                      <li key={cert} className="text-slate-600 text-sm flex items-start gap-2">
                        <Icon name="CheckCircle" size={14} className="text-green-500 mt-1 shrink-0"/> {cert}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-10">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Icon name="Award" className="text-blue-500" size={20}/> أبرز الإنجازات
                </h3>
                <div className="grid gap-4">
                  {member.achievements.map((achievement, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border-r-4 border-blue-500">
                      <p className="text-slate-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetailPage;