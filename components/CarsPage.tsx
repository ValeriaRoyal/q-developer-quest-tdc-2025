'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from './Header'
import { CarsFilters } from './CarsFilters'
import { CarsList } from './CarsList'
import { CarModal } from './CarModal'
import { SearchBar } from './SearchBar'
import { Breadcrumb } from './Breadcrumb'
import { Icon } from './Icon'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { ErrorBoundary } from './ErrorBoundary'

export function CarsPage() {
  const [filters, setFilters] = useState({
    q: '',
    serie: '',
    ano: '',
    raridade: '',
    tipo: '',
    page: 1,
    pageSize: 20,
  })
  
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['cars', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString())
      })
      
      const response = await fetch(`/api/cars?${params}`)
      if (!response.ok) throw new Error('Failed to fetch cars')
      return response.json()
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const handleSave = async (carData: any) => {
    try {
      if (selectedCar?.id) {
        // Editar carro existente
        const response = await fetch(`/api/cars/${selectedCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
        })
        
        if (response.ok) {
          refetch()
          setIsModalOpen(false)
          setSelectedCar(null)
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const handleEdit = (car: any) => {
    console.log('handleEdit chamado com:', car)
    setSelectedCar(car)
    setIsModalOpen(true)
    console.log('Modal deve abrir agora')
  }

  const handleAdd = () => {
    setSelectedCar(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCar(null)
    refetch()
  }

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, q: query, page: 1 }))
  }

  const breadcrumbItems = [
    { label: 'Carros' }
  ]

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="px-4 py-4">
          <div className="md-card text-center py-12">
            <Icon 
              name="triangleExclamation"
              size="lg"
              className="mx-auto mb-4 text-red-600 dark:text-red-400"
              aria-label="Erro"
            />
            <h2 className="title-large mb-4">Erro ao carregar carros</h2>
            <p className="body-medium mb-6" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              Não foi possível carregar a lista de carros. Tente novamente.
            </p>
            <button onClick={() => refetch()} className="md-filled-button">
              Tentar novamente
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="w-full px-4 py-4 space-y-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Meus Carros</h1>
            <p className="page-subtitle">
              {isLoading ? 'Carregando...' : 'Sua coleção de Hot Wheels'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={handleAdd} className="md-filled-button flex items-center">
              <Icon 
                name="plus"
                size="sm"
                className="mr-2"
                decorative={true}
              />
              Adicionar
            </button>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
          placeholder="Buscar por nome, série, ano..."
          value={filters.q}
        />

        {/* Filters toggle */}
        {showFilters && (
          <div id="filters-panel">
            <CarsFilters 
              filters={filters} 
              onFiltersChange={setFilters}
            />
          </div>
        )}
        
        {isLoading ? (
          <div className="md-card py-12">
            <LoadingSpinner size="lg" text="Carregando carros..." />
          </div>
        ) : (
          <CarsList 
            cars={data?.data || []}
            loading={false}
            pagination={data?.pagination}
            onPageChange={(page) => setFilters(prev => ({ ...prev, page }))}
            onEdit={handleEdit}
            onRefetch={refetch}
            viewMode={viewMode}
          />
        )}

        {isModalOpen && (
          <CarModal
            car={selectedCar}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  )
}
