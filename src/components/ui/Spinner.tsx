import React from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'dark' | 'light' | 'contrast'

interface SpinnerProps {
  size?: Size
  variant?: Variant
  label?: string
  className?: string
}

export function Spinner({
  size = 'md',
  variant = 'default',
  label,
  className = '',
}: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-[3px]',
    lg: 'h-10 w-10 border-4'
  }

  const variants = {
    default: 'text-orange-600 dark:text-orange-400',
    dark: 'text-white',
    light: 'text-orange-600',
    contrast: 'text-white'
  }

  return (
    <span 
      className={clsx('inline-flex items-center gap-2', className)} 
      role="status" 
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={clsx(
          'inline-block animate-spin rounded-full border-current border-t-transparent',
          sizes[size],
          variants[variant]
        )}
      />
      {label && (
        <span className="text-sm text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
      {!label && <span className="sr-only">Carregando…</span>}
    </span>
  )
}
