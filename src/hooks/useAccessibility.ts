'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FocusManager, announceToScreenReader, generateId } from '@/lib/accessibility'

// Hook para focus management
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement>(null)

  const pushFocus = () => {
    if (focusRef.current) {
      FocusManager.pushFocus(focusRef.current)
    }
  }

  const popFocus = () => {
    FocusManager.popFocus()
  }

  const trapFocus = () => {
    if (focusRef.current) {
      return FocusManager.trapFocus(focusRef.current)
    }
  }

  return { focusRef, pushFocus, popFocus, trapFocus }
}

// Hook para keyboard navigation
export function useKeyboardNavigation(items: HTMLElement[], initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        setCurrentIndex(nextIndex)
        items[nextIndex]?.focus()
        break

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        setCurrentIndex(prevIndex)
        items[prevIndex]?.focus()
        break

      case 'Home':
        event.preventDefault()
        setCurrentIndex(0)
        items[0]?.focus()
        break

      case 'End':
        event.preventDefault()
        const lastIndex = items.length - 1
        setCurrentIndex(lastIndex)
        items[lastIndex]?.focus()
        break
    }
  }

  return { currentIndex, setCurrentIndex, handleKeyDown }
}

// Hook para screen reader announcements
export function useScreenReader() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority)
  }

  return { announce }
}

// Hook para IDs únicos
export function useId(prefix?: string) {
  const [id] = useState(() => generateId(prefix))
  return id
}

// Hook para detectar preferências do usuário
export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    colorScheme: 'light' as 'light' | 'dark'
  })

  useEffect(() => {
    const updatePreferences = () => {
      setPreferences({
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      })
    }

    updatePreferences()

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)')
    ]

    mediaQueries.forEach(mq => mq.addEventListener('change', updatePreferences))

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', updatePreferences))
    }
  }, [])

  return preferences
}

// Hook para modal accessibility
export function useModalAccessibility(isOpen: boolean) {
  const modalRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement

      // Trap focus in modal
      if (modalRef.current) {
        const cleanup = FocusManager.trapFocus(modalRef.current)
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden'

        return () => {
          cleanup()
          document.body.style.overflow = ''
          
          // Restore focus
          if (previousFocusRef.current) {
            previousFocusRef.current.focus()
          }
        }
      }
    }
  }, [isOpen])

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      // Modal should handle close
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return { modalRef }
}

// Hook para live regions
export function useLiveRegion() {
  const liveRegionRef = useRef<HTMLDivElement>(null)

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority)
      liveRegionRef.current.textContent = message
      
      // Clear after announcement
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = ''
        }
      }, 1000)
    }
  }

  const LiveRegion = () => (
    React.createElement('div', {
      ref: liveRegionRef,
      'aria-live': 'polite',
      'aria-atomic': 'true',
      className: 'sr-only'
    })
  )

  return { announce, LiveRegion }
}
