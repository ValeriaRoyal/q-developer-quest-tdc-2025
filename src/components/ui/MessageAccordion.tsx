import React, { useId, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faRotateRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Density = 'compact' | 'comfortable'

interface MessageAccordionProps {
  title: string
  description?: string
  defaultOpen?: boolean
  ctaLabel?: string
  onCtaClick?: () => void
  linkLabel?: string
  onLinkClick?: () => void
  density?: Density
  disabled?: boolean
  className?: string
}

export function MessageAccordion({
  title,
  description,
  defaultOpen = true,
  ctaLabel,
  onCtaClick,
  linkLabel,
  onLinkClick,
  density = 'compact',
  disabled = false,
  className = '',
}: MessageAccordionProps) {
  const uid = useId()
  const regionId = `acc-region-${uid}`
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section 
      aria-labelledby={`acc-title-${uid}`} 
      className={clsx(
        'w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm',
        !disabled && 'hover:shadow-md',
        disabled && 'opacity-60',
        className
      )}
    >
      {/* Header */}
      <div className={clsx(
        'flex items-start justify-between gap-4',
        density === 'compact' ? 'p-4 text-sm' : 'p-6 text-base'
      )}>
        <div className="min-w-0">
          <h3 id={`acc-title-${uid}`} className="font-medium text-gray-900 dark:text-gray-100 leading-tight">
            {title}
          </h3>
        </div>

        <button
          type="button"
          className="shrink-0 inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded"
          aria-controls={regionId}
          aria-expanded={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
        >
          {open ? 'ocultar' : 'mostrar'}
          <FontAwesomeIcon 
            icon={open ? faChevronUp : faChevronDown} 
            className="h-4 w-4" 
            aria-hidden="true" 
          />
        </button>
      </div>

      {/* Body */}
      <div
        id={regionId}
        role="region"
        aria-hidden={!open}
        className={clsx(
          open ? 'block' : 'hidden',
          'border-t border-gray-200 dark:border-gray-700'
        )}
      >
        <div className={clsx(
          'pt-4',
          density === 'compact' ? 'p-4 text-sm' : 'p-6 text-base'
        )}>
          {description && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {ctaLabel && (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" aria-hidden="true" />
                {ctaLabel}
              </button>
            )}
            {linkLabel && (
              <button
                type="button"
                onClick={onLinkClick}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded"
                disabled={disabled}
              >
                {linkLabel}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
