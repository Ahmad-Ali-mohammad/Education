import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ navigate }) => {
  const { t } = useTranslation();
  const { login, setupAdmin, checkSetup } = useAuth();
  const [isSetup, setIsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  useEffect(() => {
    checkSetup().then(needsSetup => {
      setIsSetup(needsSetup);
      setLoading(false);
    });
  }, [checkSetup]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      if (isSetup) {
        await setupAdmin({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: 'admin'
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'حدث خطأ في تسجيل الدخول');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Icon name="Loader2" className="animate-spin text-white" size={40} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={isSetup ? "Settings" : "Lock"} size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isSetup ? 'إعداد النظام' : 'لوحة التحكم'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isSetup 
                ? 'مرحباً! قم بإنشاء حساب المسؤول الأول'
                : 'هذه المنطقة محصورة للمسؤولين فقط'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSetup && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="اسم المسؤول"
                  required
                  data-testid="setup-name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@email.com"
                required
                data-testid="login-email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                data-testid="login-password"
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              data-testid="login-submit"
            >
              {submitting ? (
                <Icon name="Loader2" className="animate-spin" size={20} />
              ) : (
                <>
                  <Icon name={isSetup ? "Settings" : "LogIn"} size={20} />
                  {isSetup ? 'إعداد النظام' : 'تسجيل الدخول'}
                </>
              )}
            </button>
          </form>
          
          {!isSetup && (
            <p className="text-center text-slate-400 text-sm mt-4">
              للحصول على صلاحيات الدخول، تواصل مع مسؤول النظام
            </p>
          )}
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-slate-700 text-sm flex items-center justify-center gap-1 mx-auto"
            >
              <Icon name="ArrowRight" size={16} />
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
