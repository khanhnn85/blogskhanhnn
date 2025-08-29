'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import CategoryNav from './category-nav';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut } from 'lucide-react';

function UserNav() {
  const { user, signIn, signOut } = useAuth();

  if (!user) {
    return (
      <Button onClick={signIn} variant="outline" size="sm">
        <LogIn className="mr-2" />
        Đăng nhập
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
           <UserNav />
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
