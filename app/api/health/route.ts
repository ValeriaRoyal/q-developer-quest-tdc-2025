// Health check endpoint for free hosting platforms
// Desenvolvido com Amazon Q Developer

export async function GET() {
  try {
    // Basic health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: 'checking...'
    }

    // Check database connection if available
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
        const { db } = await import('@/db/client')
        // Simple query to test connection
        await db.select().from({ dummy: 'information_schema.tables' }).limit(1)
        health.database = 'connected'
      } else {
        health.database = 'not_configured'
      }
    } catch (error) {
      health.database = 'error'
    }

    return Response.json(health, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}
