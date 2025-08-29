import { ARTICLES } from '@/lib/data';
import ArticleList from '@/components/article-list';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredArticle = ARTICLES[0];
  const otherArticles = ARTICLES.slice(1, 4);
  const featuredCategory = CATEGORIES.find(c => c.slug === featuredArticle.category);

  return (
    <div className="space-y-12">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden group shadow-lg">
              <Link href={`/article/${featuredArticle.slug}`}>
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.image_alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    data-ai-hint="technology abstract"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </Link>
            </div>
            <div className="space-y-4">
                {featuredCategory && (
                    <Link href={`/category/${featuredCategory.slug}`}>
                        <Badge className="font-semibold text-sm py-1 px-3 bg-primary/10 text-primary hover:bg-primary/20">
                            {featuredCategory.name}
                        </Badge>
                    </Link>
                )}
                <h1 className="text-3xl lg:text-4xl font-headline font-bold text-foreground leading-tight tracking-tighter">
                    <Link href={`/article/${featuredArticle.slug}`} className="hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </Link>
                </h1>
                <p className="text-muted-foreground lg:text-lg">{featuredArticle.excerpt}</p>
                <div className="text-sm text-muted-foreground">
                    <span>By {featuredArticle.author}</span> &middot;{' '}
                    <span>{new Date(featuredArticle.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                 <Link href={`/article/${featuredArticle.slug}`} className="inline-flex items-center font-semibold text-primary group">
                    Đọc thêm <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
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
