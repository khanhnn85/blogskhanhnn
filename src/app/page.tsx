import { ARTICLES } from '@/lib/data';
import ArticleList from '@/components/article-list';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome to KhanhNN Insights</h1>
        <p className="text-muted-foreground mt-2">Exploring the depths of technology, one article at a time.</p>
      </div>
      <ArticleList articles={ARTICLES} />
    </div>
  );
}
