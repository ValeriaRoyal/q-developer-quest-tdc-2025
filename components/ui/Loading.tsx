import clsx from 'clsx'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function Loading({ size = 'md', text, className }: LoadingProps) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-2', className)}>
      <svg 
        className={clsx('animate-spin text-orange-600 dark:text-orange-400', sizeStyles[size])} 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
        />
      </svg>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-white dark:text-gray-400 dark:text-white">{text}</p>
      )}
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={clsx('animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={clsx(
            'bg-gray-200 dark:bg-gray-700 rounded',
            i === 0 ? 'h-4' : 'h-3 mt-2'
          )}
        />
      ))}
    </div>
  )
}
