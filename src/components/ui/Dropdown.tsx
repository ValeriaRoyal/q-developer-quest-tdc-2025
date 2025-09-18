import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

export interface DropItem {
  value: string
  label: string
  disabled?: boolean
}

type Align = 'start' | 'end'

interface DropdownProps {
  label?: string
  items: DropItem[]
  value?: string | null
  onChange?: (value: string) => void
  disabled?: boolean
  align?: Align
  className?: string
}

function findLastEnabled(items: DropItem[]) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (!items[i].disabled) return i
  }
  return -1
}

export function Dropdown({
  label = 'Selecionar',
  items,
  value = null,
  onChange,
  disabled = false,
  align = 'start',
  className = '',
}: DropdownProps) {
  const uid = useId()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const selectedIndex = useMemo(() => {
    const idx = items.findIndex(i => i.value === value)
    return idx >= 0 ? idx : -1
  }, [items, value])

  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : items.findIndex(i => !i.disabled)
  )

  // Fecha no clique fora
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (btnRef.current?.contains(t) || listRef.current?.contains(t)) return
      setOpen(false)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [open])

  // Fecha no Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const openMenu = () => {
    if (disabled) return
    setOpen(true)
    setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]') ?? listRef.current
      el?.focus()
    }, 0)
  }

  const selectByIndex = (idx: number) => {
    const it = items[idx]
    if (!it || it.disabled) return
    onChange?.(it.value)
    setOpen(false)
    btnRef.current?.focus()
  }

  const move = (dir: 1 | -1) => {
    if (!items.length) return
    let i = activeIndex
    for (let step = 0; step < items.length; step++) {
      i = (i + dir + items.length) % items.length
      if (!items[i].disabled) { 
        setActiveIndex(i)
        break
      }
    }
  }

  const menuId = `dd-list-${uid}`
  const btnId = `dd-btn-${uid}`

  return (
    <div className={clsx('relative inline-block', className)}>
      {/* Trigger */}
      <button
        id={btnId}
        ref={btnRef}
        type="button"
        className={clsx(
          'inline-flex items-center gap-2 px-2 py-1 rounded transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40',
          disabled
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? setOpen(false) : openMenu())}
        disabled={disabled}
      >
        {label}
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={clsx(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )} 
        />
      </button>

      {/* Menu */}
      {open && (
        <div
          id={menuId}
          ref={listRef}
          role="menu"
          tabIndex={-1}
          aria-labelledby={btnId}
          className={clsx(
            'absolute z-50 mt-2 min-w-[220px] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg focus:outline-none',
            align === 'end' ? 'right-0' : 'left-0'
          )}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { 
              e.preventDefault()
              move(1)
            }
            if (e.key === 'ArrowUp') { 
              e.preventDefault()
              move(-1)
            }
            if (e.key === 'Home') { 
              e.preventDefault()
              setActiveIndex(items.findIndex(i => !i.disabled))
            }
            if (e.key === 'End') { 
              e.preventDefault()
              setActiveIndex(findLastEnabled(items))
            }
            if (e.key === 'Enter' || e.key === ' ') { 
              e.preventDefault()
              selectByIndex(activeIndex)
            }
          }}
        >
          <ul className="max-h-72 overflow-auto py-1" role="none">
            {items.map((it, idx) => {
              const isSelected = idx === selectedIndex
              const isActive = idx === activeIndex
              
              return (
                <li key={it.value} role="none">
                  <button
                    role="menuitemradio"
                    aria-checked={isSelected}
                    disabled={it.disabled}
                    data-active={isActive || undefined}
                    className={clsx(
                      'relative w-full px-3 py-2 text-left text-sm transition-colors',
                      'focus:outline-none',
                      it.disabled
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : isActive
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-gray-900 dark:text-gray-100'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                    )}
                    onMouseEnter={() => !it.disabled && setActiveIndex(idx)}
                    onClick={() => selectByIndex(idx)}
                  >
                    {/* Indicador de seleção */}
                    {isSelected && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-1 bg-orange-500 dark:bg-orange-400"
                      />
                    )}
                    <span className={clsx(
                      isSelected && 'font-semibold'
                    )}>
                      {it.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
