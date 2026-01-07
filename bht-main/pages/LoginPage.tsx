import React, { useState } from 'react';
import Icon from '../components/Icon';

const LoginPage = ({ onLogin, onCancel }: { onLogin: (p: string) => void, onCancel: () => void }) => {
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onLogin(password); };
    
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full mx-auto p-4">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800">BHT | SMC</h1>
                    <p className="text-slate-500 mt-2">نظام إدارة المحتوى</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">تسجيل الدخول</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="أدخل كلمة المرور (admin123)" autoFocus />
                        </div>
                        <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-bold transition">دخول</button>
                        <button type="button" onClick={() => onLogin('admin123')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold transition flex items-center justify-center gap-2">
                          <Icon name="LogIn" size={18} /> دخول سريع (للتطوير)
                        </button>
                    </form>
                </div>
                 <div className="text-center mt-6">
                    <button onClick={onCancel} className="text-sm text-slate-600 hover:text-blue-500">العودة إلى الموقع الرئيسي</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;