
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CATEGORIES, getArticleBySlug, updateArticle } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import type { Article } from '@/types';
import { Loader2 } from 'lucide-react';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsFetching(true);
      const fetchedArticle = await getArticleBySlug(params.slug);
      if (fetchedArticle) {
        setArticle(fetchedArticle);
        setTitle(fetchedArticle.title);
        setCategory(fetchedArticle.category);
        setContent(fetchedArticle.content);
      } else {
        toast({
            variant: "destructive",
            title: "Không tìm thấy bài viết",
            description: "Không thể tìm thấy bài viết bạn muốn sửa.",
        });
        router.push('/admin/manage-posts');
      }
      setIsFetching(false);
    };
    if(isAdmin) {
        fetchArticle();
    }
  }, [params.slug, isAdmin, router, toast]);

  const extractFirstImage = (htmlContent: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : `https://picsum.photos/1200/630?random=${Math.floor(Math.random() * 100)}`;
  };
  
  const extractImageAlt = (htmlContent: string) => {
    const altRegex = /<img[^>]+alt="([^">]+)"[^>]*>/;
    const match = htmlContent.match(altRegex);
    return match ? match[1] : 'Technology Abstract';
  }

  const createExcerpt = (htmlContent: string) => {
    const textContent = htmlContent.replace(/<[^>]*>?/gm, '');
    return textContent.length > 160 ? textContent.substring(0, 160) + '...' : textContent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;
    setIsSubmitting(true);

    if (!title || !category || !content) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin.",
      });
      setIsSubmitting(false);
      return;
    }
    
    const imageUrl = extractFirstImage(content);
    const imageAlt = extractImageAlt(content);
    const excerpt = createExcerpt(content);

    const updatedArticleData: Partial<Article> = {
      title,
      slug: slugify(title),
      category,
      content,
      excerpt,
      image: imageUrl,
      image_alt: imageAlt,
    };
    
    try {
      await updateArticle(article.id, updatedArticleData);
      
      toast({
        title: "Cập nhật thành công!",
        description: `Bài viết "${title}" đã được cập nhật.`,
      });
  
      router.push(`/admin/manage-posts`);
  
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isFetching || !isAdmin) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!article) {
     return <div className="text-center">Không tìm thấy bài viết.</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sửa bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Chuyên mục</Label>
              <Select onValueChange={setCategory} value={category} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Chọn một chuyên mục" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết nội dung bài viết của bạn tại đây. Chèn ảnh bằng thẻ <img>. Ảnh đầu tiên sẽ là ảnh đại diện."
                rows={15}
                required
              />
            </div>
            
            <div className="flex gap-4">
                 <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
                </Button>
                <Button variant="outline" onClick={() => router.push('/admin/manage-posts')}>
                    Hủy
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
