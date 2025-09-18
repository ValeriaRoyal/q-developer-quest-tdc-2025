/**
 * Favorites Page - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { FavoritesList } from '@/components/FavoritesList'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFilter } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function FavoritesPage() {
  const breadcrumbItems = [
    { label: 'Favoritos' }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="w-full px-4 py-4 space-y-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="w-6 h-6 text-red-500" />
                Meus Favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Seus carros e packs Hot Wheels favoritos em um só lugar
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                href="/cars"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
              >
                Ver Carros
              </Link>
              <Link 
                href="/packs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
              >
                Ver Packs
              </Link>
            </div>
          </div>

          <FavoritesList />
        </main>
      </div>
    </ErrorBoundary>
  )
}
