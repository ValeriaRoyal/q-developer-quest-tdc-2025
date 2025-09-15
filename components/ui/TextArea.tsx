import React, { useId } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faLock } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Density = 'compact' | 'comfortable'

interface TextAreaProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  showCount?: boolean
  disabled?: boolean
  locked?: boolean
  error?: string | null
  helpText?: string
  required?: boolean
  rows?: number
  density?: Density
  className?: string
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  showCount,
  disabled = false,
  locked = false,
  error = null,
  helpText,
  required = false,
  rows = 4,
  density = 'compact',
  className = '',
}: TextAreaProps) {
  const uid = useId()
  const inputId = id ?? `ta-${uid}`
  const helpId = helpText ? `${inputId}-help` : undefined
  const errId = error ? `${inputId}-err` : undefined
  const countId = maxLength ? `${inputId}-count` : undefined
  const describedBy = [errId, helpId, countId].filter(Boolean).join(' ') || undefined

  const counterEnabled = typeof maxLength === 'number' && (showCount ?? true)
  const currentLen = value?.length ?? 0

  return (
    <div className="w-full">
      <label 
        htmlFor={inputId} 
        className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div className="relative">
        {locked && (
          <span className="pointer-events-none absolute right-2 top-2 text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faLock} className="h-4 w-4" aria-hidden="true" />
          </span>
        )}

        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={locked}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={clsx(
            'block w-full resize-y rounded-md border outline-none transition disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500',
            density === 'compact' ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base',
            disabled
              ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
              : locked
              ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
              : error
              ? 'bg-white dark:bg-gray-900 border-red-600 text-gray-900 dark:text-gray-100 ring-1 ring-red-600/20 focus:ring-2 focus:ring-red-600/30 focus:border-red-600'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500',
            className
          )}
        />
      </div>

      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="min-h-[1.25rem]">
          {error ? (
            <p id={errId} className="flex items-center gap-1 text-sm text-red-700 dark:text-red-400">
              <FontAwesomeIcon icon={faCircleXmark} className="h-4 w-4" aria-hidden="true" />
              <span>{error}</span>
            </p>
          ) : helpText ? (
            <p id={helpId} className="text-sm text-gray-500 dark:text-gray-400">
              {helpText}
            </p>
          ) : null}
        </div>

        {counterEnabled && (
          <p
            id={countId}
            className={clsx(
              'text-xs',
              error ? 'text-red-700 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            )}
            aria-live="polite"
          >
            {currentLen}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
