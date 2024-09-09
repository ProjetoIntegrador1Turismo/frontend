import { auth } from './auth';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // da pra pegar a session nesse req.auth!
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTourRoute = nextUrl.pathname.toLowerCase().includes('tour/');
  const isAdminRoute = nextUrl.pathname.toLowerCase().includes('admin');
  const isGuidePanel = nextUrl.pathname.toLowerCase().includes('guide');

  let userType = '';

  if (req.auth) {
    userType = req.auth.user.userType;
  }

  if (isPublicRoute) {
    return;
  }

  if (isTourRoute) {
    return;
  }

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isAdminRoute && userType !== 'Admin') {
    return Response.redirect(new URL('/', nextUrl));
  }

  if (isGuidePanel && userType !== 'Guide' && userType !== 'Admin') {
    return Response.redirect(new URL('/', nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
