/**
 * Accessibility utilities
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

// Focus management
export class FocusManager {
  private static focusStack: HTMLElement[] = []

  static pushFocus(element: HTMLElement) {
    const currentFocus = document.activeElement as HTMLElement
    if (currentFocus) {
      this.focusStack.push(currentFocus)
    }
    element.focus()
  }

  static popFocus() {
    const previousFocus = this.focusStack.pop()
    if (previousFocus) {
      previousFocus.focus()
    }
  }

  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }
}

// Keyboard navigation
export function handleArrowNavigation(
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) {
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      onIndexChange(nextIndex)
      items[nextIndex]?.focus()
      break

    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      onIndexChange(prevIndex)
      items[prevIndex]?.focus()
      break

    case 'Home':
      event.preventDefault()
      onIndexChange(0)
      items[0]?.focus()
      break

    case 'End':
      event.preventDefault()
      const lastIndex = items.length - 1
      onIndexChange(lastIndex)
      items[lastIndex]?.focus()
      break
  }
}

// Screen reader announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Skip links
export function createSkipLink(targetId: string, text: string) {
  const skipLink = document.createElement('a')
  skipLink.href = `#${targetId}`
  skipLink.textContent = text
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md'
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })

  return skipLink
}

// ARIA helpers
export function generateId(prefix = 'element') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

export function setAriaExpanded(element: HTMLElement, expanded: boolean) {
  element.setAttribute('aria-expanded', expanded.toString())
}

export function setAriaSelected(element: HTMLElement, selected: boolean) {
  element.setAttribute('aria-selected', selected.toString())
}

export function setAriaChecked(element: HTMLElement, checked: boolean | 'mixed') {
  element.setAttribute('aria-checked', checked.toString())
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// High contrast detection
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Color scheme detection
export function getPreferredColorScheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Validate color contrast (simplified)
export function hasGoodContrast(foreground: string, background: string): boolean {
  // Simplified contrast check - in production use a proper contrast library
  const fgLuminance = getLuminance(foreground)
  const bgLuminance = getLuminance(background)
  
  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                   (Math.min(fgLuminance, bgLuminance) + 0.05)
  
  return contrast >= 4.5 // WCAG AA standard
}

function getLuminance(color: string): number {
  // Simplified luminance calculation
  // In production, use a proper color library
  return 0.5 // Placeholder
}
