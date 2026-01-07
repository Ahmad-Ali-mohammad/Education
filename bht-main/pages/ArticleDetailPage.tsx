import React from 'react';
import { Article, Category, Tag } from '../types';
import ShareButtons from '../components/ShareButtons';
import Icon from '../components/Icon';

const ArticleDetailPage = ({ article, categories, tags, navigate }: { article: Article, categories: Category[], tags: Tag[], navigate: (p:string)=>void }) => {
  const category = categories.find(c => c.id === article.categoryId);
  const articleTags = tags.filter(t => article.tagIds.includes(t.id));

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate('/articles')} className="flex items-center gap-2 text-blue-500 mb-8 font-semibold hover:underline">
          <Icon name="ArrowRight" size={18}/> العودة إلى كل الأخبار
        </button>
        {category && (
          <button onClick={() => navigate(`/articles?category=${category.id}`)} className="text-blue-600 font-bold bg-blue-100 px-3 py-1 rounded-full mb-2 text-sm hover:bg-blue-200 transition">{category.name}</button>
        )}
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{article.title}</h1>
        <p className="text-slate-500 mb-2">{new Date(article.date).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="mb-6"><ShareButtons url={window.location.href} title={article.title} /></div>
        <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-2xl shadow-xl mb-8"/>
        <div className="prose prose-lg max-w-none text-right ql-snow">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: article.content }}/>
        </div>
        <div className="mt-10 border-t pt-6 flex items-center gap-3">
          <span className="font-semibold">الوسوم:</span>
          {articleTags.map(tag => (
            <button key={tag.id} onClick={() => navigate(`/articles?tag=${tag.id}`)} className="px-3 py-1 text-sm rounded-full transition bg-slate-100 text-slate-600 hover:bg-slate-200">{tag.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;