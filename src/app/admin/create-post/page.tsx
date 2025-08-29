
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CATEGORIES, ARTICLES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import type { Article } from '@/types';

export default function CreatePostPage() {
  const { isAdmin, loading, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !category || !content || !excerpt || !image || !imageAlt) {
        toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Vui lòng điền đầy đủ thông tin.",
        });
        setIsSubmitting(false);
        return;
    }
    
    // In a real app, you would send this to a server endpoint to save to a database.
    // For this prototype, we'll just log it and show a success message.
    const newArticle: Omit<Article, 'id' | 'published_date' | 'author' | 'slug'> = {
      title,
      category,
      excerpt,
      content,
      image,
      image_alt: imageAlt,
    };

    console.log('New Article Submitted:', newArticle);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Đăng bài thành công!",
      description: `Bài viết "${title}" đã được tạo.`,
    });

    // Reset form
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setImage('');
    setImageAlt('');

    setIsSubmitting(false);
    
    // In a real app, you might redirect to the new article page
    // router.push(`/article/${new-slug}`);
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
              <Label htmlFor="excerpt">Đoạn trích (Excerpt)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Viết một đoạn trích ngắn gọn cho bài viết"
                required
              />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">URL Hình ảnh</Label>
                <Input 
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageAlt">Mô tả hình ảnh (Alt Text)</Label>
                <Input 
                    id="imageAlt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Mô tả nội dung hình ảnh"
                    required
                />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết nội dung bài viết của bạn tại đây (hỗ trợ HTML)"
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
