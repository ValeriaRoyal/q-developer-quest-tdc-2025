import React from 'react'
import NextLink from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

type Variant = 'default' | 'dark' | 'light' | 'orange'
type Underline = 'always' | 'hover' | 'none'

interface LinkProps {
  href?: string
  children: React.ReactNode
  variant?: Variant
  underline?: Underline
  external?: boolean
  disabled?: boolean
  leftIcon?: IconDefinition
  rightIcon?: IconDefinition
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export function Link({
  href = '#',
  children,
  variant = 'default',
  underline = 'always',
  external = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
}: LinkProps) {
  const variants = {
    default: 'text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 active:text-blue-900 dark:active:text-blue-200 focus-visible:ring-blue-500/40',
    dark: 'text-blue-300 hover:text-blue-200 active:text-blue-100 focus-visible:ring-blue-300/40',
    light: 'text-blue-800 hover:text-blue-900 active:text-blue-950 focus-visible:ring-blue-600/40',
    orange: 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 active:text-orange-800 dark:active:text-orange-200 focus-visible:ring-orange-500/40'
  }

  const underlineStyles = {
    always: 'underline underline-offset-2',
    hover: 'no-underline hover:underline underline-offset-2',
    none: 'no-underline'
  }

  const rel = external ? 'noopener noreferrer' : undefined
  const target = external ? '_blank' : undefined

  const content = (
    <>
      {leftIcon && (
        <FontAwesomeIcon 
          icon={leftIcon} 
          className="h-3.5 w-3.5" 
          aria-hidden="true" 
        />
      )}
      <span>{children}</span>
      {rightIcon && (
        <FontAwesomeIcon 
          icon={rightIcon} 
          className="h-3.5 w-3.5" 
          aria-hidden="true" 
        />
      )}
      {external && !rightIcon && (
        <FontAwesomeIcon 
          icon={faArrowUpRightFromSquare} 
          className="h-3.5 w-3.5" 
          aria-hidden="true" 
        />
      )}
    </>
  )

  const linkClasses = clsx(
    'inline-flex items-center gap-1 transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded',
    disabled
      ? 'pointer-events-none text-gray-400 dark:text-gray-600 no-underline cursor-not-allowed'
      : [variants[variant], underlineStyles[underline]],
    className
  )

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  // Use Next.js Link for internal links, regular anchor for external
  if (external || disabled || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={disabled ? undefined : href}
        rel={rel}
        target={target}
        aria-disabled={disabled}
        className={linkClasses}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }

  // Internal Next.js link
  return (
    <NextLink
      href={href}
      className={linkClasses}
      onClick={handleClick}
    >
      {content}
    </NextLink>
  )
}
