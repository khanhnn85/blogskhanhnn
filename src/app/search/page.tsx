'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchArticles } from '@/lib/data';
import ArticleList from '@/components/article-list';
import { useEffect, useState } from 'react';
import type { Article } from '@/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setIsLoading(true);
      const articles = await searchArticles(query);
      setFilteredArticles(articles);
      setIsLoading(false);
    }
    performSearch();
  }, [query]);


  if (isLoading) {
    return <div>Đang tải kết quả...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
         Kết quả tìm kiếm cho &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground mt-2">
          {filteredArticles.length} bài viết được tìm thấy.
        </p>
      </div>
      <ArticleList articles={filteredArticles} />
    </div>
  );
}

export default function SearchPage() {
    return (
      <Suspense fallback={<div>Đang tải kết quả...</div>}>
        <SearchResults />
      </Suspense>
    );
}
