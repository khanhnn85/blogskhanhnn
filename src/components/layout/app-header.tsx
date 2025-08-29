'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import SearchBar from '@/components/search-bar';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <SearchBar />
      </div>
    </header>
  );
}
