import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/app-header';
import CategoryNav from '@/components/layout/category-nav';
import { CATEGORIES } from '@/lib/data';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { AuthProvider } from '@/components/auth-provider';

const siteConfig = {
  name: "KhanhNN Insights",
  url: "https://khanhnn.dev", // Replace with your actual domain
  description: "Blog công nghệ của Nguyễn Ngọc Khánh. Nơi chia sẻ kiến thức chuyên sâu về hệ điều hành Linux, bảo mật ứng dụng, mạng, cloud và lập trình. Chia sẻ để thành công.",
  author: "Nguyễn Ngọc Khánh",
  keywords: "Blog công nghệ, hệ điều hành Linux, Bảo mật ứng dụng, Blog chia sẻ của Nguyễn Ngọc Khánh, Chia sẻ để thành công, KhanhNN, Networking, Cloud Computing, Systems, Security",
};


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Blog Công nghệ & Chia sẻ Kiến thức`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords.split(', '),
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`, // Add an OG image to your public folder
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    creator: `@${siteConfig.author}`,
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <AuthProvider>
          <Toaster />
          <div className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <main className="flex-1">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
               {children}
              </div>
            </main>
            <footer className="bg-muted text-muted-foreground py-8">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                          <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <Icons.logo className="h-6 w-6 text-primary" />
                            <span className="font-headline text-lg font-semibold text-foreground">KhanhNN</span>
                          </Link>
                          <p className="text-sm">Khám phá các bài viết chuyên sâu về hệ thống, bảo mật, mạng và điện toán đám mây. Chia sẻ để thành công.</p>
                      </div>
                      <div>
                          <h4 className="font-headline font-semibold text-foreground mb-4">Chuyên mục</h4>
                          <ul className="space-y-2">
                              {CATEGORIES.map(category => (
                                  <li key={category.slug}>
                                      <Link href={`/category/${category.slug}`} className="text-sm hover:text-primary transition-colors">
                                          {category.name}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div>
                        <h4 className="font-headline font-semibold text-foreground mb-4">Liên kết</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors">Giới thiệu</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors">Liên hệ</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors">Chính sách</Link></li>
                        </ul>
                      </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-border text-center text-sm">
                      <p>&copy; {new Date().getFullYear()} KhanhNN Insights. All Rights Reserved. Xây dựng bởi Nguyễn Ngọc Khánh.</p>
                  </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
