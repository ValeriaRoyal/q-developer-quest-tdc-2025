import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faTriangleExclamation,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type AlertVariant = 'success' | 'error' | 'warning' | 'info'
type Density = 'compact' | 'comfortable'

interface AlertProps {
  variant: AlertVariant
  title?: string
  children?: React.ReactNode
  linkLabel?: string
  onLinkClick?: () => void
  density?: Density
  className?: string
}

const variants = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    icon: faCircleCheck,
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: faCircleXmark,
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-200',
    icon: faTriangleExclamation,
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    icon: faCircleCheck,
  },
}

export function Alert({
  variant,
  title,
  children,
  linkLabel,
  onLinkClick,
  density = 'compact',
  className = '',
}: AlertProps) {
  const config = variants[variant]
  const role = variant === 'error' ? 'alert' : 'status'
  const ariaLive = variant === 'error' ? 'assertive' : 'polite'

  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={clsx(
        'w-full border rounded-md',
        config.bg,
        config.border,
        config.text,
        density === 'compact' ? 'px-4 py-3 text-sm' : 'px-6 py-4 text-base',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <FontAwesomeIcon
          icon={config.icon}
          className="h-5 w-5 mt-0.5 flex-shrink-0"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-medium mb-1">
              {title}
            </div>
          )}
          {children && (
            <div className="leading-relaxed">
              {children}
            </div>
          )}
        </div>
        {linkLabel && onLinkClick && (
          <button
            type="button"
            className="underline font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded flex-shrink-0"
            onClick={onLinkClick}
          >
            {linkLabel}
          </button>
        )}
      </div>
    </div>
  )
}

// Alias para compatibilidade
export const StatusBanner = Alert
