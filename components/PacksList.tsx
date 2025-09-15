import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PackCard, LoadingSpinner, EmptyState, Pagination } from './ui'
import { PackModal } from './PackModal'
import toast from 'react-hot-toast'

interface Pack {
  id: string
  nome: string
  serie: string
  ano: number
  quantidade: number
  observacoes?: string
  createdAt: string
}

interface PacksListProps {
  filters: {
    q: string
    serie: string
    ano: string
    quantidade: string
    page: number
  }
  onFiltersChange: (filters: any) => void
}

async function fetchPacks(filters: any) {
  const params = new URLSearchParams()
  if (filters.q) params.append('q', filters.q)
  if (filters.serie) params.append('serie', filters.serie)
  if (filters.ano) params.append('ano', filters.ano)
  if (filters.quantidade) params.append('quantidade', filters.quantidade)
  params.append('page', filters.page.toString())
  params.append('pageSize', '20')

  const response = await fetch(`/api/packs?${params}`)
  if (!response.ok) throw new Error('Failed to fetch packs')
  return response.json()
}

async function deletePack(id: string) {
  const response = await fetch(`/api/packs/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete pack')
  return response.json()
}

export function PacksList({ filters, onFiltersChange }: PacksListProps) {
  const [editingPack, setEditingPack] = useState<Pack | null>(null)
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['packs', filters],
    queryFn: () => fetchPacks(filters)
  })

  const deleteMutation = useMutation({
    mutationFn: deletePack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packs'] })
      toast.success('Pack excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir pack')
    }
  })

  const handleEdit = (pack: Pack) => {
    setEditingPack(pack)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pack?')) {
      deleteMutation.mutate(id)
    }
  }

  const handlePageChange = (page: number) => {
    onFiltersChange({ ...filters, page })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Carregando packs..." />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="pack"
        title="Erro ao carregar packs"
        description="Não foi possível carregar os packs. Tente novamente."
        actionLabel="Tentar novamente"
        onActionClick={() => queryClient.invalidateQueries({ queryKey: ['packs'] })}
      />
    )
  }

  const packs = data?.data || []
  const pagination = data?.pagination

  if (packs.length === 0) {
    const hasFilters = filters.q || filters.serie || filters.ano || filters.quantidade
    
    return (
      <EmptyState
        icon="pack"
        title={hasFilters ? 'Nenhum pack encontrado' : 'Nenhum pack cadastrado'}
        description={
          hasFilters 
            ? 'Tente ajustar os filtros de busca'
            : 'Comece adicionando seus primeiros packs Hot Wheels'
        }
        actionLabel={hasFilters ? 'Limpar filtros' : 'Adicionar Pack'}
        onActionClick={() => {
          if (hasFilters) {
            onFiltersChange({ q: '', serie: '', ano: '', quantidade: '', page: 1 })
          } else {
            setShowModal(true)
          }
        }}
      />
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map((pack: Pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            totalItems={pagination.total}
            page={filters.page}
            pageSize={20}
            onPageChange={handlePageChange}
            onPageSizeChange={() => {}} // Fixed page size for now
            showPageSelect={pagination.totalPages <= 10}
          />
        </div>
      )}

      {showModal && (
        <PackModal
          pack={editingPack}
          onClose={() => {
            setShowModal(false)
            setEditingPack(null)
          }}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['packs'] })
            setShowModal(false)
            setEditingPack(null)
          }}
        />
      )}
    </>
  )
}
