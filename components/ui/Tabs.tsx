import React, { useEffect, useId, useMemo, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Appearance = 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

export interface TabItem {
  id: string
  label: string
  icon?: IconDefinition
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  appearance?: Appearance
  size?: Size
  className?: string
  'aria-label'?: string
}

export function Tabs({
  items,
  value,
  onChange,
  appearance = 'light',
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Navegação por abas',
}: TabsProps) {
  const ids = useMemo(() => items.map(i => i.id), [items])
  const selectedIndex = Math.max(0, ids.indexOf(value))
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const listId = useId()

  const theme = {
    light: {
      idle: 'text-gray-700 dark:text-gray-300',
      hover: 'hover:text-gray-900 dark:hover:text-gray-100',
      selected: 'text-orange-600 dark:text-orange-400',
      underline: 'bg-orange-600 dark:bg-orange-400',
      disabled: 'text-gray-300 dark:text-gray-600',
      border: 'border-gray-300 dark:border-gray-600'
    },
    dark: {
      idle: 'text-gray-200',
      hover: 'hover:text-white',
      selected: 'text-white',
      underline: 'bg-white',
      disabled: 'text-gray-500 dark:text-gray-600',
      border: 'border-gray-600'
    }
  }

  const sizes = {
    sm: { 
      pad: 'px-2.5 py-2', 
      text: 'text-sm', 
      gap: 'gap-1.5', 
      underlineH: 'h-0.5' 
    },
    md: { 
      pad: 'px-3 py-2.5', 
      text: 'text-sm', 
      gap: 'gap-2', 
      underlineH: 'h-0.5' 
    },
    lg: { 
      pad: 'px-4 py-3', 
      text: 'text-base', 
      gap: 'gap-2.5', 
      underlineH: 'h-0.5' 
    }
  }

  const currentTheme = theme[appearance]
  const currentSize = sizes[size]

  const moveFocus = (dir: -1 | 1) => {
    let i = selectedIndex
    for (let step = 0; step < items.length; step++) {
      i = (i + dir + items.length) % items.length
      if (!items[i].disabled) {
        tabRefs.current[i]?.focus()
        return
      }
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { 
      e.preventDefault()
      moveFocus(1)
    }
    if (e.key === 'ArrowLeft') { 
      e.preventDefault()
      moveFocus(-1)
    }
    if (e.key === 'Home') { 
      e.preventDefault()
      tabRefs.current[0]?.focus()
    }
    if (e.key === 'End') { 
      e.preventDefault()
      tabRefs.current[items.length - 1]?.focus()
    }
  }

  useEffect(() => {
    const idx = Math.max(0, ids.indexOf(value))
    tabRefs.current[idx]?.setAttribute('tabindex', '0')
  }, [value, ids])

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        id={`tablist-${listId}`}
        className={clsx(
          'flex w-full items-end gap-2 border-b transition-colors',
          currentTheme.border
        )}
        onKeyDown={onKeyDown}
      >
        {items.map((tab, i) => {
          const selected = tab.id === value
          const disabled = !!tab.disabled

          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[i] = el }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={disabled}
              className={clsx(
                'group relative inline-flex items-center rounded-t-md transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40',
                currentSize.gap,
                currentSize.pad,
                disabled
                  ? clsx('cursor-not-allowed', currentTheme.disabled)
                  : clsx(
                      'cursor-pointer',
                      currentTheme.idle,
                      currentTheme.hover
                    ),
                selected && currentTheme.selected
              )}
              onClick={() => !disabled && onChange(tab.id)}
            >
              {tab.icon && (
                <FontAwesomeIcon
                  icon={tab.icon}
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              )}

              <span className={currentSize.text}>{tab.label}</span>

              {/* Underline indicator */}
              <span
                aria-hidden="true"
                className={clsx(
                  'pointer-events-none absolute left-2 right-2 -bottom-px rounded-full transition-opacity',
                  currentSize.underlineH,
                  selected 
                    ? clsx('opacity-100', currentTheme.underline)
                    : 'opacity-0',
                  !selected && !disabled && 'group-hover:opacity-60'
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface TabPanelProps {
  when: string
  active: string
  children: React.ReactNode
  className?: string
}

export function TabPanel({ 
  when, 
  active, 
  children, 
  className = '' 
}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`panel-${when}`}
      aria-labelledby={`tab-${when}`}
      hidden={active !== when}
      className={clsx('pt-4', className)}
    >
      {active === when ? children : null}
    </div>
  )
}
