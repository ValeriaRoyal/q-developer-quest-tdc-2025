'use client'

import { useWebVitals } from '@/lib/analytics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

interface MetricCardProps {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  unit: string
  description: string
}

function MetricCard({ name, value, rating, unit, description }: MetricCardProps) {
  const getRatingColor = () => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
    }
  }

  const getRatingIcon = () => {
    switch (rating) {
      case 'good': return faCheckCircle
      case 'needs-improvement': return faExclamationTriangle
      case 'poor': return faTimesCircle
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{name}</h3>
        <FontAwesomeIcon 
          icon={getRatingIcon()} 
          className={`w-4 h-4 ${getRatingColor().split(' ')[0]}`}
        />
      </div>
      
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {Math.round(value)}
        </span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRatingColor()}`}>
        {rating === 'good' ? 'Bom' : rating === 'needs-improvement' ? 'Precisa Melhorar' : 'Ruim'}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  )
}

export function PerformanceDashboard() {
  const metrics = useWebVitals()

  const metricDescriptions = {
    CLS: 'Estabilidade visual da página',
    INP: 'Tempo de resposta à interação',
    FCP: 'Tempo para primeiro conteúdo aparecer',
    LCP: 'Tempo para maior elemento carregar',
    TTFB: 'Tempo de resposta do servidor'
  }

  const metricUnits = {
    CLS: '',
    INP: 'ms',
    FCP: 'ms', 
    LCP: 'ms',
    TTFB: 'ms'
  }

  if (metrics.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faGauge} className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Performance Metrics
          </h2>
        </div>
        <p className="text-gray-500">Coletando métricas de performance...</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faGauge} className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Core Web Vitals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.name}
            name={metric.name}
            value={metric.value}
            rating={metric.rating}
            unit={metricUnits[metric.name as keyof typeof metricUnits]}
            description={metricDescriptions[metric.name as keyof typeof metricDescriptions]}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          📊 Amazon Q Developer Impact
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-200">
          Performance otimizada automaticamente: lazy loading, code splitting e otimizações geradas pela IA.
        </p>
      </div>
    </div>
  )
}
