'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { isDarkTheme } from '@/utils/utils';

import LogoIcon from '@/components/icons/2RunesLogo';
import ProfileIcon from '@/components/icons/CreatorProfile';
import PayloadIcon from '@/components/icons/PayloadCMS';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { isACollaborator, normalizeClerkRole } from '@/utils/types/roles.types';
import { useState } from 'react';
import { Search } from './search';

interface MenuProps {
  className: string;
}

interface NavItem {
  url: string;
  currentPathname: string;
  label: string;
}

type SheetMenuProps = {
  pathname: string;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
};

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

const SheetMenu = ({ pathname, sheetOpen, setSheetOpen }: SheetMenuProps) => {
  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={setSheetOpen}
      aria-modal="true"
      aria-labelledby="nav-menu-title"
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={sheetOpen}
          aria-controls="navigation-menu"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        id="navigation-menu"
        aria-label="Site Navigation"
      >
        <SheetTitle>2Runes.gg</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation menu
        </SheetDescription>
        <div
          className="grid gap-6 px-6"
          role="navigation"
          aria-labelledby="sheet-title"
        >
          <div className="pt-6">
            <Search />
          </div>
          <hr role="seperator" aria-orientation="horizontal" />
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4 py-4"
            onClick={() => setSheetOpen(false)}
            role="menuitem"
            aria-current={pathname === '/'}
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-sm font-medium hover:underline underline-offset-4 py-4"
            onClick={() => setSheetOpen(false)}
            role="menuitem"
            aria-current={pathname === '/articles'}
          >
            Articles
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="card-library" className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:pointer">
                Card Library
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-6 pl-4 pt-4">
                  <Link
                    href="/cards"
                    className="text-sm font-medium hover:underline underline-offset-4 py-4"
                    onClick={() => setSheetOpen(false)}
                    role="menuitem"
                    aria-current={pathname === '/cards'}
                  >
                    Card Browser
                  </Link>

                  <Link
                    href="/sets"
                    className="text-sm font-medium hover:underline underline-offset-4 py-4"
                    onClick={() => setSheetOpen(false)}
                    role="menuitem"
                    aria-current={pathname === '/sets'}
                  >
                    Set List
                  </Link>

                  <Link
                    href="/spoilers"
                    className="text-sm font-medium hover:underline underline-offset-4 pt-4"
                    onClick={() => setSheetOpen(false)}
                    role="menuitem"
                    aria-current={pathname === '/spoilers'}
                  >
                    Spoilers
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 py-4"
            onClick={() => setSheetOpen(false)}
          >
            Deckbuilder
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 py-4"
            onClick={() => setSheetOpen(false)}
          >
            Collection
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium hover:underline underline-offset-4 py-4"
            onClick={() => setSheetOpen(false)}
            role="menuitem"
            aria-current={pathname === '/events'}
          >
            Events
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function NavLink(props: NavItem) {
  const isActive = props.currentPathname === props.url;
  return (
    <Link passHref legacyBehavior href={props.url}>
      <NavigationMenuLink
        active={isActive}
        className={navigationMenuTriggerStyle()}
        role="menuitem"
        aria-label={`Navigate to ${props.label}`}
        aria-current={isActive}
      >
        {props.label}
      </NavigationMenuLink>
    </Link>
  );
}

const NavListItem = ({
  url,
  label,
  children,
}: {
  url: string;
  label: string;
  children: string;
}) => {
  return (
    <li>
      <Link passHref legacyBehavior href={url}>
        <NavigationMenuLink
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          role="menuitem"
        >
          <div className="text-sm front-medium leading-none">{label}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};

const Navbar = ({ pathname }: { pathname: string }) => {
  return (
    <NavigationMenu role="navigation" aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink
            url="/articles"
            label="Articles"
            currentPathname={pathname}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Card Library</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <div className="mb-2 mt-4 text-lg font-medium">
                  Explore Project K
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Browse through the cards and sets that make up the beating
                  heart of Project K and plan your next deck list.
                </p>
              </li>
              <NavListItem url="/cards" label="Card Browser">
                Search through all currently released cards.
              </NavListItem>
              <NavListItem url="/sets" label="Set list">
                Look through the cards as organized by released collection.
              </NavListItem>
              <NavListItem url="/spoilers" label="Spoilers">
                Stay up to date on all the latest reveals for upcoming cards.
              </NavListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink url="#" label="Deck Builder" currentPathname={pathname} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink url="#" label="Collection" currentPathname={pathname} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink url="/events" label="Events" currentPathname={pathname} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export function NavBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const { user } = useUser();
  const userRole = normalizeClerkRole(user?.publicMetadata?.role);
  const isCollaborator = !!userRole && isACollaborator(userRole);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-[65px]">
          <div className="flex items-center justify-start gap-4">
            <SheetMenu
              pathname={pathname}
              sheetOpen={sheetOpen}
              setSheetOpen={setSheetOpen}
            />
            <Link href="/">
              <LogoIcon className="w-[60px] h-[38px]" />
              <span className="sr-only">Two Runes</span>
            </Link>
            <div className="hidden md:block">
              <Navbar pathname={pathname} />
            </div>
          </div>
          <div className="flex items-center justify-end basis-1/3 gap-4">
            <div className="max-sm:hidden">
              <Search />
            </div>
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
    </div>
  );
}
