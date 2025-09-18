/**
 * Lists Page - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ListsManager } from '@/components/ListsManager'
import { ListModal } from '@/components/ListModal'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ListsPage() {
  const [showModal, setShowModal] = useState(false)

  const breadcrumbItems = [
    { label: 'Listas' }
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
                <FontAwesomeIcon icon={faList} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Minhas Listas
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize sua coleção em listas personalizadas
              </p>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              Nova Lista
            </button>
          </div>

          <ListsManager />

          {showModal && (
            <ListModal
              onClose={() => setShowModal(false)}
              onSuccess={() => setShowModal(false)}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
