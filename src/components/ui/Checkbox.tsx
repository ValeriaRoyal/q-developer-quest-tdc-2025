import React, { useEffect, useId, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  error?: string | null
  helpText?: string
  required?: boolean
  id?: string
  className?: string
}

export function Checkbox({
  label,
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  error = null,
  helpText,
  required = false,
  id,
  className = '',
}: CheckboxProps) {
  const uid = useId()
  const inputId = id ?? `chk-${uid}`
  const errId = error ? `${inputId}-err` : undefined
  const helpId = helpText ? `${inputId}-help` : undefined
  const describedBy = [errId, helpId].filter(Boolean).join(' ') || undefined

  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !checked
    }
  }, [indeterminate, checked])

  return (
    <div className={clsx('flex items-start gap-2', className)}>
      {/* Input real */}
      <input
        id={inputId}
        ref={inputRef}
        type="checkbox"
        className="peer absolute h-5 w-5 opacity-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
      
      {/* Caixa visual */}
      <span 
        aria-hidden="true" 
        className={clsx(
          'inline-flex items-center justify-center rounded border transition h-5 w-5 shrink-0',
          disabled
            ? clsx(
                'opacity-50',
                checked || indeterminate 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600'
              )
            : error
            ? clsx(
                checked || indeterminate 
                  ? 'bg-orange-500 border-orange-500 text-white ring-1 ring-red-600/20 focus-visible:ring-2 focus-visible:ring-red-600/40'
                  : 'bg-white dark:bg-gray-800 border-red-600 ring-1 ring-red-600/20 focus-visible:ring-2 focus-visible:ring-red-600/40'
              )
            : clsx(
                checked || indeterminate 
                  ? 'bg-orange-500 border-orange-500 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40'
                  : 'bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40'
              )
        )}
      >
        {(checked || indeterminate) && (
          <FontAwesomeIcon
            icon={indeterminate ? faMinus : faCheck}
            className="h-3.5 w-3.5"
          />
        )}
      </span>

      {/* Label */}
      <label 
        htmlFor={inputId} 
        className={clsx(
          'select-none leading-5 cursor-pointer',
          disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'
        )}
      >
        <span className="align-middle">
          {label} {required && <span className="text-red-600">*</span>}
        </span>
        {error ? (
          <div id={errId} className="mt-1 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : helpText ? (
          <div id={helpId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helpText}
          </div>
        ) : null}
      </label>
    </div>
  )
}
