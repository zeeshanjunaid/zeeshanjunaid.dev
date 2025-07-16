// /middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Add routes that should be accessible to both signed-in and signed-out users.
  // The an API webhook route for Clerk is also made public here.
  publicRoutes: ['/', '/about', '/services', '/work', '/reviews', '/hire-me', '/contact', '/api/webhooks/clerk'],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};