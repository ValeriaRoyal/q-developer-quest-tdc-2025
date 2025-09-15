import { Metadata } from 'next'
import { PerformanceDashboard } from '@/components/PerformanceDashboard'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Performance Metrics',
  description: 'Métricas de performance e Web Vitals do Hot Wheels Catalog'
}

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Performance Metrics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitoramento em tempo real das Core Web Vitals e métricas de performance
          </p>
        </div>

        <div className="space-y-8">
          <PerformanceDashboard />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              🤖 Otimizações Amazon Q Developer
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Otimizações Implementadas
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>✅ Code splitting automático</li>
                  <li>✅ Lazy loading de componentes</li>
                  <li>✅ Otimização de bundle</li>
                  <li>✅ Preload de recursos críticos</li>
                  <li>✅ Compressão de assets</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Métricas Alvo
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>🎯 LCP &lt; 2.5s</li>
                  <li>🎯 FID &lt; 100ms</li>
                  <li>🎯 CLS &lt; 0.1</li>
                  <li>🎯 FCP &lt; 1.8s</li>
                  <li>🎯 TTFB &lt; 800ms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
