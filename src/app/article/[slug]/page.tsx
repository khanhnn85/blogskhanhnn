import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, getArticles, getAllArticleSlugs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import ArticleActions from './article-actions';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import ArticleList from '@/components/article-list';

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === article.category);
  
  const relatedArticles = await getArticles(article.category, 3, article.slug);

  return (
    <>
      <article className="max-w-3xl mx-auto">
        <header className="space-y-4 mb-8">
          {category && (
            <Link href={`/category/${category.slug}`}>
              <Badge className="font-semibold text-sm py-1 px-3 bg-primary/10 text-primary hover:bg-primary/20">
                {category.name}
              </Badge>
            </Link>
          )}
          <h1 className="text-4xl lg:text-5xl font-headline font-bold text-foreground leading-tight tracking-tighter">
            {article.title}
          </h1>
          <div className="text-sm text-muted-foreground">
            <span>By {article.author}</span> &middot;{' '}
            <span>{new Date(article.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={article.image}
            alt={article.image_alt}
            fill
            className="object-cover"
            data-ai-hint="technology abstract"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 896px"
            priority
          />
        </div>

        <ArticleActions article={article} />

        <div
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {relatedArticles.length > 0 && (
          <aside className="mt-16 pt-12 border-t">
              <h2 className="text-2xl font-headline font-bold mb-8 text-center">Bài viết liên quan</h2>
              <div className="max-w-5xl mx-auto">
                <ArticleList articles={relatedArticles} />
              </div>
          </aside>
      )}
    </>
  );
}
