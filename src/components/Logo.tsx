interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'white' | 'auto'
  className?: string
}

export function Logo({ size = 'medium', variant = 'auto', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  // Auto variant switches based on theme
  const getLogoSrc = () => {
    if (variant === 'white') return '/logo-white.svg'
    if (variant === 'default') return '/logo.svg'
    // Auto variant - use white logo in dark mode
    return '/logo.svg' // Default for now, could be enhanced with theme detection
  }

  return (
    <img
      src={getLogoSrc()}
      alt="Hot Wheels Logo"
      className={`${sizeClasses[size]} ${className} ${variant === 'auto' ? 'dark:brightness-0 dark:invert' : ''}`}
      width={size === 'large' ? 64 : size === 'medium' ? 40 : 32}
      height={size === 'large' ? 64 : size === 'medium' ? 40 : 32}
    />
  )
}
