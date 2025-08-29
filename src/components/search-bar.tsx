'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useRef } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update input value if query param changes
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.value = query;
    }
  }, [query]);


  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('query') as string;
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        name="query"
        type="search"
        defaultValue={query}
        placeholder="Tìm kiếm bài viết..."
        className="w-full bg-secondary/50 pl-9"
        aria-label="Search articles"
      />
    </form>
  );
}
