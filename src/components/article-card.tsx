import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { CATEGORIES } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.slug === article.category);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/article/${article.slug}`}>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.image}
              alt={article.image_alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint="technology abstract"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            {category && (
              <Badge variant="secondary" className="font-normal">{category.name}</Badge>
            )}
            <h3 className="text-xl font-headline font-semibold leading-snug tracking-tight text-foreground">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
            <div className="flex items-center text-sm font-medium text-primary group-hover:text-accent">
              <span>Read more</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
