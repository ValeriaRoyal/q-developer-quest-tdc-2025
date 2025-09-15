import React from 'react'
import { Avatar } from './Avatar'
import clsx from 'clsx'

interface AvatarItemProps {
  name: string
  src?: string | null
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  divider?: boolean
  onClick?: () => void
  className?: string
}

export function AvatarItem({ 
  name, 
  src, 
  subtitle,
  size = 'md', 
  divider = false,
  onClick,
  className = '' 
}: AvatarItemProps) {
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      className={clsx(
        'flex items-center gap-3 py-3 w-full text-left',
        onClick && 'hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded-md px-2 -mx-2 transition-colors',
        'relative',
        className
      )}
      onClick={onClick}
    >
      <Avatar name={name} src={src} size={size} />
      
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-medium text-gray-900 dark:text-gray-100">
          {name}
        </div>
        {subtitle && (
          <div className="truncate text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </div>
        )}
      </div>
      
      {divider && (
        <div 
          className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 dark:bg-gray-700" 
          aria-hidden="true" 
        />
      )}
    </Component>
  )
}
