import React from 'react';
import Icon from './Icon';

export const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const platforms = [
    { name: 'Facebook', icon: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: 'Linkedin', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
  ];
  const copyLink = () => { navigator.clipboard.writeText(url).then(() => alert('تم نسخ الرابط!')); };
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-slate-700">مشاركة:</span>
      {platforms.map(p => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-blue-500 bg-slate-100 rounded-full transition">
          <Icon name={p.icon} size={20} />
        </a>
      ))}
       <button onClick={copyLink} className="p-2 text-slate-500 hover:text-blue-500 bg-slate-100 rounded-full transition">
          <Icon name="Link" size={20} />
        </button>
    </div>
  );
};

export default ShareButtons;