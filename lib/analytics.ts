import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { useState, useEffect } from 'react'

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Função para enviar métricas (pode ser para Google Analytics, etc.)
function sendToAnalytics(metric: WebVitalMetric) {
  // Em produção, enviar para serviço de analytics
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id
    })
  }

  // Exemplo: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
    })
  }
}

// Inicializar monitoramento de Web Vitals
export function initWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

// Hook para usar Web Vitals em componentes React
export function useWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([])

  useEffect(() => {
    const handleMetric = (metric: WebVitalMetric) => {
      setMetrics(prev => [...prev.filter(m => m.name !== metric.name), metric])
    }

    onCLS(handleMetric)
    onINP(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)
  }, [])

  return metrics
}

// Utilitário para classificar performance
export function getPerformanceRating(value: number, thresholds: [number, number]): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds[0]) return 'good'
  if (value <= thresholds[1]) return 'needs-improvement'
  return 'poor'
}

// Thresholds oficiais do Google
export const WEB_VITALS_THRESHOLDS = {
  CLS: [0.1, 0.25],
  INP: [200, 500],
  FCP: [1800, 3000],
  LCP: [2500, 4000],
  TTFB: [800, 1800]
} as const
