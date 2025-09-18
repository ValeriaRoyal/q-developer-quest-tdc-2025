'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link 
            href="/" 
            className="text-gray-500 dark:text-gray-400 dark:text-white hover:text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Página inicial"
          >
            <FontAwesomeIcon 
              icon={faHome}
              className="w-4 h-4"
              aria-label="Início"
              role="img"
            />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <FontAwesomeIcon 
              icon={faChevronRight}
              className="w-4 h-4 text-gray-400 dark:text-white mx-2"
              aria-hidden="true"
            />
            
            {item.href ? (
              <Link 
                href={item.href}
                className="text-gray-500 dark:text-gray-400 dark:text-white hover:text-gray-700 dark:text-gray-300 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
