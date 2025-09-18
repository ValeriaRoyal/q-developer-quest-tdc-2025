'use client'

import { useEffect } from 'react'
import { initWebVitals } from '@/lib/analytics'

export function WebVitalsReporter() {
  useEffect(() => {
    initWebVitals()
  }, [])

  return null // Componente invisível apenas para inicializar métricas
}
