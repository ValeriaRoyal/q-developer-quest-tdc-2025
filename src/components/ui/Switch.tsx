import React, { useId } from 'react'
import clsx from 'clsx'

type Size = 'sm' | 'md'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
  size?: Size
  ariaLabel?: string
  className?: string
}

export function Switch({
  checked,
  onChange,
  disabled = false,
  id,
  size = 'md',
  ariaLabel,
  className = '',
}: SwitchProps) {
  const uid = useId()
  const inputId = id ?? `sw-${uid}`

  const sizes = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'peer-checked:translate-x-4'
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'peer-checked:translate-x-5'
    }
  }

  const sizeConfig = sizes[size]

  return (
    <span className={clsx('inline-flex items-center', className)}>
      {/* Input real (acessível) */}
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />

      {/* Trilho */}
      <span
        aria-hidden="true"
        className={clsx(
          'relative inline-flex rounded-full transition-colors duration-200',
          sizeConfig.track,
          'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500/40 peer-focus-visible:ring-offset-2',
          disabled
            ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-70'
            : checked
            ? 'bg-orange-500 cursor-pointer'
            : 'bg-gray-300 dark:bg-gray-600 cursor-pointer'
        )}
        onClick={() => !disabled && onChange(!checked)}
      >
        {/* Polegar */}
        <span
          className={clsx(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 left-1 translate-x-0 rounded-full bg-white shadow-sm transition-transform duration-200',
            sizeConfig.thumb,
            sizeConfig.translate
          )}
        />
      </span>
    </span>
  )
}
