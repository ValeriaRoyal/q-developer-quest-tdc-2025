type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogData {
  level: LogLevel
  message: string
  data?: any
  timestamp: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  
  private log(level: LogLevel, message: string, data?: any) {
    const logData: LogData = {
      level,
      message,
      timestamp: new Date().toISOString()
    }
    
    // Em desenvolvimento, incluir dados completos
    if (this.isDevelopment && data) {
      logData.data = data
    }
    
    // Em produção, sanitizar dados sensíveis
    if (!this.isDevelopment && data) {
      logData.data = this.sanitizeForProduction(data)
    }
    
    console.log(JSON.stringify(logData))
  }
  
  private sanitizeForProduction(data: any): any {
    if (typeof data === 'string') {
      // Remover possíveis credenciais ou dados sensíveis
      return data.replace(/password|token|secret|key/gi, '[REDACTED]')
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(data)) {
        if (/password|token|secret|key|credential/i.test(key)) {
          sanitized[key] = '[REDACTED]'
        } else {
          sanitized[key] = this.sanitizeForProduction(value)
        }
      }
      return sanitized
    }
    
    return data
  }
  
  info(message: string, data?: any) {
    this.log('info', message, data)
  }
  
  warn(message: string, data?: any) {
    this.log('warn', message, data)
  }
  
  error(message: string, data?: any) {
    this.log('error', message, data)
  }
  
  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      this.log('debug', message, data)
    }
  }
}

export const logger = new Logger()
