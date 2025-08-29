'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTICLES } from '@/lib/data';
import ArticleList from '@/components/article-list';
import { useEffect, useState } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredArticles, setFilteredArticles] = useState(ARTICLES);

  useEffect(() => {
    if (query) {
      const filtered = ARTICLES.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(ARTICLES);
    }
  }, [query]);


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
