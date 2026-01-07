import React, { useState, useEffect, useMemo } from 'react';
import { PageContent, Article, Category, Tag } from '../types';

const ArticlesPage = ({ pageData, articles, categories, tags, navigate }: { pageData: PageContent, articles: Article[], categories: Category[], tags: Tag[], navigate:(p:string)=>void }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    setActiveCategory(params.get('category'));
    setActiveTag(params.get('tag'));
  }, [window.location.hash]);

  const handleCategoryFilter = (categoryId: string) => {
    navigate(`/articles?category=${categoryId}`);
  }

  const handleTagFilter = (tagId: string) => {
    navigate(`/articles?tag=${tagId}`);
  }

  const clearFilters = () => {
    navigate('/articles');
  }

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const categoryMatch = !activeCategory || article.categoryId === activeCategory;
      const tagMatch = !activeTag || article.tagIds.includes(activeTag);
      return categoryMatch && tagMatch;
    });
  }, [articles, activeCategory, activeTag]);

  return (
    <div className="py-20 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{pageData.title}</h1>
          <p className="text-slate-600 text-lg">{pageData.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4">الفئات</h3>
            <ul className="space-y-2">
              <li><button onClick={clearFilters} className={`w-full text-right ${!activeCategory && !activeTag ? 'text-blue-500 font-bold' : 'text-slate-600 hover:text-blue-500'}`}>كل المقالات</button></li>
              {categories.map(cat => (
                <li key={cat.id}><button onClick={() => handleCategoryFilter(cat.id)} className={`w-full text-right ${activeCategory === cat.id ? 'text-blue-500 font-bold' : 'text-slate-600 hover:text-blue-500'}`}>{cat.name}</button></li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-slate-800 border-b pb-3 my-6">الوسوم</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button key={tag.id} onClick={() => handleTagFilter(tag.id)} className={`px-3 py-1 text-sm rounded-full transition ${activeTag === tag.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tag.name}</button>
              ))}
            </div>
          </aside>

          <main className="lg:col-span-3">
            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredArticles.map(article => (
                  <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer" onClick={() => navigate(`/articles/${article.id}`)}>
                    <img src={article.image} alt={article.title} className="w-full h-56 object-cover"/>
                    <div className="p-6 text-right">
                      <p className="text-sm text-slate-500 mb-2">{new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-500">{article.title}</h3>
                      <div className="text-slate-600 text-sm line-clamp-3 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                <p className="text-slate-500">لا توجد مقالات تطابق الفلترة الحالية.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
