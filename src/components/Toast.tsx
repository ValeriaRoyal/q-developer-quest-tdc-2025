'use client'

import { useEffect, useState } from 'react'
import { Icon } from './Icon'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10)
    
    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const getToastStyles = () => {
    const baseStyles = "flex items-center p-4 rounded-lg shadow-lg border-l-4 max-w-sm"
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 dark:bg-green-900/20 border-green-400 text-green-800`
      case 'error':
        return `${baseStyles} bg-red-50 dark:bg-red-900/20 border-red-400 text-red-800`
      case 'warning':
        return `${baseStyles} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 text-yellow-800 dark:text-yellow-200`
      case 'info':
        return `${baseStyles} bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-800`
      default:
        return `${baseStyles} bg-gray-50 dark:bg-gray-900 border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200`
    }
  }

  const getIconName = (): string => {
    switch (type) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'warning':
        return 'triangleExclamation'
      case 'info':
        return 'info'
      default:
        return 'info'
    }
  }

  const getAriaLabel = (): string => {
    switch (type) {
      case 'success':
        return 'Sucesso'
      case 'error':
        return 'Erro'
      case 'warning':
        return 'Aviso'
      case 'info':
        return 'Informação'
      default:
        return 'Notificação'
    }
  }

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={getToastStyles()}>
        <Icon 
          name={getIconName()}
          size="md"
          className="mr-3 flex-shrink-0"
          aria-label={getAriaLabel()}
        />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-3 flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity rounded-sm focus:outline-none focus:ring-2 focus:ring-current"
          aria-label="Fechar notificação"
          type="button"
        >
          <Icon 
            name="close"
            size="sm"
            aria-label="Fechar"
          />
        </button>
      </div>
    </div>
  )
}
