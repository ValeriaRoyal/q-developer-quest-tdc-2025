import React, { useId } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Side = 'up' | 'down' | 'left' | 'right'
type Align = 'begin' | 'middle' | 'last'

interface TooltipPosition {
  id: string
  box: string
  arrow: string
}

function getTooltipPosition(side: Side, align: Align, kind: 'icon' | 'info'): TooltipPosition {
  const id = useId()
  const gap = kind === 'icon' ? 8 : 10

  const alignX = {
    begin: 'left-0',
    middle: 'left-1/2 -translate-x-1/2',
    last: 'right-0',
  } as const

  const alignY = {
    begin: 'top-0',
    middle: 'top-1/2 -translate-y-1/2',
    last: 'bottom-0',
  } as const

  let box = ''
  let arrow = ''

  switch (side) {
    case 'up':
      box = `bottom-full mb-2 ${alignX[align]}`
      arrow = 'left-1/2 -translate-x-1/2 -bottom-1'
      break
    case 'down':
      box = `top-full mt-2 ${alignX[align]}`
      arrow = 'left-1/2 -translate-x-1/2 -top-1'
      break
    case 'left':
      box = `right-full mr-2 ${alignY[align]}`
      arrow = 'right-[-4px] top-1/2 -translate-y-1/2'
      break
    case 'right':
    default:
      box = `left-full ml-2 ${alignY[align]}`
      arrow = 'left-[-4px] top-1/2 -translate-y-1/2'
  }

  return { id, box, arrow }
}

interface IconTooltipProps {
  label: string
  icon?: IconDefinition
  side?: Side
  align?: Align
  className?: string
}

export function IconTooltip({
  label,
  icon = faCircleInfo,
  side = 'right',
  align = 'middle',
  className = '',
}: IconTooltipProps) {
  const pos = getTooltipPosition(side, align, 'icon')

  return (
    <span className={clsx('relative inline-flex group', className)}>
      {/* Trigger */}
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded transition-colors"
        aria-describedby={pos.id}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </button>

      {/* Tooltip */}
      <span
        id={pos.id}
        role="tooltip"
        className={clsx(
          'pointer-events-none absolute z-50 max-w-[136px] rounded-md bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs leading-snug text-white shadow-lg',
          'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100',
          'transition-all duration-200 ease-out',
          pos.box
        )}
      >
        {label}
        {/* Arrow */}
        <span 
          className={clsx(
            'absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700',
            pos.arrow
          )} 
          aria-hidden="true" 
        />
      </span>
    </span>
  )
}

interface InfoTooltipProps {
  text: React.ReactNode
  icon?: IconDefinition
  side?: Side
  align?: Align
  className?: string
}

export function InfoTooltip({
  text,
  icon = faCircleInfo,
  side = 'up',
  align = 'middle',
  className = '',
}: InfoTooltipProps) {
  const pos = getTooltipPosition(side, align, 'info')

  return (
    <span className={clsx('relative inline-flex items-center gap-2 group', className)}>
      {/* Icon anchor */}
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded transition-colors"
        aria-describedby={pos.id}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </button>

      {/* Tooltip balloon */}
      <div
        id={pos.id}
        role="tooltip"
        className={clsx(
          'pointer-events-none absolute z-50 max-w-[212px] md:max-w-[304px] rounded-xl bg-orange-600 dark:bg-orange-700 px-4 py-3 text-sm leading-relaxed text-white shadow-lg',
          'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100',
          'transition-all duration-200 ease-out',
          pos.box
        )}
      >
        {text}
        <span 
          className={clsx(
            'absolute h-3 w-3 rotate-45 bg-orange-600 dark:bg-orange-700',
            pos.arrow
          )} 
          aria-hidden="true" 
        />
      </div>
    </span>
  )
}

// Alias para compatibilidade
export const Tooltip = IconTooltip
