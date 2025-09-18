import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCar, faBox, faHeart, faList } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Density = 'compact' | 'comfortable'
type EmptyStateIcon = 'image' | 'car' | 'pack' | 'heart' | 'list' | 'custom'

interface EmptyStateProps {
  title: string
  description?: string
  label?: string
  actionLabel?: string
  onActionClick?: () => void
  linkLabel?: string
  onLinkClick?: () => void
  imageSrc?: string
  imageAlt?: string
  icon?: EmptyStateIcon
  customIcon?: any
  density?: Density
  className?: string
}

const iconMap = {
  image: faImage,
  car: faCar,
  pack: faBox,
  heart: faHeart,
  list: faList,
}

export function EmptyState({
  title,
  description,
  label,
  actionLabel,
  onActionClick,
  linkLabel,
  onLinkClick,
  imageSrc,
  imageAlt = '',
  icon = 'image',
  customIcon,
  density = 'compact',
  className = '',
}: EmptyStateProps) {
  const iconToUse = customIcon || (icon !== 'custom' ? iconMap[icon] : faImage) || faImage

  return (
    <div className={clsx(
      'w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
      density === 'compact' ? 'p-6' : 'p-10',
      className
    )}>
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Imagem/ícone */}
        <div className="mb-4">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-24 w-24 object-contain"
              loading="lazy"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50">
              <FontAwesomeIcon 
                icon={iconToUse} 
                className="h-10 w-10 text-gray-400 dark:text-white" 
                aria-hidden="true" 
              />
              <span className="sr-only">ilustração</span>
            </div>
          )}
        </div>

        {/* Título + descrição */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className={clsx(
            'mt-2 text-gray-700 dark:text-gray-300 leading-relaxed',
            density === 'compact' ? 'text-sm' : 'text-base'
          )}>
            {description}
          </p>
        )}

        {/* Label (pill) */}
        {label && (
          <span className="mt-3 inline-block rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2.5 py-0.5 text-xs text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
