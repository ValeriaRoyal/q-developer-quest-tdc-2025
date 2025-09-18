import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

interface PaginationProps {
  totalItems: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
  showPageSelect?: boolean
  className?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function Separator() {
  return <span aria-hidden className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-600" />
}

export function Pagination({
  totalItems,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  showPageSelect = true,
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / Math.max(1, pageSize)))
  const current = clamp(page, 1, totalPages)

  const { from, to } = useMemo(() => {
    if (totalItems === 0) return { from: 0, to: 0 }
    const start = (current - 1) * pageSize + 1
    const end = Math.min(totalItems, start + pageSize - 1)
    return { from: start, to: end }
  }, [current, pageSize, totalItems])

  const prevDisabled = current <= 1 || totalItems === 0
  const nextDisabled = current >= totalPages || totalItems === 0

  return (
    <nav
      className={clsx(
        'flex flex-wrap items-center gap-3 text-gray-800 dark:text-gray-200',
        className
      )}
      aria-label="Paginação de tabela"
    >
      {/* Itens por página */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Itens por página:</span>
        <label className="sr-only" htmlFor="pg-size">
          Itens por página
        </label>
        <select
          id="pg-size"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-orange-600 dark:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <Separator />

      {/* Resumo */}
      <p className="text-sm font-medium" aria-live="polite">
        {from}-{to} de {totalItems} itens
      </p>

      <Separator />

      {/* Seleção de página */}
      {showPageSelect && totalPages > 1 && (
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="pg-current">
            Página atual
          </label>
          <select
            id="pg-current"
            value={current}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-orange-600 dark:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium">de {totalPages} páginas</span>
        </div>
      )}

      {/* Controles Anterior / Próxima */}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          className={clsx(
            'rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40',
            prevDisabled
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
          )}
          aria-label="Página anterior"
          onClick={() => onPageChange(clamp(current - 1, 1, totalPages))}
          disabled={prevDisabled}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
        </button>
        
        <button
          type="button"
          className={clsx(
            'rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40',
            nextDisabled
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
          )}
          aria-label="Próxima página"
          onClick={() => onPageChange(clamp(current + 1, 1, totalPages))}
          disabled={nextDisabled}
        >
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
