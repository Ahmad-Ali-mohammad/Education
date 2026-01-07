import React, { useState } from 'react';
import Icon from './Icon';
import { NavigationLink } from '../types';

export const Navbar = ({ navigation, onLoginClick, navigate }: { navigation: NavigationLink[], onLoginClick: () => void, navigate: (path: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavClick = (e: React.MouseEvent, href: string) => { e.preventDefault(); navigate(href); setIsOpen(false); };
  
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center"> <a href="#/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-bold text-slate-800">BHT</a> </div>
          <div className="hidden md:flex items-center space-x-8 space-x-reverse"> 
            {navigation.map(link => ( 
              <a key={link.id} href={`#${link.path}`} onClick={(e) => handleNavClick(e, link.path)} className="text-slate-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition">{link.label}</a> 
            ))} 
            <button onClick={() => navigate('/donate')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-2"><Icon name="Heart" size={16}/> تبرع الآن</button> 
            <button onClick={onLoginClick} className="text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition text-sm">دخول الموظفين</button> 
          </div>
          <div className="md:hidden flex items-center"> <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-slate-900 p-2"> {isOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />} </button> </div>
        </div>
      </div>
      {isOpen && ( 
        <div className="md:hidden bg-white border-t"> 
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right"> 
            {navigation.map(link => ( 
              <a key={link.id} href={`#${link.path}`} onClick={(e) => handleNavClick(e, link.path)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-500 hover:bg-slate-50">{link.label}</a> 
            ))} 
            <button onClick={() => navigate('/donate')} className="w-full text-right block px-3 py-2 rounded-md text-base font-medium text-red-500 font-bold hover:bg-slate-50">تبرع الآن</button> 
            <button onClick={onLoginClick} className="w-full text-right block px-3 py-2 rounded-md text-base font-medium text-blue-500 font-bold hover:bg-slate-50">دخول الموظفين</button> 
          </div> 
        </div> 
      )}
    </nav>
  );
};