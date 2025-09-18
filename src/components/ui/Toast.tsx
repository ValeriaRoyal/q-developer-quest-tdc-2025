/**
 * Enhanced Toast Component
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCheckCircle, 
  faExclamationTriangle, 
  faInfoCircle, 
  faTimes,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

export function Toast({ 
  message, 
  type, 
  duration = 5000, 
  onClose,
  action 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle
      case 'error':
        return faExclamationCircle
      case 'warning':
        return faExclamationTriangle
      case 'info':
        return faInfoCircle
    }
  }

  const getStyles = () => {
    const base = "flex items-center p-4 rounded-lg shadow-lg border-l-4 max-w-md transition-all duration-300"
    
    switch (type) {
      case 'success':
        return `${base} bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800`
      case 'error':
        return `${base} bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800`
      case 'warning':
        return `${base} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200`
      case 'info':
        return `${base} bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800`
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success': return 'text-green-500'
      case 'error': return 'text-red-500'
      case 'warning': return 'text-yellow-500'
      case 'info': return 'text-blue-500'
    }
  }

  if (!isVisible) return null

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
      `}
    >
      <div className={getStyles()}>
        <FontAwesomeIcon 
          icon={getIcon()} 
          className={`w-5 h-5 mr-3 ${getIconColor()}`}
        />
        
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm underline hover:no-underline"
            >
              {action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleClose}
          className="ml-3 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Hook para usar toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([])

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id, onClose: () => removeToast(id) }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )

  return {
    addToast,
    removeToast,
    ToastContainer,
    success: (message: string, options?: Partial<ToastProps>) => 
      addToast({ message, type: 'success', ...options }),
    error: (message: string, options?: Partial<ToastProps>) => 
      addToast({ message, type: 'error', ...options }),
    warning: (message: string, options?: Partial<ToastProps>) => 
      addToast({ message, type: 'warning', ...options }),
    info: (message: string, options?: Partial<ToastProps>) => 
      addToast({ message, type: 'info', ...options })
  }
}
