
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Bot, Loader2, Send, FileText, CheckCircle2, ListPlus } from 'lucide-react';
import { generateArticles } from '@/ai/flows/generate-articles-flow';
import { createArticle, CATEGORIES } from '@/lib/data';
import type { Article } from '@/types';
import { Separator } from '@/components/ui/separator';

type GeneratedArticle = Omit<Article, 'id'>;

export default function GeneratePostsPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [topic, setTopic] = useState('Hệ điều hành Linux');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [generatedArticles, setGeneratedArticles] = useState<GeneratedArticle[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [loading, isAdmin, router]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập chủ đề.",
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedArticles([]);
    setSelectedArticles({});
    try {
      const result = await generateArticles({ topic, count: 2 });
      setGeneratedArticles(result.articles);
      // Pre-select all generated articles
      const initialSelection: Record<string, boolean> = {};
      result.articles.forEach(article => {
        initialSelection[article.slug] = true;
      });
      setSelectedArticles(initialSelection);

    } catch (error) {
      console.error("Error generating articles:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể soạn bài. Vui lòng thử lại.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePostSelected = async () => {
    const articlesToPost = generatedArticles.filter(article => selectedArticles[article.slug]);
    if (articlesToPost.length === 0) {
      toast({
        variant: "destructive",
        title: "Chưa chọn bài viết",
        description: "Vui lòng chọn ít nhất một bài viết để đăng.",
      });
      return;
    }

    setIsPosting(true);
    let successCount = 0;
    let errorCount = 0;

    for (const article of articlesToPost) {
      try {
        await createArticle(article);
        successCount++;
      } catch (e) {
        console.error("Error adding document: ", e);
        errorCount++;
      }
    }
    
    setIsPosting(false);

    if (errorCount > 0) {
         toast({
            variant: "destructive",
            title: "Đăng bài thất bại",
            description: `Đã có lỗi xảy ra. ${successCount} bài đăng thành công, ${errorCount} bài thất bại.`,
        });
    } else {
         toast({
            title: "Đăng bài thành công!",
            description: `Đã đăng thành công ${successCount} bài viết.`,
        });
    }

    // Clear the list after posting
    setGeneratedArticles([]);
    setSelectedArticles({});
  };
  
  const handleSelectionChange = (slug: string, checked: boolean) => {
    setSelectedArticles(prev => ({ ...prev, [slug]: checked }));
  };

  const numSelected = Object.values(selectedArticles).filter(Boolean).length;

  if (loading || !isAdmin) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot />
            Soạn bài hàng loạt với AI
          </CardTitle>
          <CardDescription>
            Nhập một chủ đề, AI sẽ tự động soạn thảo nhiều bài viết. Sau đó bạn có thể xem lại, chọn và đăng chúng.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="flex items-end gap-4">
            <div className="flex-grow space-y-2">
              <Label htmlFor="topic">Chủ đề</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ví dụ: Hệ điều hành Linux, Bảo mật mạng..."
                required
                disabled={isGenerating}
              />
            </div>
            <Button type="submit" disabled={isGenerating || !topic}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang soạn...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Soạn bài
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedArticles.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <FileText />
                        Các bài viết đã soạn
                    </div>
                     <Button onClick={handlePostSelected} disabled={isPosting || numSelected === 0}>
                        {isPosting ? (
                             <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang đăng ({numSelected})...
                            </>
                        ) : (
                             <>
                                <ListPlus className="mr-2 h-4 w-4" />
                                Đăng {numSelected} bài đã chọn
                            </>
                        )}
                    </Button>
                </CardTitle>
                <CardDescription>
                    Xem lại các bài viết dưới đây. Tích vào ô vuông để chọn những bài bạn muốn đăng.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {generatedArticles.map((article) => (
                    <div key={article.slug} className="flex items-start gap-4 p-4 border rounded-lg bg-background">
                         <Checkbox 
                            id={`select-${article.slug}`}
                            checked={selectedArticles[article.slug] || false}
                            onCheckedChange={(checked) => handleSelectionChange(article.slug, !!checked)}
                            className="mt-1"
                        />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-primary">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                <strong>Chuyên mục:</strong> {CATEGORIES.find(c => c.slug === article.category)?.name || article.category}
                            </p>
                            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                            <div className="prose prose-sm text-sm max-h-40 overflow-y-auto p-2 border rounded-md" dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                 <Button onClick={handlePostSelected} disabled={isPosting || numSelected === 0}>
                    {isPosting ? (
                         <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang đăng ({numSelected})...
                        </>
                    ) : (
                         <>
                            <ListPlus className="mr-2 h-4 w-4" />
                            Đăng {numC} bài đã chọn
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
      )}
    </div>
  );
}
