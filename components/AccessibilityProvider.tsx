/**
 * Accessibility Provider - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer + MCP para melhorias de acessibilidade
 * TDC São Paulo 2025
 */

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void
  focusElement: (elementId: string) => void
  isHighContrast: boolean
  toggleHighContrast: () => void
  fontSize: 'normal' | 'large' | 'extra-large'
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal')

  // Anunciar mensagens para screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Focar elemento específico
  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
      announceToScreenReader(`Focado em ${element.getAttribute('aria-label') || elementId}`)
    }
  }

  // Toggle alto contraste
  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev
      document.documentElement.classList.toggle('high-contrast', newValue)
      announceToScreenReader(newValue ? 'Alto contraste ativado' : 'Alto contraste desativado')
      localStorage.setItem('accessibility-high-contrast', newValue.toString())
      return newValue
    })
  }

  // Aplicar tamanho da fonte
  useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+/g, '')
    document.documentElement.classList.add(`font-size-${fontSize}`)
    localStorage.setItem('accessibility-font-size', fontSize)
  }, [fontSize])

  // Carregar preferências salvas
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true'
    const savedFontSize = localStorage.getItem('accessibility-font-size') as typeof fontSize || 'normal'
    
    if (savedHighContrast) {
      setIsHighContrast(true)
      document.documentElement.classList.add('high-contrast')
    }
    
    setFontSize(savedFontSize)
  }, [])

  // Atalhos de teclado para acessibilidade
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + C = Toggle alto contraste
      if (event.altKey && event.key === 'c') {
        event.preventDefault()
        toggleHighContrast()
      }
      
      // Alt + + = Aumentar fonte
      if (event.altKey && event.key === '+') {
        event.preventDefault()
        if (fontSize === 'normal') setFontSize('large')
        else if (fontSize === 'large') setFontSize('extra-large')
      }
      
      // Alt + - = Diminuir fonte
      if (event.altKey && event.key === '-') {
        event.preventDefault()
        if (fontSize === 'extra-large') setFontSize('large')
        else if (fontSize === 'large') setFontSize('normal')
      }
      
      // Esc = Fechar modais/menus
      if (event.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]')
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="fechar"], [aria-label*="close"]')
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [fontSize])

  const value: AccessibilityContextType = {
    announceToScreenReader,
    focusElement,
    isHighContrast,
    toggleHighContrast,
    fontSize,
    setFontSize
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50">
        <a 
          href="#main-content"
          className="bg-blue-600 text-white p-2 rounded"
          onFocus={() => announceToScreenReader('Link para pular para conteúdo principal')}
        >
          Pular para conteúdo principal
        </a>
        <a 
          href="#navigation"
          className="bg-blue-600 text-white p-2 rounded ml-2"
          onFocus={() => announceToScreenReader('Link para pular para navegação')}
        >
          Pular para navegação
        </a>
      </div>
      
      {/* Live Region para anúncios */}
      <div 
        id="accessibility-announcements"
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
