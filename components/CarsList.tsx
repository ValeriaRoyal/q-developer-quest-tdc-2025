'use client'

import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface CarsListProps {
  cars: any[]
  loading: boolean
  pagination: any
  onPageChange: (page: number) => void
  onEdit: (car: any) => void
  onRefetch: () => void
  viewMode?: 'grid' | 'list'
}

export function CarsList({ 
  cars, 
  loading, 
  pagination, 
  onPageChange, 
  onEdit, 
  onRefetch,
  viewMode = 'list'
}: CarsListProps) {
  const deleteMutation = useMutation({
    mutationFn: async (carId: string) => {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete car')
      return response.json()
    },
    onSuccess: () => {
      toast.success('Carro removido!')
      onRefetch()
    },
    onError: () => {
      toast.error('Erro ao remover')
    },
  })

  const handleDelete = async (car: any) => {
    if (confirm(`Remover "${car.nome}"?`)) {
      deleteMutation.mutate(car.id)
    }
  }

  const getRarityClass = (raridade: string) => {
    switch (raridade) {
      case 'Super Treasure Hunt':
        return 'hw-rarity-sth'
      case 'Treasure Hunt':
        return 'hw-rarity-th'
      case 'Raro':
        return 'hw-rarity-rare'
      default:
        return 'hw-rarity-common'
    }
  }

  const getRarityLabel = (raridade: string) => {
    switch (raridade) {
      case 'Super Treasure Hunt':
        return 'STH'
      case 'Treasure Hunt':
        return 'TH'
      default:
        return raridade
    }
  }

  if (loading) {
    const skeletonClass = viewMode === 'grid' 
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      : 'space-y-3'
    
    return (
      <div className={skeletonClass}>
        {[...Array(viewMode === 'grid' ? 6 : 5)].map((_, i) => (
          <div key={i} className="md-card animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="md-card text-center py-12">
        <div className="text-4xl mb-4">🚗</div>
        <h3 className="title-large mb-2">
          Nenhum carro encontrado
        </h3>
        <p className="body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          Ajuste os filtros ou adicione seu primeiro carro
        </p>
      </div>
    )
  }

  const containerClass = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
    : 'space-y-3'

  return (
    <div className="space-y-4">
      <div className={containerClass}>
        {cars.map((car) => (
          <article key={car.id} className="md-card">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="title-medium truncate mb-1">
                  {car.nome}
                </h3>
                <p className="body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {car.serie} • {car.ano}
                </p>
              </div>
              <span className={`md-chip ${getRarityClass(car.raridade)} ml-2`}>
                {getRarityLabel(car.raridade)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {car.cor && (
                <div className="flex items-center body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  <span 
                    className="w-3 h-3 rounded-full mr-2 border" 
                    style={{ 
                      backgroundColor: car.cor,
                      borderColor: 'var(--md-sys-color-outline)'
                    }}
                    aria-label={`Cor: ${car.cor}`}
                  ></span>
                  {car.cor}
                </div>
              )}
              <div className="body-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Tipo: {car.tipo === 'blister' ? 'Blister' : 'Loose'}
              </div>
              {car.observacoes && (
                <div className="body-medium truncate" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {car.observacoes}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  console.log('Botão editar clicado!', car)
                  onEdit(car)
                }}
                className="md-outlined-button flex-1"
                aria-label={`Editar ${car.nome}`}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(car)}
                disabled={deleteMutation.isPending}
                className="md-text-button"
                style={{ color: 'var(--md-sys-color-error)' }}
                aria-label={`Excluir ${car.nome}`}
              >
                {deleteMutation.isPending ? '...' : 'Excluir'}
              </button>
            </div>
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <nav className="md-card" aria-label="Navegação de páginas">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="md-outlined-button disabled:opacity-50"
              aria-label="Página anterior"
            >
              ← Anterior
            </button>
            
            <div className="text-center">
              <div className="label-large">
                Página {pagination.page} de {pagination.totalPages}
              </div>
              <div className="label-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                {pagination.total} carros no total
              </div>
            </div>
            
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="md-outlined-button disabled:opacity-50"
              aria-label="Próxima página"
            >
              Próxima →
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}
