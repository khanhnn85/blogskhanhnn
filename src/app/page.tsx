
import { getArticles } from '@/lib/data';
import ArticleList from '@/components/article-list';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/data';

export default async function Home() {
  const allArticles = await getArticles();

  if (allArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-headline font-bold">Chào mừng tới KhanhNN Insights</h2>
        <p className="text-muted-foreground mt-4">
          Hiện tại chưa có bài viết nào. Hãy quay lại sau nhé!
        </p>
      </div>
    );
  }
  
  const featuredArticle = allArticles[0];
  const otherArticles = allArticles.slice(1, 5);
  const featuredCategory = CATEGORIES.find(c => c.slug === featuredArticle.category);

  return (
    <div className="space-y-12">
      <section className="relative w-full rounded-lg overflow-hidden group shadow-lg">
          <Link href={`/article/${featuredArticle.slug}`}>
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.image_alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="100vw"
                priority
                data-ai-hint="technology"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
          </Link>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 space-y-3 w-full md:w-2/3">
              {featuredCategory && (
                  <Link href={`/category/${featuredCategory.slug}`}>
                      <Badge className="font-semibold text-sm py-1 px-3 border-transparent bg-primary/20 text-white hover:bg-primary/30">
                          {featuredCategory.name}
                      </Badge>
                  </Link>
              )}
              <h1 className="text-2xl lg:text-3xl font-headline font-bold text-white leading-tight tracking-tight">
                  <Link href={`/article/${featuredArticle.slug}`} className="hover:text-primary/90 transition-colors">
                    {featuredArticle.title}
                  </Link>
              </h1>
              <p className="text-white/80 hidden md:line-clamp-2">{featuredArticle.excerpt}</p>
          </div>
      </section>

      <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-bold tracking-tight">Bài viết mới nhất</h2>
            <p className="text-muted-foreground mt-1">Khám phá các bài viết mới nhất của chúng tôi.</p>
          </div>
          <ArticleList articles={otherArticles} />
      </section>
    </div>
  );
}
