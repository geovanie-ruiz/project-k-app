import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { CookieConsent } from '@/components/custom/cookieConsent';
import { Footer } from '@/components/custom/footer';
import { NavBar } from '@/components/custom/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { og } from '@/utils/opengraph';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {/* // TODO responsive landing page */}
            <div className="flex flex-grow">
              <main className="container mx-auto px-4 py-8">{children}</main>
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
