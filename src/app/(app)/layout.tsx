import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { CookieConsent } from '@/components/custom/cookieConsent';
import { Footer } from '@/components/custom/footer';
import { NavBar } from '@/components/custom/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { og } from '@/utils/opengraph';

const geistSans = localFont({
  src: './_fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './_fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  openGraph: og(),
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen bg-[#FEFEFE] dark:bg-[#27272a]`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="absolute top-0 z-[-2] h-screen w-screen"></div>
            {breadcrumb}
            <div className="flex flex-grow">
              <main className="w-full">{children}</main>
              <Toaster />
            </div>
            <Footer />
            <CookieConsent />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
