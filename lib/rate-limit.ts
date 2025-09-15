import { NextRequest } from 'next/server'

interface RateLimitConfig {
  interval: number // em ms
  uniqueTokenPerInterval: number
}

const rateLimitMap = new Map()

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (request: NextRequest, limit: number, token: string) => {
      const tokenCount = rateLimitMap.get(token) || [0, Date.now()]
      
      if (Date.now() - tokenCount[1] > config.interval) {
        rateLimitMap.set(token, [1, Date.now()])
        return { success: true }
      }

      if (tokenCount[0] >= limit) {
        return {
          success: false,
          reset: new Date(tokenCount[1] + config.interval)
        }
      }

      tokenCount[0]++
      rateLimitMap.set(token, tokenCount)
      return { success: true }
    }
  }
}

// Configuração padrão: 10 requests por minuto
export const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500
})

export function getClientIP(request: NextRequest): string {
  return request.ip || 
         request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown'
}
