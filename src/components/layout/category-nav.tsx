'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 -mx-2 overflow-x-auto whitespace-nowrap">
          <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'shrink-0 font-medium',
                  pathname === '/'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Home className="mr-2 h-4 w-4" />
                Trang chủ
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'shrink-0 font-medium',
                pathname === `/category/${category.slug}`
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
