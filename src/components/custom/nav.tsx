'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { isDarkTheme } from '@/lib/utils';
import clsx from 'clsx';

interface MenuProps {
  className: string;
}

interface NavItem {
  url: string;
  label: string;
  currentPathname: string;
}

export function NavBar() {
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center justify-center min-w-32 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="grid gap-6 p-6">
                  <Link
                    href="/spoilers"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Spoilers
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Card Library
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Deckbuilder
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Events
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" prefetch={false}>
              <Image
                src="9c217ebe-44b4-4239-4472-eae1efd54900/public"
                alt="Logo"
                width={48}
                height={40}
              />
              <span className="sr-only">Two Runes</span>
            </Link>
          </div>
          <nav className="hidden md:flex justify-evenly gap-4">
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
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: isDarkTheme(theme, systemTheme) ? dark : undefined,
                }}
                userProfileMode="navigation"
                userProfileUrl="/profile"
              />
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
      className={clsx(
        'font-medium flex items-center text-sm transition-colors hover:underline',
        {
          'text-blue-500': props.currentPathname === props.url,
        }
      )}
    >
      {props.label}
    </Link>
  );
}
