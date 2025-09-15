'use client'

import { useState, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh, faExclamationTriangle, faWifi } from '@fortawesome/free-solid-svg-icons'

interface RetryBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onRetry?: () => void
  maxRetries?: number
}

export function RetryBoundary({ 
  children, 
  fallback, 
  onRetry, 
  maxRetries = 3 
}: RetryBoundaryProps) {
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (retryCount >= maxRetries) return

    setIsRetrying(true)
    setRetryCount(prev => prev + 1)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay
      if (onRetry) {
        await onRetry()
      }
      // Reset on success
      setRetryCount(0)
    } catch (error) {
      console.error('Retry failed:', error)
    } finally {
      setIsRetrying(false)
    }
  }

  if (fallback) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        {fallback}
        <RetryButton 
          onRetry={handleRetry}
          isRetrying={isRetrying}
          retryCount={retryCount}
          maxRetries={maxRetries}
        />
      </div>
    )
  }

  return <>{children}</>
}

interface RetryButtonProps {
  onRetry: () => void
  isRetrying: boolean
  retryCount: number
  maxRetries: number
}

function RetryButton({ onRetry, isRetrying, retryCount, maxRetries }: RetryButtonProps) {
  const canRetry = retryCount < maxRetries

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={onRetry}
        disabled={!canRetry || isRetrying}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isRetrying ? 'Tentando novamente...' : 'Tentar novamente'}
      >
        <FontAwesomeIcon 
          icon={faRefresh} 
          className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`}
        />
        {isRetrying ? 'Tentando...' : 'Tentar Novamente'}
      </button>
      
      {retryCount > 0 && (
        <p className="text-sm text-gray-500">
          Tentativa {retryCount} de {maxRetries}
        </p>
      )}
      
      {retryCount >= maxRetries && (
        <p className="text-sm text-red-600">
          Máximo de tentativas atingido. Verifique sua conexão.
        </p>
      )}
    </div>
  )
}

// Componentes de fallback pré-definidos
export function NetworkErrorFallback() {
  return (
    <>
      <FontAwesomeIcon icon={faWifi} className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Erro de Conexão
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Não foi possível conectar ao servidor. Verifique sua conexão com a internet.
      </p>
    </>
  )
}

export function LoadingErrorFallback() {
  return (
    <>
      <FontAwesomeIcon icon={faExclamationTriangle} className="w-12 h-12 text-yellow-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Erro ao Carregar
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Ocorreu um erro ao carregar os dados. Tente novamente.
      </p>
    </>
  )
}

// Hook para usar retry em componentes
export function useRetry(asyncFn: () => Promise<void>, maxRetries = 3) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  const retry = async () => {
    if (retryCount >= maxRetries) return

    setIsRetrying(true)
    setRetryCount(prev => prev + 1)
    setError(null)

    try {
      await asyncFn()
      setRetryCount(0) // Reset on success
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsRetrying(false)
    }
  }

  return {
    retry,
    isRetrying,
    retryCount,
    maxRetries,
    error,
    canRetry: retryCount < maxRetries
  }
}
