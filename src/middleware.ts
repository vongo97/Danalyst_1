import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Rutas que son accesibles para todos
  const publicPaths = ['/', '/login', '/register', '/blog', '/courses', '/contact'];
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith('/blog/') || path.startsWith('/api/')
  );

  // Obtener el token de autenticación
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirigir a login si no hay token y la ruta no es pública
  if (!token && !isPublicPath) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Redirigir a dashboard si hay token y la ruta es login o register
  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continuar con la solicitud si todo está bien
  return NextResponse.next();
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. Todas las rutas que comienzan con /api/auth (rutas de NextAuth.js)
     * 2. Todas las rutas que comienzan con /api/ (otras rutas de API)
     * 3. Todas las rutas que comienzan con /_next (rutas internas de Next.js)
     * 4. Todas las rutas que comienzan con /public (archivos estáticos)
     */
    '/((?!api/auth|_next|public|images|favicon.ico).*)',
  ],
};