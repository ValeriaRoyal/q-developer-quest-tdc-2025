import React, { useId } from 'react'
import clsx from 'clsx'

export interface RadioTile {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioTileGroupProps {
  legend: string
  items: RadioTile[]
  value: string | null
  onChange: (value: string) => void
  error?: string | null
  required?: boolean
  name?: string
  colsMd?: 1 | 2 | 3
  colsLg?: 1 | 2 | 3 | 4
  className?: string
}

export function RadioTileGroup({
  legend,
  items,
  value,
  onChange,
  error = null,
  required = false,
  name,
  colsMd = 1,
  colsLg = 1,
  className = '',
}: RadioTileGroupProps) {
  const autoName = useId()
  const groupName = name ?? `rtg-${autoName}`
  const errId = error ? `${groupName}-err` : undefined

  const gridClasses = clsx(
    'grid grid-cols-1 gap-3',
    colsMd === 2 && 'md:grid-cols-2',
    colsMd === 3 && 'md:grid-cols-3',
    colsLg === 2 && 'lg:grid-cols-2',
    colsLg === 3 && 'lg:grid-cols-3',
    colsLg === 4 && 'lg:grid-cols-4'
  )

  return (
    <fieldset
      className={clsx('w-full', className)}
      aria-describedby={errId}
      aria-invalid={!!error || undefined}
    >
      <legend className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {legend} {required && <span className="text-red-600">*</span>}
      </legend>

      <div className={gridClasses}>
        {items.map((item) => {
          const checked = value === item.value
          const disabled = !!item.disabled

          return (
            <label
              key={item.value}
              className={clsx(
                'group relative block rounded-lg border p-4 transition-all duration-200',
                'focus-within:outline-none',
                disabled
                  ? 'cursor-not-allowed opacity-60 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  : clsx(
                      'cursor-pointer hover:shadow-md bg-white dark:bg-gray-800',
                      error && !checked
                        ? 'border-red-600 focus-within:ring-2 focus-within:ring-red-600/40'
                        : checked
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 focus-within:ring-2 focus-within:ring-orange-500/40'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 focus-within:ring-2 focus-within:ring-orange-500/40'
                    )
              )}
            >
              {/* Input real (oculto) */}
              <input
                type="radio"
                name={groupName}
                value={item.value}
                checked={checked}
                onChange={() => !disabled && onChange(item.value)}
                disabled={disabled}
                className="peer sr-only"
                aria-invalid={!!error || undefined}
              />

              <div className="flex items-start gap-3">
                {/* Círculo customizado */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    'relative mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                    checked 
                      ? 'border-orange-600 dark:border-orange-400' 
                      : 'border-gray-400 dark:border-gray-500 group-hover:border-orange-500'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute h-2.5 w-2.5 rounded-full transition-transform duration-200',
                      checked 
                        ? 'scale-100 bg-orange-600 dark:bg-orange-400' 
                        : 'scale-0 bg-transparent'
                    )}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className={clsx(
                    'text-base leading-6 font-medium',
                    disabled 
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-900 dark:text-gray-100'
                  )}>
                    {item.label}
                  </div>
                  {item.description && (
                    <div className={clsx(
                      'mt-1 text-sm',
                      disabled 
                        ? 'text-gray-300 dark:text-gray-700'
                        : 'text-gray-600 dark:text-gray-400'
                    )}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errId} className="mt-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  )
}
