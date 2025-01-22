'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { cn, isDarkTheme } from '@/utils/utils';

import { isACollaborator, normalizeClerkRole } from '@/utils/types/roles.types';
import { useState } from 'react';
import LogoIcon from '../icons/2RunesLogo';
import ProfileIcon from '../icons/CreatorProfile';
import PayloadIcon from '../icons/PayloadCMS';
import { Search } from './search';

interface MenuProps {
  className: string;
}

interface NavItem {
  url: string;
  label: string;
  currentPathname: string;
}

export function NavBar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const { user } = useUser();
  const userRole = normalizeClerkRole(user?.publicMetadata?.role);
  const isCollaborator = !!userRole && isACollaborator(userRole);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-[65px] items-center">
          <div className="flex items-center justify-center min-w-32 gap-4">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="grid gap-6 p-6">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    <h1>2Runes.gg</h1>
                  </Link>
                  <hr />
                  <Link
                    href="/articles"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link
                    href="/spoilers"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Spoilers
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Card Library
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Deckbuilder
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Events
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/">
              <LogoIcon className="w-[60px] h-[38px]" />
              <span className="sr-only">Two Runes</span>
            </Link>
          </div>
          <nav className="hidden md:flex justify-evenly gap-4">
            <NavLink
              url="/articles"
              label="Articles"
              currentPathname={pathname}
            />
            <NavLink
              url="/spoilers"
              label="Spoilers"
              currentPathname={pathname}
            />
            <NavLink url="#" label="Card Library" currentPathname={pathname} />
            <NavLink url="#" label="Deck Builder" currentPathname={pathname} />
            <NavLink url="#" label="Events" currentPathname={pathname} />
          </nav>
          <div className="flex items-center justify-center min-w-32 gap-4">
            <Search />
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: isDarkTheme(theme, systemTheme) ? dark : undefined,
                  elements: {
                    userButtonAvatarBox: {
                      width: '45px',
                      height: '45px',
                    },
                  },
                }}
                userProfileMode="navigation"
                userProfileUrl="/profile"
              >
                <UserButton.MenuItems>
                  {isCollaborator && (
                    <UserButton.Link
                      label="Creator Portal"
                      labelIcon={<PayloadIcon />}
                      href="/admin"
                    />
                  )}
                  {isCollaborator && (
                    <UserButton.Link
                      label="Creator Profile"
                      labelIcon={<ProfileIcon />}
                      href="/admin/account"
                    />
                  )}
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Action label="signOut" />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon(props: MenuProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function NavLink(props: NavItem) {
  return (
    <Link
      href={props.url}
      className={cn(
        'text-muted-foreground font-medium flex items-center text-sm transition-colors hover:text-primary',
        {
          underline: props.currentPathname === props.url,
          'text-primary': props.currentPathname === props.url,
        }
      )}
    >
      {props.label}
    </Link>
  );
}
