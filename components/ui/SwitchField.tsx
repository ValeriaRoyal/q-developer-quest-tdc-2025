import React, { useId } from 'react'
import { Switch } from './Switch'
import clsx from 'clsx'

interface SwitchFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md'
  helpText?: string
  error?: string
  required?: boolean
  className?: string
}

export function SwitchField({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  helpText,
  error,
  required = false,
  className = '',
}: SwitchFieldProps) {
  const uid = useId()
  const switchId = `switch-${uid}`
  const helpId = helpText ? `${switchId}-help` : undefined
  const errorId = error ? `${switchId}-error` : undefined

  return (
    <div className={clsx('flex items-start justify-between gap-3', className)}>
      <div className="flex-1 min-w-0">
        <label 
          htmlFor={switchId} 
          className={clsx(
            'block text-sm font-medium cursor-pointer select-none',
            disabled 
              ? 'text-gray-400 dark:text-gray-600' 
              : 'text-gray-800 dark:text-gray-200'
          )}
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
        
        {helpText && (
          <p 
            id={helpId}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
        
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>

      <Switch
        id={switchId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size={size}
        ariaLabel={label}
        className="flex-shrink-0"
      />
    </div>
  )
}
