import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faArrowsUpDown,
  faChevronRight,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Dir = 'asc' | 'desc' | null

type ColumnVariant =
  | 'text'
  | 'sortable'
  | 'checkbox'
  | 'contextual'
  | 'link'
  | 'icon'
  | 'input'

export interface Column {
  key: string
  header: string
  variant?: ColumnVariant
  width?: string
  icon?: IconDefinition
  hrefKey?: string
  placeholder?: string
  className?: string
}

type Row = Record<string, any> & { id: string }

interface DataTableProps {
  columns: Column[]
  rows: Row[]
  initialSort?: { key: string; dir: Exclude<Dir, null> } | null
  onSortChange?: (key: string, dir: Exclude<Dir, null>) => void
  onSelectionChange?: (selectedIds: string[]) => void
  onContextClick?: (row: Row) => void
  onIconClick?: (row: Row) => void
  onInputChange?: (row: Row, key: string, value: string) => void
  className?: string
}

export function DataTable({
  columns,
  rows,
  initialSort = null,
  onSortChange,
  onSelectionChange,
  onContextClick,
  onIconClick,
  onInputChange,
  className = '',
}: DataTableProps) {
  const [sort, setSort] = useState<{ key: string; dir: Exclude<Dir, null> } | null>(initialSort)
  const [selected, setSelected] = useState<string[]>([])

  const checkboxCol = columns.some(c => c.variant === 'checkbox')
  const enabledIds = rows.map(r => r.id)
  const allChecked = checkboxCol && enabledIds.length > 0 && enabledIds.every(id => selected.includes(id))
  const someChecked = checkboxCol && enabledIds.some(id => selected.includes(id)) && !allChecked

  const sortedRows = useMemo(() => {
    if (!sort) return rows
    const col = columns.find(c => c.key === sort.key)
    if (!col) return rows
    
    return [...rows].sort((a, b) => {
      const av = a[col.key]
      const bv = b[col.key]
      if (av == null && bv == null) return 0
      if (av == null) return -1
      if (bv == null) return 1
      
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av
      }
      
      return sort.dir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
  }, [rows, columns, sort])

  const toggleSort = (key: string) => {
    setSort(prev => {
      const next: { key: string; dir: Exclude<Dir, null> } =
        !prev || prev.key !== key
          ? { key, dir: 'asc' }
          : { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      onSortChange?.(next.key, next.dir)
      return next
    })
  }

  const toggleAll = () => {
    if (!checkboxCol) return
    const next = allChecked ? [] : enabledIds
    setSelected(next)
    onSelectionChange?.(next)
  }

  const toggleOne = (id: string, checked: boolean) => {
    const next = checked ? [...new Set([...selected, id])] : selected.filter(x => x !== id)
    setSelected(next)
    onSelectionChange?.(next)
  }

  return (
    <div className={clsx(
      'w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
      className
    )}>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            {columns.map((col) => {
              const isSortable = col.variant === 'sortable'
              const isCheckbox = col.variant === 'checkbox'
              const isActive = sort?.key === col.key
              const ariaSort = isSortable 
                ? (isActive ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : 'none') 
                : undefined

              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort as any}
                  className={clsx(
                    'px-3 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100',
                    col.width
                  )}
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="group inline-flex items-center gap-1 select-none focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded transition-colors"
                    >
                      <span className={isActive ? 'font-semibold' : ''}>
                        {col.header}
                      </span>
                      {!isActive && (
                        <>
                          <FontAwesomeIcon
                            icon={faArrowsUpDown}
                            className="h-3.5 w-3.5 opacity-60 group-hover:hidden"
                            aria-hidden="true"
                          />
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            className="h-3.5 w-3.5 hidden group-hover:inline text-gray-400 dark:text-gray-500"
                            aria-hidden="true"
                          />
                        </>
                      )}
                      {isActive && (
                        <FontAwesomeIcon
                          icon={sort!.dir === 'asc' ? faArrowUp : faArrowDown}
                          className="h-3.5 w-3.5 text-orange-500"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ) : isCheckbox ? (
                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500 dark:bg-gray-700"
                        checked={allChecked}
                        ref={(el) => {
                          if (el) el.indeterminate = someChecked
                        }}
                        onChange={toggleAll}
                        aria-label="Selecionar tudo"
                      />
                      <span>{col.header}</span>
                    </label>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedRows.map((row, idx) => (
            <tr
              key={row.id}
              className={clsx(
                'hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                idx % 2 === 1 && 'bg-gray-25 dark:bg-gray-800/50'
              )}
            >
              {columns.map((col) => {
                const baseTd = clsx(
                  'px-3 py-3 text-sm text-gray-900 dark:text-gray-100',
                  col.className
                )

                switch (col.variant) {
                  case 'checkbox':
                    return (
                      <td key={col.key} className={baseTd}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500 dark:bg-gray-700"
                          checked={selected.includes(row.id)}
                          onChange={(e) => toggleOne(row.id, e.target.checked)}
                          aria-label={`Selecionar linha ${row.id}`}
                        />
                      </td>
                    )

                  case 'contextual':
                    return (
                      <td key={col.key} className={baseTd}>
                        <button
                          type="button"
                          onClick={() => onContextClick?.(row)}
                          className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded transition-colors"
                        >
                          {String(row[col.key])}
                          <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </td>
                    )

                  case 'link':
                    return (
                      <td key={col.key} className={baseTd}>
                        <a
                          href={row[col.hrefKey ?? 'href'] ?? '#'}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded transition-colors"
                        >
                          {String(row[col.key])}
                        </a>
                      </td>
                    )

                  case 'icon':
                    return (
                      <td key={col.key} className={baseTd}>
                        <button
                          type="button"
                          onClick={() => onIconClick?.(row)}
                          className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded p-1 transition-colors"
                          aria-label="Ação do ícone"
                          title="Ação"
                        >
                          <FontAwesomeIcon icon={col.icon ?? faLightbulb} className="h-4 w-4" />
                        </button>
                      </td>
                    )

                  case 'input':
                    return (
                      <td key={col.key} className={baseTd}>
                        <input
                          type="text"
                          defaultValue={row[col.key] ?? ''}
                          placeholder={col.placeholder}
                          onBlur={(e) => onInputChange?.(row, col.key, e.target.value)}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors"
                        />
                      </td>
                    )

                  case 'sortable':
                  case 'text':
                  default:
                    return (
                      <td key={col.key} className={baseTd}>
                        {String(row[col.key] ?? '')}
                      </td>
                    )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Nenhum dado encontrado</p>
        </div>
      )}
    </div>
  )
}
