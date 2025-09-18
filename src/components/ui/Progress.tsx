import React from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'success' | 'warning' | 'danger'

interface ProgressProps {
  value: number
  max?: number
  size?: Size
  variant?: Variant
  label?: string
  showValue?: boolean
  className?: string
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const variants = {
    default: 'bg-orange-600 dark:bg-orange-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    danger: 'bg-red-600 dark:bg-red-500'
  }

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={clsx(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizes[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300 ease-out',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
