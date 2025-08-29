import type { Article } from '@/types';
import ArticleCard from '@/components/article-card';

export default function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-headline">Không tìm thấy bài viết</h2>
        <p className="text-muted-foreground mt-2">
          Vui lòng thử lại với từ khóa khác.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
