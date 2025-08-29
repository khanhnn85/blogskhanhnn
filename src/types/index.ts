import type { LucideIcon } from 'lucide-react';

export type Category = {
  slug: string;
  name: string;
  icon: LucideIcon;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: Category['slug'];
  author: string;
  published_date: string;
  image: string;
  image_alt: string;
  excerpt: string;
  content: string;
  keywords?: string[];
};
