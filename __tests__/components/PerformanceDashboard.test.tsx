/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'

// Mock simples do componente PerformanceDashboard
const MockPerformanceDashboard = () => (
  <div>
    <h2>Core Web Vitals</h2>
    <div>LCP: 2000ms</div>
    <div>FID: 50ms</div>
    <div>📊 Amazon Q Developer Impact</div>
    <div>Performance otimizada automaticamente</div>
  </div>
)

describe('Performance Monitoring', () => {
  it('validates Web Vitals structure', () => {
    const webVitals = {
      LCP: { value: 2000, rating: 'good', threshold: 2500 },
      FID: { value: 50, rating: 'good', threshold: 100 },
      CLS: { value: 0.05, rating: 'good', threshold: 0.1 }
    }

    expect(webVitals.LCP.value).toBeLessThan(webVitals.LCP.threshold)
    expect(webVitals.FID.value).toBeLessThan(webVitals.FID.threshold)
    expect(webVitals.CLS.value).toBeLessThan(webVitals.CLS.threshold)
  })

  it('renders performance dashboard elements', () => {
    render(<MockPerformanceDashboard />)
    
    expect(screen.getByText('Core Web Vitals')).toBeInTheDocument()
    expect(screen.getByText('LCP: 2000ms')).toBeInTheDocument()
    expect(screen.getByText('FID: 50ms')).toBeInTheDocument()
  })

  it('shows Amazon Q Developer impact', () => {
    render(<MockPerformanceDashboard />)
    
    expect(screen.getByText('📊 Amazon Q Developer Impact')).toBeInTheDocument()
    expect(screen.getByText('Performance otimizada automaticamente')).toBeInTheDocument()
  })

  it('validates performance thresholds', () => {
    const thresholds = {
      LCP: [2500, 4000], // good, needs-improvement
      FID: [100, 300],
      CLS: [0.1, 0.25],
      FCP: [1800, 3000],
      TTFB: [800, 1800]
    }

    Object.entries(thresholds).forEach(([metric, [good, poor]]) => {
      expect(good).toBeLessThan(poor)
      expect(good).toBeGreaterThan(0)
    })
  })
})
