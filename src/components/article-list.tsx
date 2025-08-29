'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Article } from '@/types';
import ArticleCard from '@/components/article-card';

export default function ArticleList({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    setFilteredArticles(
      articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, articles]);

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-headline">No Articles Found</h2>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
