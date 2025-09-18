import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  name: string
  src?: string | null
  size?: Size
  rounded?: boolean
  useIconFallback?: boolean
  className?: string
}

function getInitials(fullname: string) {
  const parts = fullname.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({
  name,
  src,
  size = 'md',
  rounded = true,
  useIconFallback = false,
  className = '',
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-14 w-14 text-xl',
    xl: 'h-20 w-20 text-2xl'
  }

  // Paleta de cores Hot Wheels
  const palettes = [
    'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  ]

  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  const color = palettes[hash % palettes.length]
  const initials = getInitials(name)

  return (
    <span 
      className={clsx(
        'relative inline-flex items-center justify-center overflow-hidden font-semibold',
        sizes[size],
        rounded ? 'rounded-full' : 'rounded-md',
        color,
        className
      )}
    >
      {src && (
        <img
          src={src}
          alt={`Foto de ${name}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}

      {/* Fallback layer */}
      {!src && (
        <span className="flex items-center justify-center h-full w-full">
          {useIconFallback && !initials ? (
            <FontAwesomeIcon 
              icon={faUser} 
              className="h-[60%] w-[60%]" 
              aria-hidden="true"
            />
          ) : (
            <span>{initials}</span>
          )}
        </span>
      )}
    </span>
  )
}
