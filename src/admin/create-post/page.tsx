
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CATEGORIES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import type { Article } from '@/types';


function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


export default function CreatePostPage() {
  const { isAdmin, loading, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    router.push('/');
    return null;
  }

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
    
    // NOTE: The following code is for demonstration and does not persist data.
    // In a real application, you would add the new article to your data source.

    const imageUrl = extractFirstImage(content);
    const imageAlt = extractImageAlt(content);
    const excerpt = createExcerpt(content);

    const newArticle: Partial<Article> = {
      title,
      slug: slugify(title),
      category,
      author: user?.displayName || 'Admin',
      published_date: new Date().toISOString(),
      excerpt,
      content,
      image: imageUrl,
      image_alt: imageAlt,
    };
    
    console.log("Simulating article creation:", newArticle);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Đăng bài thành công! (Mô phỏng)",
        description: `Bài viết "${title}" đã được tạo (dữ liệu không được lưu).`,
      });
  
      // Reset form
      setTitle('');
      setCategory('');
      setContent('');
  
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi đăng bài. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Tạo bài viết mới</CardTitle>
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
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang đăng...' : 'Đăng bài'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    