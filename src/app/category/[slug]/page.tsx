import { notFound } from 'next/navigation';
import { getArticles, CATEGORIES } from '@/lib/data';
import ArticleList from '@/components/article-list';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: "Không tìm thấy chuyên mục",
    };
  }

  return {
    title: `Chuyên mục: ${category.name}`,
    description: `Các bài viết thuộc chuyên mục ${category.name} trên blog công nghệ KhanhNN Insights.`,
    keywords: [category.name, 'Blog công nghệ', 'KhanhNN Insights', 'Nguyễn Ngọc Khánh'],
     openGraph: {
      title: `Chuyên mục: ${category.name}`,
      description: `Các bài viết thuộc chuyên mục ${category.name}.`,
      url: `/category/${category.slug}`,
    },
     twitter: {
      title: `Chuyên mục: ${category.name}`,
      description: `Các bài viết thuộc chuyên mục ${category.name}.`,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const slug = params.slug;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticles(slug);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground mt-2">
          Các bài viết thuộc chuyên mục {category.name.toLowerCase()}.
        </p>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
