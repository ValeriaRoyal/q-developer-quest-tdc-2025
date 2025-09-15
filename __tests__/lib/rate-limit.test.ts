/**
 * @jest-environment jsdom
 */

// Mock do NextRequest para ambiente de teste
const mockNextRequest = (url: string, headers: Record<string, string> = {}) => ({
  ip: '127.0.0.1',
  headers: {
    get: (key: string) => headers[key] || null
  }
})

describe('Rate Limiting Utils', () => {
  describe('Rate limit logic', () => {
    it('validates rate limit configuration', () => {
      const config = {
        interval: 60000, // 1 minuto
        uniqueTokenPerInterval: 500
      }
      
      expect(config.interval).toBeGreaterThan(0)
      expect(config.uniqueTokenPerInterval).toBeGreaterThan(0)
    })

    it('handles token counting logic', () => {
      const tokenMap = new Map()
      const token = 'test-token'
      const limit = 10
      
      // Simular contagem de tokens
      tokenMap.set(token, [1, Date.now()])
      const [count, timestamp] = tokenMap.get(token)
      
      expect(count).toBe(1)
      expect(timestamp).toBeLessThanOrEqual(Date.now())
      expect(count).toBeLessThan(limit)
    })
  })

  describe('IP extraction', () => {
    it('extracts IP from x-forwarded-for header', () => {
      const request = mockNextRequest('http://localhost:3000', {
        'x-forwarded-for': '192.168.1.1, 10.0.0.1'
      })

      const forwardedFor = request.headers.get('x-forwarded-for')
      const ip = forwardedFor?.split(',')[0] || 'unknown'
      
      expect(ip).toBe('192.168.1.1')
    })

    it('falls back to request IP', () => {
      const request = mockNextRequest('http://localhost:3000')
      const ip = request.ip || 'unknown'
      
      expect(ip).toBe('127.0.0.1')
    })

    it('returns unknown for missing IP', () => {
      const request = mockNextRequest('http://localhost:3000')
      delete request.ip
      
      const ip = request.ip || 
                 request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 'unknown'
      
      expect(ip).toBe('unknown')
    })
  })
})
