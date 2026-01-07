import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ navigate }) => {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isRegister) {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: 'viewer'
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || t('error'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isRegister ? 'أنشئ حسابك للوصول إلى لوحة التحكم' : 'ادخل بياناتك للوصول إلى لوحة التحكم'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="الاسم الكامل"
                  required
                  data-testid="register-name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('email')}</label>
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
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('password')}</label>
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
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              data-testid="login-submit"
            >
              {loading ? (
                <Icon name="Loader2" className="animate-spin" size={20} />
              ) : (
                <>
                  <Icon name="LogIn" size={20} />
                  {isRegister ? 'إنشاء الحساب' : 'دخول'}
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-blue-500 hover:underline text-sm"
              data-testid="toggle-auth"
            >
              {isRegister ? 'لديك حساب؟ سجل دخول' : 'ليس لديك حساب؟ أنشئ حساب'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
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
