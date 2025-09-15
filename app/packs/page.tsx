/**
 * Packs Page - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SearchBar } from '@/components/SearchBar'
import { PacksFilters } from '@/components/PacksFilters'
import { PacksList } from '@/components/PacksList'
import { PackModal } from '@/components/PackModal'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function PacksPage() {
  const [filters, setFilters] = useState({
    q: '',
    serie: '',
    ano: '',
    quantidade: '',
    page: 1
  })
  const [showAddModal, setShowAddModal] = useState(false)

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, q: query, page: 1 }))
  }

  const breadcrumbItems = [
    { label: 'Packs' }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="w-full px-4 py-4 space-y-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Packs Hot Wheels
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize sua coleção em packs temáticos
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                Adicionar Pack
              </button>
            </div>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            placeholder="Buscar packs por nome..."
          />

          <PacksList 
            filters={filters}
            onFiltersChange={setFilters}
          />

          {showAddModal && (
            <PackModal
              onClose={() => setShowAddModal(false)}
              onSuccess={() => setShowAddModal(false)}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
