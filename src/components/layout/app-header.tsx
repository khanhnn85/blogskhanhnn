'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import CategoryNav from './category-nav';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-6 flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold text-foreground">KhanhNN</span>
            </Link>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
           <div className="flex-1 md:flex-none md:w-64">
             <SearchBar />
           </div>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
