import { notFound } from 'next/navigation';
import { getArticles, CATEGORIES } from '@/lib/data';
import ArticleList from '@/components/article-list';

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticles(params.slug);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground mt-2">
          Articles related to {category.name.toLowerCase()}.
        </p>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
