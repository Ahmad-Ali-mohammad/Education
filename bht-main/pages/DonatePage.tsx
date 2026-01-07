import React, { useState } from 'react';
import { PageContent } from '../types';
import Icon from '../components/Icon';

const DonatePage = ({ pageData }: { pageData: PageContent }) => {
  const amounts = [10, 25, 50, 100];
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isDonated, setIsDonated] = useState(false);

  const handleDonate = () => {
    setIsDonated(true);
    setTimeout(() => setIsDonated(false), 6000);
  };

  if(isDonated) {
    return (
      <div className="py-20 bg-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <Icon name="CheckCircle" className="w-20 h-20 text-green-500 mx-auto mb-6"/>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">شكراً لتبرعك!</h1>
          <p className="text-slate-600">مساهمتك تقدر عالياً وستساعدنا على تحقيق أهدافنا. لقد أحدثت فرقًا اليوم.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-100 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
          <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">اختر مبلغ التبرع</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {amounts.map(amount => (
              <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`p-4 rounded-lg border-2 font-bold text-lg transition ${selectedAmount === amount ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}>
                ${amount}
              </button>
            ))}
          </div>
          <input 
            type="number" 
            value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
            placeholder="أو أدخل مبلغًا مخصصًا" 
            className="w-full p-4 border-2 border-slate-200 rounded-lg text-center text-lg focus:ring-blue-500 focus:border-blue-500 mb-8"
          />
          <button onClick={handleDonate} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transition shadow-lg text-xl inline-flex items-center justify-center gap-2">
            <Icon name="Heart" size={22}/> تبرع الآن بمبلغ ${customAmount || selectedAmount}
          </button>
          <p className="text-xs text-slate-400 mt-4">سيتم توجيهك إلى بوابة دفع آمنة (محاكاة).</p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;