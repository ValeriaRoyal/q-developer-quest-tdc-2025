import React, { useId } from 'react'
import clsx from 'clsx'

interface RadioProps {
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  disabled?: boolean
  error?: boolean
  helpText?: string
  id?: string
  required?: boolean
  className?: string
}

export function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  error = false,
  helpText,
  id,
  required = false,
  className = '',
}: RadioProps) {
  const uid = useId()
  const inputId = id ?? `rd-${uid}`

  return (
    <div className={clsx('flex items-start gap-2', className)}>
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={clsx(
          'h-4 w-4 rounded-full border-gray-300 dark:border-gray-600',
          'text-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-0',
          error && 'ring-1 ring-red-600/30 focus:ring-red-600/40',
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'cursor-pointer hover:border-orange-400'
        )}
      />

      <label 
        htmlFor={inputId} 
        className={clsx(
          'select-none leading-5 cursor-pointer',
          disabled 
            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
            : 'text-gray-800 dark:text-gray-200'
        )}
      >
        {label} {required && <span className="text-red-600">*</span>}
        {helpText && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {helpText}
          </div>
        )}
      </label>
    </div>
  )
}
