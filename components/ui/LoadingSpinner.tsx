/**
 * Loading Spinner Component
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <FontAwesomeIcon 
        icon={faSpinner} 
        className={`${sizeClasses[size]} text-orange-500 animate-spin`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500">{text}</p>
      )}
    </div>
  )
}
