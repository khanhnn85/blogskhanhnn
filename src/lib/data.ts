
import type { Category } from '@/types';
import { Cog, Shield, Network, Cloud } from 'lucide-react';
import type { Article } from '@/types';
import { db } from './firebase';
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc, addDoc } from 'firebase/firestore';


export const CATEGORIES: Category[] = [
  { slug: 'systems', name: 'Hệ thống', icon: Cog },
  { slug: 'security', name: 'Bảo mật', icon: Shield },
  { slug: 'networking', name: 'Mạng', icon: Network },
  { slug: 'cloud', name: 'Cloud', icon: Cloud },
];

const articlesCollection = collection(db, 'articles');

// Helper function to convert Firestore doc to Article object
const fromFirestore = (doc: any): Article => {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        category: data.category,
        author: data.author,
        published_date: data.published_date,
        image: data.image,
        image_alt: data.image_alt,
        excerpt: data.excerpt,
        content: data.content,
    };
};

export async function getArticles(
  categorySlug?: string,
  count?: number,
  excludeSlug?: string
): Promise<Article[]> {
  try {
    let q = query(articlesCollection, orderBy('published_date', 'desc'));
    
    if (categorySlug) {
      q = query(q, where('category', '==', categorySlug));
    }
    
    if (count) {
      q = query(q, limit(count + (excludeSlug ? 1 : 0))); // Fetch one extra to handle exclusion
    }

    const querySnapshot = await getDocs(q);
    let articles = querySnapshot.docs.map(fromFirestore);

    if (excludeSlug) {
      articles = articles.filter(article => article.slug !== excludeSlug);
    }
    
    if (count) {
      return articles.slice(0, count);
    }

    return articles;
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const q = query(articlesCollection, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        return fromFirestore(querySnapshot.docs[0]);
    } catch (error) {
        console.error("Error fetching article by slug: ", error);
        return null;
    }
}

export async function getAllArticleSlugs(): Promise<string[]> {
    try {
        const querySnapshot = await getDocs(query(articlesCollection));
        return querySnapshot.docs.map(doc => doc.data().slug);
    } catch (error) {
        console.error("Error fetching all article slugs: ", error);
        return [];
    }
}

export async function searchArticles(searchTerm: string): Promise<Article[]> {
  try {
    if (!searchTerm) {
        return getArticles();
    }

    const lowercasedQuery = searchTerm.toLowerCase();
    
    // Firestore does not support full-text search natively.
    // This is a basic client-side search. For production, use a dedicated search service like Algolia or Elasticsearch.
    const allArticles = await getArticles();
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedQuery) ||
        article.content.toLowerCase().includes(lowercasedQuery) ||
        article.excerpt.toLowerCase().includes(lowercasedQuery)
    );
  } catch (error) {
    console.error("Error searching articles: ", error);
    return [];
  }
}

export async function createArticle(article: Omit<Article, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(articlesCollection, article);
    return docRef.id;
  } catch (error) {
    console.error("Error creating article: ", error);
    throw error;
  }
}
    
