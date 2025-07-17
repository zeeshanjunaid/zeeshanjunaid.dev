'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, Settings, LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/db-helpers';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AuthButtons() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out',
      });
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <ModeToggle />
        <div className="w-9 h-9 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor rounded-lg animate-pulse" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="default"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg text-sm px-4 py-2 h-9 font-medium"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <ModeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-lg bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor hover:bg-purple/10 hover:border-purple/30"
            >
              <User className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor rounded-xl"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-dark dark:text-light">
                {dbUser?.email || user.email}
              </p>
              <p className="text-xs text-dark/70 dark:text-light/70">
                Signed in
              </p>
            </div>
            <DropdownMenuSeparator className="bg-lightBorderColor dark:bg-darkBorderColor" />
            <DropdownMenuItem asChild>
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 text-dark dark:text-light hover:bg-purple/20 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-lightBorderColor dark:bg-darkBorderColor" />
            <DropdownMenuItem 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-dark dark:text-light hover:bg-purple/20 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <ModeToggle />
      <Link href="/sign-in">
        <Button
          variant="purple"
          size="default"
          className="rounded-lg text-sm px-6 py-2 h-9 font-medium"
        >
          Sign In
        </Button>
      </Link>
    </div>
  );
}