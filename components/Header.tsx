/**
 * Header Component - Hot Wheels Catalog
 * 
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 * - Navegação responsiva com menu mobile
 * - Dropdown de usuário com Font Awesome icons
 * - Layout otimizado para 1920px de largura
 * - Animações suaves com Tailwind CSS
 */

'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './Logo'
import { Icon } from './Icon'
import { useTheme } from '../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faChevronDown, 
  faMoon, 
  faSun,
  faSignOutAlt,
  faBars,
  faCar,
  faBox,
  faList,
  faHeart,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

export function Header() {
  const { data: session } = useSession()
  const { resolvedTheme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Sessão temporária para desenvolvimento
  const devSession = session || {
    user: {
      name: 'Desenvolvedor',
      email: 'dev@hotwheels.com'
    }
  }

  return (
    <header 
      className="sticky top-0 z-40 border-b border-blue-200 dark:border-gray-700"
      style={{ 
        backgroundColor: '#0057b8'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo fixo à esquerda */}
          <Link href="/" className="flex items-center flex-shrink-0" style={{ textDecoration: 'none' }}>
            <Logo size="medium" variant="white" />
          </Link>
          
          {/* Espaçador flexível */}
          <div className="flex-1"></div>
          
          {/* Conteúdo à direita */}
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-blue-200 p-2"
              aria-label="Menu de navegação"
            >
              <Icon name="menu" size="md" decorative={true} />
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-2">
              <Link href="/cars" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                  <Icon name="car" size="sm" decorative={true} />
                  Carros
                </button>
              </Link>
              <Link href="/packs" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">Packs</button>
              </Link>
              <Link href="/lists" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">Listas</button>
              </Link>
              <Link href="/favorites" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">Favoritos</button>
              </Link>
            </nav>

            {/* User menu */}
            {devSession ? (
              <div className="flex items-center space-x-4">
                
                {/* User dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 bg-opacity-20 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-sm" />
                    </div>
                    <span>{devSession.user?.name || 'Usuário'}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>

                  {/* Dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                      
                      <button 
                        onClick={toggleTheme}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        aria-label={`Alternar para modo ${resolvedTheme === 'dark' ? 'claro' : 'escuro'}`}
                        role="switch"
                        aria-checked={resolvedTheme === 'dark'}
                      >
                        <FontAwesomeIcon 
                          icon={resolvedTheme === 'dark' ? faSun : faMoon} 
                          className="w-4 h-4" 
                          aria-hidden="true"
                        />
                        <span>{resolvedTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
                        <div className="ml-auto" aria-hidden="true">
                          <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${resolvedTheme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${resolvedTheme === 'dark' ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Exit icon */}
                <button 
                  className="text-white hover:text-red-300 p-2 rounded-md transition-colors"
                  title="Sair"
                  aria-label="Sair do sistema"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/auth/dev-signin" style={{ textDecoration: 'none' }}>
                <button className="bg-[#FF6600] hover:bg-[#E55A00] text-white px-4 py-2 rounded-md text-sm font-medium">
                  Entrar
                </button>
              </Link>
            )}
            </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-200 dark:border-gray-700 bg-[#0057b8] animate-slide-down">
            <div className="px-2 pt-2 pb-3">
              <Link href="/cars" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2">
                  <Icon name="car" size="sm" decorative={true} />
                  Carros
                </button>
              </Link>
              <Link href="/packs" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2">
                  <Icon name="package" size="sm" decorative={true} />
                  Packs
                </button>
              </Link>
              <Link href="/lists" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2">
                  <Icon name="list" size="sm" decorative={true} />
                  Listas
                </button>
              </Link>
              <Link href="/favorites" style={{ textDecoration: 'none' }}>
                <button className="text-white hover:text-blue-200 block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2">
                  <Icon name="heart" size="sm" decorative={true} />
                  Favoritos
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
