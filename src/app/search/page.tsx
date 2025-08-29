'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTICLES } from '@/lib/data';
import ArticleList from '@/components/article-list';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground mt-2">
          Articles matching your search query.
        </p>
      </div>
      <ArticleList articles={ARTICLES} />
    </div>
  );
}

export default function SearchPage() {
    return (
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    );
}
