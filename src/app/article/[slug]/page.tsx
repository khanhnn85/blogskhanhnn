import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug, getArticles, getAllArticleSlugs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import ArticleActions from './article-actions';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import ArticleList from '@/components/article-list';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  const categoryName = CATEGORIES.find(c => c.slug === article.category)?.name || 'Bài viết';
  const defaultKeywords = ['Blog công nghệ', 'hệ điều hành Linux', 'Bảo mật ứng dụng', 'Blog chia sẻ của Nguyễn Ngọc Khánh', 'Chia sẻ để thành công'];
  const articleKeywords = article.keywords || [];

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [...new Set([categoryName, article.title, ...articleKeywords, ...defaultKeywords])],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_date,
      url: `/article/${article.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.image_alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}


export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
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
            <span>{new Date(article.published_date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
