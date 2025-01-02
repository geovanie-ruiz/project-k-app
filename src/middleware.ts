import { isACollaborator } from '@/utils/types/roles.types';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// more on routing: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys
const isProtectedRoute = createRouteMatcher(['/profile(.*)']);
const isCollaboratorRoute = createRouteMatcher(['/admin(.*)']);
const isPublicRoute = createRouteMatcher(['/api/webhooks(.*)']);

// This Middleware does not protect any routes by default.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware
export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role || 'user';

  // Enforce some routes remain public, especially webhooks
  if (isPublicRoute(req)) return;

  // Validate a user is logged in or ask them to
  if (isProtectedRoute(req)) await auth.protect();

  // Validate
  if (isCollaboratorRoute(req) && !isACollaborator(role)) {
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
