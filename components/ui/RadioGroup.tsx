import React, { useId } from 'react'
import { Radio } from './Radio'
import clsx from 'clsx'

export interface RadioItem {
  value: string
  label: string
  disabled?: boolean
  helpText?: string
}

interface RadioGroupProps {
  legend: string
  name?: string
  items: RadioItem[]
  value: string | null
  onChange: (value: string) => void
  error?: string | null
  required?: boolean
  className?: string
}

export function RadioGroup({
  legend,
  name,
  items,
  value,
  onChange,
  error = null,
  required = false,
  className = '',
}: RadioGroupProps) {
  const autoName = useId()
  const groupName = name ?? `rg-${autoName}`
  const errId = error ? `${groupName}-err` : undefined

  return (
    <fieldset
      className={clsx('w-full', className)}
      aria-describedby={errId}
      aria-invalid={!!error || undefined}
    >
      <legend className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
        {legend} {required && <span className="text-red-600">*</span>}
      </legend>

      <div className="space-y-3">
        {items.map((item) => (
          <Radio
            key={item.value}
            name={groupName}
            label={item.label}
            value={item.value}
            checked={value === item.value}
            onChange={onChange}
            disabled={item.disabled}
            helpText={item.helpText}
            error={!!error && !item.disabled}
          />
        ))}
      </div>

      {error && (
        <p id={errId} className="mt-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  )
}
