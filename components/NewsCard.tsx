import React from 'react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <a href="#" className="block rounded-lg overflow-hidden group relative h-64 text-white">
      <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-4">
        <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500 px-2 py-1 rounded-full self-start">{article.category}</span>
        <h3 className="text-lg font-bold mt-2">{article.title}</h3>
        <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{article.summary}</p>
      </div>
    </a>
  );
};

export default NewsCard;