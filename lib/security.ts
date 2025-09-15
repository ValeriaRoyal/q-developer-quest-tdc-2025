import { NextRequest, NextResponse } from 'next/server'
import { limiter, getClientIP } from './rate-limit'

export function securityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  
  return response
}

export async function validateRequest(request: NextRequest) {
  const ip = getClientIP(request)
  const pathname = request.nextUrl.pathname
  
  // Rate limiting por endpoint
  const limits: Record<string, number> = {
    '/api/auth': 5,
    '/api/cars': 30,
    '/api/packs': 30,
    '/api/favorites': 20,
    '/api/lists': 20
  }
  
  const limit = Object.entries(limits).find(([path]) => 
    pathname.startsWith(path)
  )?.[1] || 100
  
  const result = limiter.check(request, limit, ip)
  
  if (!result.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.round((result.reset!.getTime() - Date.now()) / 1000).toString()
        }
      }
    )
  }
  
  return null
}

export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  
  return input
}
