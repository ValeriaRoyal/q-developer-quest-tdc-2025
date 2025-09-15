import { ReactNode } from 'react'
import clsx from 'clsx'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  return (
    <span className={clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  )
}

// Badge específico para raridade de Hot Wheels
interface RarityBadgeProps {
  rarity: 'common' | 'rare' | 'th' | 'sth'
  size?: BadgeSize
}

export function RarityBadge({ rarity, size = 'md' }: RarityBadgeProps) {
  const rarityConfig = {
    common: { label: 'Comum', variant: 'default' as BadgeVariant },
    rare: { label: 'Raro', variant: 'info' as BadgeVariant },
    th: { label: 'TH', variant: 'warning' as BadgeVariant },
    sth: { label: 'STH', variant: 'danger' as BadgeVariant }
  }

  const config = rarityConfig[rarity]

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}
