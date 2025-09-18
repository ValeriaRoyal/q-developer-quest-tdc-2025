import React from 'react'
import { Spinner } from './Spinner'

interface LoadingOverlayProps {
  show: boolean
  children?: React.ReactNode
  message?: string
}

export function LoadingOverlay({ 
  show, 
  children, 
  message = 'Carregando...' 
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {show && (
        <div className="absolute inset-0 grid place-items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" variant="default" />
            {message && (
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
