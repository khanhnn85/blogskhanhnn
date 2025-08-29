import type { Category } from '@/types';
import { Cog, Shield, Network, Cloud } from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from './firebase';
import type { Article } from '@/types';

export const CATEGORIES: Category[] = [
  { slug: 'systems', name: 'Hệ thống', icon: Cog },
  { slug: 'security', name: 'Bảo mật', icon: Shield },
  { slug: 'networking', name: 'Mạng', icon: Network },
  { slug: 'cloud', name: 'Cloud', icon: Cloud },
];

export async function getArticles(
  categorySlug?: string,
  count?: number,
  excludeSlug?: string
): Promise<Article[]> {
  const articlesRef = collection(db, 'articles');
  let q = query(articlesRef, orderBy('published_date', 'desc'));

  if (categorySlug) {
    q = query(q, where('category', '==', categorySlug));
  }
  
  const querySnapshot = await getDocs(q);
  let articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));

  if (excludeSlug) {
    articles = articles.filter(article => article.slug !== excludeSlug);
  }
  
  if (count) {
    return articles.slice(0, count);
  }

  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Article;
}

export async function getAllArticleSlugs(): Promise<string[]> {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().slug as string);
}

export async function searchArticles(searchTerm: string): Promise<Article[]> {
  const allArticles = await getArticles();
  if (!searchTerm) return allArticles;

  const lowercasedQuery = searchTerm.toLowerCase();
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercasedQuery) ||
      article.content.toLowerCase().includes(lowercasedQuery) ||
      article.excerpt.toLowerCase().includes(lowercasedQuery)
  );
}
