import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import { newsletterAPI } from '../api';

const Footer = ({ data }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await newsletterAPI.subscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-slate-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12 text-right">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">CMS</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              نظام إدارة محتوى متكامل للمؤسسات
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-400">{t('contactInfo')}</h4>
            <ul className="space-y-4 text-slate-300">
              {data?.address && (
                <li className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-blue-400 shrink-0" size={20} />
                  <span>{data.address}</span>
                </li>
              )}
              {data?.phone && (
                <li className="flex items-center gap-3">
                  <Icon name="Phone" className="text-blue-400 shrink-0" size={20} />
                  <span dir="ltr">{data.phone}</span>
                </li>
              )}
              {data?.email && (
                <li className="flex items-center gap-3">
                  <Icon name="Mail" className="text-blue-400 shrink-0" size={20} />
                  <span>{data.email}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-400">{t('newsletter')}</h4>
            <p className="text-slate-300 mb-4">اشترك ليصلك آخر أخبارنا.</p>
            <form onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder={t('email')}
                className="w-full p-2 rounded-md bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
                data-testid="newsletter-email"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                data-testid="newsletter-submit"
              >
                {loading ? t('loading') : t('subscribe')}
              </button>
              {subscribed && (
                <p className="text-green-400 text-sm mt-2">{t('subscribedSuccess')}</p>
              )}
            </form>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-400">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition">{t('privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('terms')}</a></li>
            </ul>
            <div className="flex gap-4 mt-6">
              {data?.facebook && (
                <a 
                  href={`https://${data.facebook}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 p-2 rounded-full hover:bg-blue-500 transition"
                >
                  <Icon name="Facebook" size={20} />
                </a>
              )}
              {data?.website && (
                <a 
                  href={`https://${data.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 p-2 rounded-full hover:bg-blue-500 transition"
                >
                  <Icon name="Globe" size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CMS. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
