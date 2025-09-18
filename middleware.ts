import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders, validateRequest } from './lib/security'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Aplicar headers de segurança
  securityHeaders(response)
  
  // Rate limiting apenas em produção
  if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResponse = await validateRequest(request)
    if (rateLimitResponse) {
      return securityHeaders(rateLimitResponse)
    }
  }
  
  // Em desenvolvimento, permitir acesso com parâmetro dev=true
  if (process.env.NODE_ENV === 'development') {
    const isDev = request.nextUrl.searchParams.get('dev') === 'true'
    
    if (isDev && request.nextUrl.pathname === '/') {
      response.cookies.set('dev-session', 'true', { 
        httpOnly: true, 
        secure: false, // Em desenvolvimento sempre false
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|manifest.json).*)',
  ],
}
