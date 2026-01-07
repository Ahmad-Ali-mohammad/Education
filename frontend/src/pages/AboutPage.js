import React from 'react';
import { useContent } from '../context/ContentContext';

const AboutPage = () => {
  const { content } = useContent();
  const { about, aboutPage } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{aboutPage?.title || 'من نحن'}</h1>
          <p className="text-xl opacity-90">{aboutPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img 
            src={about?.image} 
            alt="About" 
            className="rounded-2xl shadow-xl w-full h-96 object-cover" 
          />
          <div className="text-right">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{about?.title}</h2>
            <div 
              className="prose prose-lg max-w-none text-slate-600" 
              dangerouslySetInnerHTML={{ __html: about?.intro }} 
            />
          </div>
        </div>
        
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">رؤيتنا</h3>
            <p className="text-slate-600 leading-relaxed">{about?.vision}</p>
          </div>
          <div className="bg-green-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-green-600 mb-4">رسالتنا</h3>
            <p className="text-slate-600 leading-relaxed">{about?.mission}</p>
          </div>
        </div>
        
        {/* Description */}
        <div 
          className="prose prose-lg max-w-none text-slate-600" 
          dangerouslySetInnerHTML={{ __html: about?.description }} 
        />
      </div>
    </div>
  );
};

export default AboutPage;
