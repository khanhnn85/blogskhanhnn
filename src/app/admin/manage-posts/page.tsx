
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { getArticles, deleteArticle, CATEGORIES } from '@/lib/data';
import type { Article } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Pencil, Trash2, PlusCircle, BarChartHorizontal } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ManagePostsPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [articles, setArticles] = useState<Article[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [loading, isAdmin, router]);
  
  useEffect(() => {
    if(isAdmin) {
        const fetchArticles = async () => {
            setIsFetching(true);
            const fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
            setIsFetching(false);
        };
        fetchArticles();
    }
  }, [isAdmin]);

  const handleDelete = async (articleId: string, articleTitle: string) => {
    try {
        await deleteArticle(articleId);
        setArticles(articles.filter(article => article.id !== articleId));
        toast({
            title: "Xóa thành công",
            description: `Bài viết "${articleTitle}" đã được xóa.`,
        });
    } catch (error) {
        console.error("Failed to delete article:", error);
        toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Không thể xóa bài viết. Vui lòng thử lại.",
        });
    }
  };

  if (loading || !isAdmin) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-headline font-bold">Quản lý bài viết</h1>
                <p className="text-muted-foreground mt-2">Xem, sửa hoặc xóa các bài viết đã đăng.</p>
            </div>
            <Link href="/admin/create-post">
                <Button>
                    <PlusCircle />
                    Bài viết mới
                </Button>
            </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng số bài viết</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{articles.length}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chuyên mục</CardTitle>
                    <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{CATEGORIES.length}</div>
                </CardContent>
            </Card>
        </section>

        <Card>
            <CardHeader>
                <CardTitle>Danh sách bài viết</CardTitle>
                <CardDescription>Tất cả các bài viết hiện có trong cơ sở dữ liệu.</CardDescription>
            </CardHeader>
            <CardContent>
                {isFetching ? (
                    <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
                ) : (
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[40%]'>Tiêu đề</TableHead>
                                    <TableHead>Chuyên mục</TableHead>
                                    <TableHead>Tác giả</TableHead>
                                    <TableHead>Ngày đăng</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell className="font-medium">
                                          <Link href={`/article/${article.slug}`} className="hover:underline" prefetch={false}>
                                            {article.title}
                                          </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {CATEGORIES.find(c => c.slug === article.category)?.name || 'N/A'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{article.author}</TableCell>
                                        <TableCell>{new Date(article.published_date).toLocaleDateString('vi-VN')}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/edit-post/${article.slug}`}>
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Sửa</span>
                                                    </Button>
                                                </Link>
                                                 <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="icon">
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Xóa</span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Hành động này không thể được hoàn tác. Bài viết "{article.title}" sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(article.id, article.title)}>
                                                                Tiếp tục xóa
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
