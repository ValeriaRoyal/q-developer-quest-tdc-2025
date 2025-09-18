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
import { Button } from './ui/Button'
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isSaving, setIsSaving] = useState(false)

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['cars', filters],
    queryFn: async () => {
      console.log('🔍 Buscando carros com filtros:', filters)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString())
      })
      
      console.log('📡 GET /api/cars?' + params.toString())
      const response = await fetch(`/api/cars?${params}`)
      console.log('📡 GET Response:', response.status, response.ok)
      
      if (!response.ok) {
        console.error('❌ GET falhou:', response.status)
        throw new Error('Failed to fetch cars')
      }
      
      const data = await response.json()
      console.log('📦 GET Data:', data)
      return data
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const handleSave = async (carData: any) => {
    console.log('🚀 handleSave iniciado:', carData)
    try {
      if (selectedCar?.id) {
        // Editar carro existente
        console.log('📝 Editando carro existente:', selectedCar.id)
        const response = await fetch(`/api/cars/${selectedCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
        })
        
        console.log('📡 PUT Response:', response.status, response.ok)
        if (response.ok) {
          console.log('✅ PUT sucesso - chamando refetch()')
          refetch()
          setIsModalOpen(false)
          setSelectedCar(null)
        }
      } else {
        // Adicionar novo carro
        console.log('➕ Criando novo carro')
        const response = await fetch('/api/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
        })
        
        console.log('📡 POST Response:', response.status, response.ok)
        const responseData = await response.json()
        console.log('📦 POST Data:', responseData)
        
        if (response.ok) {
          console.log('✅ POST sucesso - chamando refetch()')
          refetch()
          setIsModalOpen(false)
          setSelectedCar(null)
        } else {
          console.error('❌ POST falhou:', responseData)
        }
      }
    } catch (error) {
      console.error('💥 Erro ao salvar:', error)
    }
  }

  const handleEdit = (car: any) => {
    console.log('handleEdit chamado com:', car)
    setSelectedCar(car)
    setIsModalOpen(true)
    console.log('Modal deve abrir agora')
  }

  const handleAdd = () => {
    console.log('🔄 Botão adicionar clicado')
    setSelectedCar(null)
    setIsModalOpen(true)
    console.log('✅ Modal deve abrir - isModalOpen:', true)
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
            <h1 className="title-large mb-4">Erro ao carregar carros</h1>
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
            <button 
              onClick={() => {
                setSelectedCar(null)
                setIsModalOpen(true)
              }}
              className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-black font-bold rounded-lg flex items-center gap-2 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              + Adicionar Carro
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

        {/* Modal para adicionar carro */}
        {isModalOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              style={{
                padding: '30px',
                borderRadius: '10px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                Adicionar Novo Carro
              </h2>
              
              <form onSubmit={async (e) => {
                e.preventDefault()
                setIsSaving(true)
                
                const formData = new FormData(e.target as HTMLFormElement)
                const carData = {
                  nome: formData.get('nome'),
                  serie: formData.get('serie') || 'Hot Wheels',
                  ano: parseInt(formData.get('ano') as string),
                  raridade: formData.get('raridade'),
                  tipo: formData.get('tipo'),
                  observacoes: formData.get('observacoes')
                }
                
                try {
                  const response = await fetch('/api/cars', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carData)
                  })
                  
                  if (response.ok) {
                    await refetch()
                    setIsModalOpen(false)
                    alert('Carro adicionado com sucesso!')
                  } else {
                    alert('Erro ao adicionar carro')
                  }
                } catch (error) {
                  alert('Erro ao adicionar carro')
                } finally {
                  setIsSaving(false)
                }
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Nome do Carro *
                  </label>
                  <input 
                    name="nome"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Lamborghini Huracán"
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Série *
                  </label>
                  <select 
                    name="serie"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Hot Wheels">Hot Wheels</option>
                    <option value="Matchbox">Matchbox</option>
                    <option value="Fast & Furious">Fast & Furious</option>
                    <option value="Car Culture">Car Culture</option>
                    <option value="Premium">Premium</option>
                    <option value="Team Transport">Team Transport</option>
                    <option value="Boulevard">Boulevard</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Ano *
                  </label>
                  <input 
                    name="ano"
                    type="number"
                    required
                    min="1968"
                    max="2025"
                    defaultValue="2024"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Raridade *
                  </label>
                  <select 
                    name="raridade"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="common">Comum</option>
                    <option value="rare">Raro</option>
                    <option value="th">Treasure Hunt</option>
                    <option value="sth">Super Treasure Hunt</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Tipo
                  </label>
                  <select 
                    name="tipo"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="blister">Blister</option>
                    <option value="loose">Loose</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label className="block mb-2 font-bold text-gray-900 dark:text-white">
                    Observações
                  </label>
                  <textarea 
                    name="observacoes"
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
                    placeholder="Observações sobre o carro..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className={`flex-1 p-3 rounded-lg font-bold transition-colors ${
                      isSaving 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    } text-black`}
                  >
                    {isSaving ? 'Salvando...' : 'Adicionar Carro'}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
