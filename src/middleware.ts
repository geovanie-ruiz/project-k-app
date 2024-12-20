import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isntACollaborator } from './utils/roles';

// more on routing: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys
const isProtectedRoute = createRouteMatcher(['/profile(.*)']);
const isCollaboratorRoute = createRouteMatcher(['/admin(.*)']);

// This Middleware does not protect any routes by default.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware
export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role || '';

  // Validate a user is logged in or ask them to
  if (isProtectedRoute(req)) await auth.protect();

  // Validate
  if (isCollaboratorRoute(req) && isntACollaborator(role)) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
