import React, { useMemo } from 'react'
import { Checkbox } from './Checkbox'

export interface GroupItem {
  id: string
  label: string
  disabled?: boolean
}

interface CheckboxGroupProps {
  legend?: string
  items: GroupItem[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string | null
  showSelectAll?: boolean
  className?: string
}

export function CheckboxGroup({
  legend = 'Opções',
  items,
  value,
  onChange,
  error = null,
  showSelectAll = true,
  className = '',
}: CheckboxGroupProps) {
  const enabledIds = items.filter(item => !item.disabled).map(item => item.id)
  const allChecked = enabledIds.length > 0 && enabledIds.every(id => value.includes(id))
  const someChecked = enabledIds.some(id => value.includes(id)) && !allChecked

  const onToggleAll = () => {
    if (allChecked) {
      onChange(value.filter(v => !enabledIds.includes(v)))
    } else {
      onChange([...new Set([...value, ...enabledIds])])
    }
  }

  const list = useMemo(() => items, [items])

  return (
    <fieldset className={`w-full ${className}`}>
      <legend className="mb-2 font-medium text-gray-900 dark:text-gray-100">
        {legend}
      </legend>

      {showSelectAll && enabledIds.length > 1 && (
        <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
          <Checkbox
            label="Selecionar tudo"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={onToggleAll}
          />
        </div>
      )}

      <ul className="space-y-2">
        {list.map((item) => (
          <li key={item.id}>
            <Checkbox
              label={item.label}
              checked={value.includes(item.id)}
              onChange={(checked) =>
                onChange(
                  checked 
                    ? [...value, item.id] 
                    : value.filter((v) => v !== item.id)
                )
              }
              disabled={item.disabled}
            />
          </li>
        ))}
      </ul>

      {error && (
        <p className="mt-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  )
}
